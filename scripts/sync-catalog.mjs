#!/usr/bin/env node
// ===========================================================================
// Refresh lib/catalog/ms-lighting.ts from the live MS Lighting site.
//
//   node scripts/sync-catalog.mjs
//
// MS Lighting renders its catalogue from its own CMS and ships the product
// records inside the RSC flight payload of each family page. Rather than
// standing up a second API client here, we read those payloads and write a
// plain TypeScript module — the parent site then has the whole range with no
// network dependency at request time.
//
// Images are NOT copied: every URL points at the shared S3 bucket both sites
// already use, so a re-shoot on the factory side appears here without a sync.
//
// If a family is added on the MS Lighting side, add its slug to FAMILIES and
// a copy entry to COPY, then re-run.
// ===========================================================================
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://mslighting.alburhan-regional.com';
const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'lib',
  'catalog',
  'ms-lighting.ts',
);

const FAMILIES = [
  'recessed-down-light',
  'surface-mounted-down-light',
  'recessed-grille-spot-light',
  'recessed-panel-light',
  'recessed-spot-light',
  'module-series',
  'linear-light',
  'track-spot-light',
  'magnet-light',
  'wall-light',
  'lawn-light',
  'street-light',
  'flood-light',
  'high-bay',
  'ceiling-light',
];

const OUTDOOR = new Set(['wall-light', 'lawn-light', 'street-light', 'flood-light']);

// Positioning copy is ours, not the factory's — it's written for this
// audience, so it lives here rather than being scraped.
const COPY = {
  'recessed-down-light': ['Recessed', 'The ambient workhorse. Cut into the ceiling plane so the fixture disappears and only the light remains.'],
  'surface-mounted-down-light': ['Surface', 'The same optic where the ceiling void is too shallow to cut — mounted proud, glare still controlled.'],
  'recessed-grille-spot-light': ['Recessed', 'Multi-head grille bodies for gallery and retail ceilings that need aim without clutter.'],
  'recessed-panel-light': ['Recessed', 'Even, low-glare sheets of light for offices, clinics and corridors on modular grids.'],
  'recessed-spot-light': ['Accent', 'Tight beams for artwork, joinery and vertical surfaces — adjustable, deep-baffled, UGR-controlled.'],
  'module-series': ['Modular', 'Interchangeable optic modules that let one ceiling aperture serve several lighting jobs.'],
  'linear-light': ['Linear', 'Continuous runs — recessed, surface or suspended — for rhythm across long architectural spans.'],
  'track-spot-light': ['Track', 'Re-aimable heads on a live rail, for retail and showroom layouts that change with the season.'],
  'magnet-light': ['Magnetic', 'Low-voltage magnetic rail: spots, floods and linears repositioned by hand, no tools.'],
  'ceiling-light': ['Decorative', 'Surface ceiling fixtures for residential and hospitality rooms where the fitting is seen.'],
  'high-bay': ['Industrial', 'High-output fixtures engineered for warehouse and production-floor mounting heights.'],
  'wall-light': ['Façade', 'Up, down and grazing wall optics that build the night elevation of a building.'],
  'lawn-light': ['Landscape', 'Bollards and lawn heads that mark paths and planting without spilling into the sky.'],
  'street-light': ['Street', 'Road and car-park optics with the distribution curves specifiers actually have to prove.'],
  'flood-light': ['Flood', 'Wide-throw fixtures for yards, sports areas, façades and site security.'],
};

/** Brace-match a JSON object out of the (already unescaped) payload. */
function readObject(src, start) {
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return src.slice(start, i + 1);
  }
  return null;
}

function extractProducts(html) {
  const src = html.replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n');
  const out = new Map();
  const re = /\{"id":\d+,"slug":"[^"]*","model_code":/g;
  let m;
  while ((m = re.exec(src))) {
    const raw = readObject(src, m.index);
    if (!raw) continue;
    try {
      const obj = JSON.parse(raw);
      if (obj.model_code) out.set(obj.id, obj);
    } catch {
      // Truncated or streamed-in-parts payload — the record will appear
      // again in a later chunk, so skipping is safe.
    }
  }
  return [...out.values()];
}

const families = [];

for (const [order, slug] of FAMILIES.entries()) {
  const res = await fetch(`${ORIGIN}/products/${slug}`, {
    headers: { 'User-Agent': 'alburhan-regional catalogue sync' },
  });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);

  const html = await res.text();
  const unescaped = html.replace(/\\"/g, '"');
  const name =
    unescaped.match(/"h1",null,\{"className":"reveal","children":"([^"]+)"/)?.[1] ?? slug;
  const image =
    unescaped.match(/"className":"fam-plate reveal"[\s\S]{0,200}?"src":"([^"]+)"/)?.[1] ?? null;

  const products = extractProducts(html)
    .filter((p) => !p.category || p.category.slug === slug)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((p) => ({
      slug: p.slug,
      code: p.model_code,
      name: p.name_en,
      image: p.image_url,
      spec: p.spec_image_url || null,
    }));

  if (!products.length) throw new Error(`${slug}: no models found — did the markup change?`);

  families.push({
    slug,
    name,
    zone: OUTDOOR.has(slug) ? 'outdoor' : 'indoor',
    tag: COPY[slug]?.[0] ?? 'Architectural',
    blurb: COPY[slug]?.[1] ?? '',
    image,
    order,
    products,
  });

  console.log(`  ${name.padEnd(28)} ${String(products.length).padStart(3)} models`);
}

const total = families.reduce((n, f) => n + f.products.length, 0);

const header = `// ===========================================================================
// MS Lighting catalogue — the manufacturing arm of the Al-Burhan group.
//
// Mirrored from mslighting.alburhan-regional.com so the parent site can show
// the full range without a second CMS round-trip. Images are served straight
// from the shared S3 bucket, so a re-shoot on the MS Lighting side shows up
// here too. Re-run scripts/sync-catalog.mjs to refresh model lists.
//
// ${families.length} families · ${total} models · synced ${new Date().toISOString().slice(0, 10)}
// ===========================================================================

export type CatalogZone = 'indoor' | 'outdoor';

export interface CatalogModel {
  /** URL segment, unique within its family. */
  slug: string;
  /** Manufacturer model code, e.g. "MS-240R". */
  code: string;
  name: string;
  image: string;
  /** Specification sheet artwork, when the factory has published one. */
  spec: string | null;
}

export interface CatalogFamily {
  slug: string;
  name: string;
  zone: CatalogZone;
  /** One-word positioning label used on cards. */
  tag: string;
  blurb: string;
  image: string;
  order: number;
  products: CatalogModel[];
}

export const CATALOG: CatalogFamily[] = `;

const footer = `;

export const CATALOG_FAMILY_COUNT = CATALOG.length;
export const CATALOG_MODEL_COUNT = CATALOG.reduce((n, f) => n + f.products.length, 0);

export function familiesByZone(zone: CatalogZone): CatalogFamily[] {
  return CATALOG.filter((f) => f.zone === zone);
}

export function findFamily(slug: string): CatalogFamily | undefined {
  return CATALOG.find((f) => f.slug === slug);
}

export function findModel(
  familySlug: string,
  modelSlug: string,
): { family: CatalogFamily; model: CatalogModel } | undefined {
  const family = findFamily(familySlug);
  const model = family?.products.find((p) => p.slug === modelSlug);
  return family && model ? { family, model } : undefined;
}

/** Every model paired with its family — used by the catalogue index and search. */
export function allModels(): { family: CatalogFamily; model: CatalogModel }[] {
  return CATALOG.flatMap((family) => family.products.map((model) => ({ family, model })));
}
`;

await fs.writeFile(OUT, header + JSON.stringify(families, null, 2) + footer);
console.log(`\n${families.length} families · ${total} models → ${path.relative(process.cwd(), OUT)}`);

// ============================================================================
// API client for the AL-Burhan CMS (FastAPI).
//
// Base URLs are taken from env so they can be overridden per-environment:
//   NEXT_PUBLIC_CMS_URL  -> e.g. http://13.60.4.75:8002
//
// Defaults to the production CMS host requested by the team.
// ============================================================================
import type {
  Banner,
  Brand,
  CarouselSlide,
  ContactInfo,
  Country,
  FooterLink,
  NavigationItem,
  PageContent,
  Product,
  ProjectCategory,
  Sector,
  Service,
  SiteContent,
  SiteSetting,
  SocialLink,
  StaticPage,
  TeamMember,
} from './types';

export const CMS_BASE =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/$/, '') || 'http://13.60.4.75:8002';
export const CMS_API = `${CMS_BASE}/api`;

// S3 bucket base URL — used for legacy relative paths that were migrated to
// S3 but never rewritten in the database (e.g. `/OurProject/...`).
export const S3_BASE =
  process.env.NEXT_PUBLIC_S3_BASE_URL?.replace(/\/$/, '') ||
  'https://alburhan-asset.s3.eu-north-1.amazonaws.com';

// ---------------------------------------------------------------------------
// Image URL helper
// ---------------------------------------------------------------------------

/**
 * Convert a CMS-stored image path into a fully qualified URL.
 *  - `null` / empty input       → returns `null`
 *  - already-absolute URL       → returned untouched
 *  - `/uploads/...`             → prefixed with the CMS base URL (FastAPI static mount)
 *  - any other absolute path    → prefixed with the S3 base URL (legacy migrated assets)
 *  - bare relative path         → prefixed with the CMS base URL
 */
export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const p = path.trim();
  if (!p) return null;
  if (p.startsWith('http://') || p.startsWith('https://')) return p;
  if (p.startsWith('/uploads/')) return `${CMS_BASE}${p}`;
  if (p.startsWith('/')) return `${S3_BASE}${encodeURI(p)}`;
  return `${CMS_BASE}/${p}`;
}

// ---------------------------------------------------------------------------
// Generic fetch wrapper (always cache-busted, server- and client-safe)
// ---------------------------------------------------------------------------

async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const url = `${CMS_API}${path}`;
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        ...(init?.headers || {}),
      },
      ...init,
    });
    if (!res.ok) {
      console.error(`[CMS] ${res.status} ${res.statusText} ← ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error('[CMS] fetch failed:', err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Aggregated site content (preferred entry point)
// ---------------------------------------------------------------------------

export async function getSiteContent(): Promise<SiteContent | null> {
  return cmsFetch<SiteContent>('/public/site-content');
}

// ---------------------------------------------------------------------------
// Individual public endpoints (use when you need only a slice)
// ---------------------------------------------------------------------------

export async function getSettings(): Promise<SiteSetting[]> {
  return (await cmsFetch<SiteSetting[]>('/public/settings')) || [];
}

export async function getNavigation(): Promise<NavigationItem[]> {
  return (await cmsFetch<NavigationItem[]>('/public/navigation')) || [];
}

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  return (await cmsFetch<CarouselSlide[]>('/public/carousel')) || [];
}

export async function getPageContents(pageKey?: string): Promise<PageContent[]> {
  const qs = pageKey ? `?page_key=${encodeURIComponent(pageKey)}` : '';
  return (await cmsFetch<PageContent[]>(`/public/page-contents${qs}`)) || [];
}

export async function getServices(): Promise<Service[]> {
  return (await cmsFetch<Service[]>('/public/services')) || [];
}

export async function getSectors(): Promise<Sector[]> {
  return (await cmsFetch<Sector[]>('/public/sectors')) || [];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return (await cmsFetch<TeamMember[]>('/public/team')) || [];
}

export async function getCountries(): Promise<Country[]> {
  return (await cmsFetch<Country[]>('/public/countries')) || [];
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  return cmsFetch<Country>(`/public/countries/${encodeURIComponent(slug)}`);
}

export async function getContactInfo(countryId?: number): Promise<ContactInfo[]> {
  const qs = countryId ? `?country_id=${countryId}` : '';
  return (await cmsFetch<ContactInfo[]>(`/public/contact-info${qs}`)) || [];
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return (await cmsFetch<SocialLink[]>('/public/social-links')) || [];
}

export async function getBrands(): Promise<Brand[]> {
  return (await cmsFetch<Brand[]>('/public/brands')) || [];
}

export async function getProducts(): Promise<Product[]> {
  return (await cmsFetch<Product[]>('/public/products')) || [];
}

export async function getBanners(countryId?: number): Promise<Banner[]> {
  const qs = countryId ? `?country_id=${countryId}` : '';
  return (await cmsFetch<Banner[]>(`/public/banners${qs}`)) || [];
}

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  return (await cmsFetch<ProjectCategory[]>('/public/project-categories')) || [];
}

export async function getFooterLinks(): Promise<FooterLink[]> {
  return (await cmsFetch<FooterLink[]>('/public/footer-links')) || [];
}

export async function getStaticPage(slug: string): Promise<StaticPage | null> {
  return cmsFetch<StaticPage>(`/public/pages/${encodeURIComponent(slug)}`);
}

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function findSetting(
  settings: SiteSetting[] | undefined,
  key: string,
): SiteSetting | undefined {
  return settings?.find((s) => s.key === key);
}

export function getSettingValue(
  settings: SiteSetting[] | undefined,
  key: string,
  locale: 'en' | 'ar' = 'en',
): string | null {
  const s = findSetting(settings, key);
  if (!s) return null;
  return (locale === 'ar' ? s.value_ar : s.value_en) || s.value_en || null;
}

export function getPageImage(
  pages: PageContent[] | undefined,
  pageKey: string,
  sectionKey: string,
): string | null {
  const item = pages?.find((p) => p.page_key === pageKey && p.section_key === sectionKey);
  return item?.image_url || null;
}

export function getCountryBySlugFrom(
  countries: Country[] | undefined,
  slug: string,
): Country | undefined {
  return countries?.find((c) => c.slug === slug);
}

export function getBannersForCountry(
  banners: Banner[] | undefined,
  countryId: number,
): Banner[] {
  return (banners || [])
    .filter((b) => b.country_id === countryId && b.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
}

// ---------------------------------------------------------------------------
// Contact form submission
// ---------------------------------------------------------------------------

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  country_id?: number;
}

export async function submitContactForm(payload: ContactFormData) {
  try {
    const res = await fetch(`${CMS_API}/public/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { success: false as const, error: res.statusText };
    return { success: true as const, data: await res.json() };
  } catch (err) {
    return {
      success: false as const,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

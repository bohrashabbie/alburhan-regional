import * as React from 'react';
import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

/**
 * Page head for every catalogue screen. Deliberately flat — no photograph
 * behind the type — so the product plates below are the only imagery on the
 * page and nothing competes with them.
 */
export function CatalogHero({
  kicker,
  title,
  lead,
  crumbs,
  aside,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  crumbs?: Crumb[];
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-50"
        style={{
          maskImage: 'radial-gradient(110% 80% at 50% 0%, #000 10%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(110% 80% at 50% 0%, #000 10%, transparent 75%)',
        }}
      />
      <div aria-hidden className="lumen-wash" />

      <div className="wrap relative py-14 md:py-20">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5">
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3 text-ink-4 rtl:rotate-180" />}
                  {c.href ? (
                    <Link
                      href={c.href as never}
                      className="t-mono text-[0.5625rem] text-ink-4 transition-colors hover:text-accent"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="t-mono text-[0.5625rem] text-ink-2">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="kicker">{kicker}</p>
            <h1 className="t-h1 mt-5 max-w-2xl">{title}</h1>
            {lead && <p className="t-lead mt-5 max-w-xl">{lead}</p>}
          </div>
          {aside && <div className="md:justify-self-end">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export default CatalogHero;

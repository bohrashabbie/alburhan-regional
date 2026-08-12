import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { CatalogBrowser } from '@/components/catalog/CatalogBrowser';
import { CatalogHero } from '@/components/catalog/CatalogHero';
import { CATALOG_FAMILY_COUNT, CATALOG_MODEL_COUNT } from '@/lib/catalog/ms-lighting';

export const metadata: Metadata = {
  title: 'Catalogue',
  description: `Architectural LED lighting from Al-Burhan Regional — ${CATALOG_MODEL_COUNT} models across ${CATALOG_FAMILY_COUNT} indoor and outdoor fixture families, manufactured in-house by MS Lighting.`,
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ zone?: string }>;
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { zone } = await searchParams;
  const initialZone = zone === 'indoor' || zone === 'outdoor' ? zone : 'all';
  const isRTL = locale === 'ar';

  return (
    <>
      <CatalogHero
        kicker={isRTL ? 'الكتالوج' : 'Catalogue'}
        title={isRTL ? 'المجموعة الكاملة' : 'The full range'}
        lead={
          isRTL
            ? `${CATALOG_MODEL_COUNT} موديلاً عبر ${CATALOG_FAMILY_COUNT} عائلة — إضاءة داخلية وخارجية مصنّعة في مصنعنا في جيانغمن، مع شهادات CE و RoHS.`
            : `${CATALOG_MODEL_COUNT} models across ${CATALOG_FAMILY_COUNT} families — indoor and outdoor fixtures built in our own factory in Jiangmen, shipped with CE and RoHS documentation.`
        }
      />
      <CatalogBrowser initialZone={initialZone} />
    </>
  );
}

import { getTranslations } from 'next-intl/server';
import { CountryTemplate } from '@/components/sections/CountryTemplate';

export default async function UAEPage() {
  const t = await getTranslations();

  return (
    <CountryTemplate
      countrySlug="uae"
      i18nKey="dubai"
      fallbackImage="/Countries/uae.png"
      fallbackLogo="/logo/al burhan uae.png"
      locations={[
        {
          title: t('countryContact.dubai.companyName'),
          address: (
            <>
              {t('countryContact.dubai.office')}
              <br />
              {t('countryContact.dubai.floor')}
              <br />
              {t('countryContact.dubai.area')}
              <br />
              {t('countryContact.dubai.city')}
            </>
          ),
          phone: `${t('countryContact.dubai.phone1')} · ${t(
            'countryContact.dubai.phone2',
          )}`,
          email: t('countryContact.dubai.email'),
        },
      ]}
    />
  );
}

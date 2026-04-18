'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { CountryTemplate } from '@/components/sections/CountryTemplate';

export default function ChinaPage() {
  const t = useTranslations();

  return (
    <CountryTemplate
      countrySlug="china"
      i18nKey="china"
      fallbackImage="/Company Countries/china city.jpg"
      fallbackLogo="/logo/AL BURHAN CHINA.png"
      locations={[
        {
          title: t('countryContact.china.companyName'),
          address: (
            <>
              {t('countryContact.china.address')}
              <br />
              {t('countryContact.china.district')}
              <br />
              {t('countryContact.china.province')}
              <br />
              {t('countryContact.china.postalCode')}
            </>
          ),
          phone: t('countryContact.china.phone'),
          email: t('countryContact.china.email'),
          website: t('countryContact.china.website'),
        },
      ]}
    />
  );
}

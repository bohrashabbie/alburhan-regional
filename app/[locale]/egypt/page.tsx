'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { CountryTemplate } from '@/components/sections/CountryTemplate';

export default function EgyptPage() {
  const t = useTranslations();

  return (
    <CountryTemplate
      countrySlug="egypt"
      i18nKey="egypt"
      fallbackImage="/Countries/egypt.png"
      fallbackLogo="/logo/al burhan egypt.png"
      locations={[
        {
          title: t('countryContact.egypt.companyName'),
          address: t('countryContact.egypt.address'),
          phone: t('countryContact.egypt.phone'),
          email: t('countryContact.egypt.email'),
        },
      ]}
    />
  );
}

import { getTranslations } from 'next-intl/server';
import { CountryTemplate } from '@/components/sections/CountryTemplate';

export default async function KuwaitPage() {
  const t = await getTranslations();

  const branches = (['branch1', 'branch2', 'branch3', 'branch4'] as const).map(
    (key) => ({
      title: t(`countryContact.kuwait.${key}.name`),
      address: t(`countryContact.kuwait.${key}.address`),
      phone: t(`countryContact.kuwait.${key}.phone`),
    }),
  );

  return (
    <CountryTemplate
      countrySlug="kuwait"
      i18nKey="kuwait"
      fallbackImage="/Countries/kuwait.png"
      fallbackLogo="/logo/al burhan kuwait.png"
      locations={branches}
    />
  );
}

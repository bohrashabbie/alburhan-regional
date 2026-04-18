'use client';

import React, { createContext, ReactNode, useContext, useMemo } from 'react';
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
} from '../lib/types';
import { getImageUrl, getPageImage, getSettingValue } from '../lib/api';

interface SiteContentContextType {
  content: SiteContent | null;
  loading: boolean;

  // Convenience selectors
  setting: (key: string, locale?: 'en' | 'ar') => string | null;
  pageImage: (pageKey: string, sectionKey: string) => string | null;
  countryBySlug: (slug: string) => Country | undefined;
}

const defaultCtx: SiteContentContextType = {
  content: null,
  loading: true,
  setting: () => null,
  pageImage: () => null,
  countryBySlug: () => undefined,
};

const SiteContentContext = createContext<SiteContentContextType>(defaultCtx);

export function SiteContentProvider({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent | null;
}) {
  const value = useMemo<SiteContentContextType>(() => {
    return {
      content,
      loading: false,
      setting: (key, locale = 'en') => getSettingValue(content?.settings, key, locale),
      pageImage: (pageKey, sectionKey) => {
        const path = getPageImage(content?.page_contents, pageKey, sectionKey);
        return getImageUrl(path);
      },
      countryBySlug: (slug) => content?.countries.find((c) => c.slug === slug),
    };
  }, [content]);

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

// ---------------------------------------------------------------------------
// Strongly typed slice helpers (each returns the requested array safely)
// ---------------------------------------------------------------------------

export function useSettings(): SiteSetting[] {
  return useSiteContent().content?.settings || [];
}

export function useNavigation(): NavigationItem[] {
  return useSiteContent().content?.navigation || [];
}

export function useCarousel(): CarouselSlide[] {
  return useSiteContent().content?.carousel_slides || [];
}

export function usePageContents(pageKey?: string): PageContent[] {
  const all = useSiteContent().content?.page_contents || [];
  return pageKey ? all.filter((p) => p.page_key === pageKey) : all;
}

export function useServices(): Service[] {
  return useSiteContent().content?.services || [];
}

export function useSectors(): Sector[] {
  return useSiteContent().content?.sectors || [];
}

export function useTeam(): TeamMember[] {
  return useSiteContent().content?.team_members || [];
}

export function useCountries(): Country[] {
  return useSiteContent().content?.countries || [];
}

export function useContactInfo(countryId?: number): ContactInfo[] {
  const list = useSiteContent().content?.contact_info || [];
  return countryId ? list.filter((c) => c.country_id === countryId) : list;
}

export function useSocialLinks(): SocialLink[] {
  return useSiteContent().content?.social_links || [];
}

export function useBrands(): Brand[] {
  return useSiteContent().content?.brands || [];
}

export function useProducts(): Product[] {
  return useSiteContent().content?.products || [];
}

export function useBanners(countryId?: number): Banner[] {
  const list = useSiteContent().content?.banners || [];
  return countryId ? list.filter((b) => b.country_id === countryId) : list;
}

export function useProjectCategories(): ProjectCategory[] {
  return useSiteContent().content?.project_categories || [];
}

export function useFooterLinks(section?: string): FooterLink[] {
  const list = useSiteContent().content?.footer_links || [];
  return section ? list.filter((f) => f.section === section) : list;
}

export function useStaticPages(): StaticPage[] {
  return useSiteContent().content?.static_pages || [];
}

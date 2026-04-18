'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  getBanners,
  getBrands,
  getCarouselSlides,
  getCountries,
  getCountryBySlug,
  getFooterLinks,
  getNavigation,
  getPageContents,
  getProducts,
  getProjectCategories,
  getServices,
  getSettings,
  getSocialLinks,
  getTeamMembers,
} from '../lib/api';
import type {
  Banner,
  Brand,
  CarouselSlide,
  Country,
  FooterLink,
  NavigationItem,
  PageContent,
  Product,
  ProjectCategory,
  Service,
  SiteSetting,
  SocialLink,
  TeamMember,
} from '../lib/types';

// ---------------------------------------------------------------------------
// Generic data hook with focus-based revalidation
// ---------------------------------------------------------------------------

interface UseApiState<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

function useApiCall<T>(fetcher: () => Promise<T>, defaultValue: T): UseApiState<T> {
  const [state, setState] = useState<{ data: T; loading: boolean; error: string | null }>({
    data: defaultValue,
    loading: true,
    error: null,
  });

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const result = await fetcherRef.current();
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      setState({
        data: defaultValue,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch data',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    window.addEventListener('visibilitychange', onVisible);
    return () => window.removeEventListener('visibilitychange', onVisible);
  }, [load]);

  return { ...state, refresh: load };
}

// ---------------------------------------------------------------------------
// Hook exports — each maps directly to one CMS endpoint
// ---------------------------------------------------------------------------

export function useSettings() {
  return useApiCall<SiteSetting[]>(getSettings, []);
}

export function useNavigation() {
  return useApiCall<NavigationItem[]>(getNavigation, []);
}

export function useCarouselSlides() {
  return useApiCall<CarouselSlide[]>(getCarouselSlides, []);
}

export function usePageContents(pageKey?: string) {
  const fetcher = useCallback(() => getPageContents(pageKey), [pageKey]);
  return useApiCall<PageContent[]>(fetcher, []);
}

export function useServices() {
  return useApiCall<Service[]>(getServices, []);
}

export function useTeamMembers() {
  return useApiCall<TeamMember[]>(getTeamMembers, []);
}

export function useCountries() {
  return useApiCall<Country[]>(getCountries, []);
}

export function useCountry(slug: string) {
  const fetcher = useCallback(() => getCountryBySlug(slug), [slug]);
  return useApiCall<Country | null>(fetcher, null);
}

export function useSocialLinks() {
  return useApiCall<SocialLink[]>(getSocialLinks, []);
}

export function useBrands() {
  return useApiCall<Brand[]>(getBrands, []);
}

export function useProducts() {
  return useApiCall<Product[]>(getProducts, []);
}

export function useBanners(countryId?: number) {
  const fetcher = useCallback(() => getBanners(countryId), [countryId]);
  return useApiCall<Banner[]>(fetcher, []);
}

export function useProjectCategories() {
  return useApiCall<ProjectCategory[]>(getProjectCategories, []);
}

export function useFooterLinks() {
  return useApiCall<FooterLink[]>(getFooterLinks, []);
}

// ---------------------------------------------------------------------------
// Convenience selectors
// ---------------------------------------------------------------------------

export function useSettingValue(key: string, locale: 'en' | 'ar' = 'en'): string | null {
  const { data } = useSettings();
  return useMemo(() => {
    const s = data.find((item) => item.key === key);
    if (!s) return null;
    return (locale === 'ar' ? s.value_ar : s.value_en) || s.value_en || null;
  }, [data, key, locale]);
}

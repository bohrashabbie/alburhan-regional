'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getBanners,
  getActiveBanners,
  getBannersByCountry,
  getBranches,
  getBranchesByCountry,
  getCountries,
  getProjects,
  getProjectsByCategory,
  getProjectCategories,
  getProjectImages,
  getProjectImagesByProject,
  getProjectsWithDetails,
} from '../lib/api';
import type {
  Banner,
  Branch,
  Country,
  Project,
  ProjectCategory,
  ProjectImage,
} from '../lib/types';

interface UseApiState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

function useApiCall<T>(fetcher: () => Promise<T>, defaultValue: T): UseApiState<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: defaultValue,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const result = await fetcher();
        if (!cancelled) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            data: defaultValue,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to fetch data',
          });
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

// ─── Hook exports ───────────────────────────────────────────────────────────

export function useBanners() {
  return useApiCall(() => getBanners(), []);
}

export function useActiveBanners() {
  return useApiCall(() => getActiveBanners(), []);
}

export function useBannersByCountry(countryId: number) {
  return useApiCall(() => getBannersByCountry(countryId), []);
}

export function useBranches() {
  return useApiCall(() => getBranches(), []);
}

export function useBranchesByCountry(countryId: number) {
  return useApiCall(() => getBranchesByCountry(countryId), []);
}

export function useCountries() {
  return useApiCall(() => getCountries(), []);
}

export function useProjects() {
  return useApiCall(() => getProjects(), []);
}

export function useProjectsByCategory(categoryId: number) {
  return useApiCall(() => getProjectsByCategory(categoryId), []);
}

export function useProjectCategories() {
  return useApiCall(() => getProjectCategories(), []);
}

export function useProjectImages() {
  return useApiCall(() => getProjectImages(), []);
}

export function useProjectImagesByProject(projectId: number) {
  return useApiCall(() => getProjectImagesByProject(projectId), []);
}

export function useProjectsWithDetails() {
  return useApiCall(() => getProjectsWithDetails(), []);
}

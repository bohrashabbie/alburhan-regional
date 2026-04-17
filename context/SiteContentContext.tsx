'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface SiteContent {
  site_settings: any[];
  navigation_items: any[];
  carousel_slides: any[];
  page_contents: any[];
  services: any[];
  service_items: any[];
  sectors: any[];
  team_members: any[];
  countries: any[];
  branches: any[];
  contact_info: any[];
  social_links: any[];
  brands: any[];
  products: any[];
  banners: any[];
  project_categories: any[];
  projects: any[];
  project_images: any[];
  static_pages: any[];
  footer_links: any[];
  [key: string]: any[];
}

interface SiteContentContextType {
  content: SiteContent | null;
  loading: boolean;
}

const SiteContentContext = createContext<SiteContentContextType>({
  content: null,
  loading: true,
});

export function SiteContentProvider({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent | null;
}) {
  return (
    <SiteContentContext.Provider value={{ content, loading: false }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

// ============================================================================
// Types matching the AL-Burhan CMS (FastAPI) snake_case schemas.
// Source of truth: al-burhan-cms/app/schemas/schemas.py
// ============================================================================

export interface SiteSetting {
  id: number;
  key: string;
  value_en: string | null;
  value_ar: string | null;
  setting_type: string | null;
  description: string | null;
}

export interface NavigationItem {
  id: number;
  label_en: string;
  label_ar: string | null;
  href: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  parent_id: number | null;
}

export interface CarouselSlide {
  id: number;
  title_en: string | null;
  title_ar: string | null;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface PageContent {
  id: number;
  page_key: string;
  section_key: string;
  title_en: string | null;
  title_ar: string | null;
  content_en: string | null;
  content_ar: string | null;
  extra_data: Record<string, unknown> | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ServiceItem {
  id: number;
  service_id: number;
  text_en: string;
  text_ar: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Service {
  id: number;
  title_en: string;
  title_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  items: ServiceItem[];
}

export interface Sector {
  id: number;
  name_en: string;
  name_ar: string | null;
  icon: string | null;
  description_en: string | null;
  description_ar: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface TeamMember {
  id: number;
  name_en: string;
  name_ar: string | null;
  designation_en: string | null;
  designation_ar: string | null;
  quote_en: string | null;
  quote_ar: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Branch {
  id: number;
  country_id: number;
  name_en: string | null;
  name_ar: string | null;
  address_en: string | null;
  address_ar: string | null;
  phone1: string | null;
  phone2: string | null;
  email: string | null;
  map_lat: number | null;
  map_lng: number | null;
  is_head_office: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface Country {
  id: number;
  name_en: string;
  name_ar: string | null;
  slug: string;
  firm_name_en: string | null;
  firm_name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  flag_url: string | null;
  country_image_url: string | null;
  logo_url: string | null;
  sort_order: number;
  is_active: boolean;
  branches: Branch[];
}

export interface ContactInfo {
  id: number;
  country_id: number | null;
  company_name_en: string | null;
  company_name_ar: string | null;
  office_en: string | null;
  office_ar: string | null;
  floor_en: string | null;
  floor_ar: string | null;
  area_en: string | null;
  area_ar: string | null;
  city_en: string | null;
  city_ar: string | null;
  address_en: string | null;
  address_ar: string | null;
  district_en: string | null;
  district_ar: string | null;
  province_en: string | null;
  province_ar: string | null;
  postal_code: string | null;
  phone1: string | null;
  phone2: string | null;
  email: string | null;
  website: string | null;
  business_hours_en: string | null;
  business_hours_ar: string | null;
  is_head_office: boolean;
  is_active: boolean;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Brand {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Product {
  id: number;
  name_en: string;
  name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Banner {
  id: number;
  country_id: number | null;
  name_en: string | null;
  name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  image_url: string | null;
  banner_type: string | null;
  position: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface Project {
  id: number;
  category_id: number | null;
  country_id: number | null;
  name_en: string;
  name_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  sort_order: number;
  is_active: boolean;
  images: ProjectImage[];
}

export interface ProjectCategory {
  id: number;
  name_en: string;
  name_ar: string | null;
  cover_image_url: string | null;
  sort_order: number;
  is_active: boolean;
  projects: Project[];
}

export interface FooterLink {
  id: number;
  section: string;
  label_en: string;
  label_ar: string | null;
  href: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface StaticPage {
  id: number;
  slug: string;
  title_en: string | null;
  title_ar: string | null;
  content_en: string | null;
  content_ar: string | null;
  is_active: boolean;
}

export interface MediaFile {
  id: number;
  filename: string;
  original_name: string | null;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  created_at: string | null;
}

// ---- Aggregated site content (what /api/public/site-content returns) ------
export interface SiteContent {
  settings: SiteSetting[];
  navigation: NavigationItem[];
  carousel_slides: CarouselSlide[];
  page_contents: PageContent[];
  services: Service[];
  sectors: Sector[];
  team_members: TeamMember[];
  countries: Country[];
  contact_info: ContactInfo[];
  social_links: SocialLink[];
  brands: Brand[];
  products: Product[];
  banners: Banner[];
  project_categories: ProjectCategory[];
  footer_links: FooterLink[];
  static_pages: StaticPage[];
}

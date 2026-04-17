// API Response wrapper
export interface ApiResponse<T> {
  result: T | null;
  statusCode: number;
  success: boolean;
  error: string | null;
}

// Paginated response
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Banner
export interface Banner {
  id: number;
  bannername: string;
  bannerdescription: string | null;
  info1: string | null;
  countryid: number | null;
  bannertype: string | null;
  isactive: boolean;
  sequencenumber: number | null;
  bannerurl: string | null;
  position: string | null;
}

// Branch
export interface Branch {
  id: number;
  countryid: number | null;
  email: string | null;
  countrycode: string | null;
  branchname: string | null;
  branchaddress: string | null;
  contact1: string | null;
  contact2: string | null;
  isactive: boolean;
}

// Country
export interface Country {
  id: number;
  countrynameen: string | null;
  countrynamear: string | null;
  isactive: boolean;
  sequencenumber: number | null;
  logourl: string | null;
  countryurl: string | null;
}

// Project
export interface Project {
  id: number;
  categoryid: number | null;
  projectname: string;
  projectdescription: string | null;
}

// Project Category
export interface ProjectCategory {
  id: number;
  category_name: string;
  cover_image_url: string | null;
}

// Project Image
export interface ProjectImage {
  id: number;
  projectid: number | null;
  projectimageurl: string | null;
  sequencenumber: number | null;
  isactive: boolean;
}

// User
export interface User {
  id: number;
  username: string;
  email: string;
  fullname: string | null;
  role: string;
  isactive: boolean;
}

// Auth
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

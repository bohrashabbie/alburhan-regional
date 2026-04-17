import type {
  ApiResponse,
  Banner,
  Branch,
  Country,
  Project,
  ProjectCategory,
  ProjectImage,
} from './types';

const API_URL = 'http://13.60.4.75:8002/api';
const API_BASE = 'http://13.60.4.75:8002';

/**
 * Prepend the API base URL to a relative image path.
 * Returns null if the path is null/undefined/empty.
 */
export function getImageUrl(relativePath: string | null | undefined): string | null {
  if (!relativePath) return null;
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  return `${API_BASE}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
}

/**
 * Generic fetch wrapper that handles the standard API response format.
 */
async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    const data: ApiResponse<T> = await res.json();
    return data;
  } catch (error) {
    return {
      result: null,
      statusCode: 500,
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// ─── Banners ────────────────────────────────────────────────────────────────

export async function getBanners(): Promise<Banner[]> {
  const data = await fetchApi<Banner[]>('/banners/');
  return data.success && data.result ? data.result : [];
}

export async function getBannerById(id: number): Promise<Banner | null> {
  const data = await fetchApi<Banner>(`/banners/${id}`);
  return data.success ? data.result : null;
}

// ─── Branches ───────────────────────────────────────────────────────────────

export async function getBranches(): Promise<Branch[]> {
  const data = await fetchApi<Branch[]>('/branches/');
  return data.success && data.result ? data.result : [];
}

export async function getBranchById(id: number): Promise<Branch | null> {
  const data = await fetchApi<Branch>(`/branches/${id}`);
  return data.success ? data.result : null;
}

export async function getBranchesByCountry(countryId: number): Promise<Branch[]> {
  const branches = await getBranches();
  return branches.filter((b) => b.countryid === countryId);
}

// ─── Countries ──────────────────────────────────────────────────────────────

export async function getCountries(): Promise<Country[]> {
  const data = await fetchApi<Country[]>('/countries/');
  return data.success && data.result ? data.result : [];
}

export async function getCountryById(id: number): Promise<Country | null> {
  const data = await fetchApi<Country>(`/countries/${id}`);
  return data.success ? data.result : null;
}

// ─── Projects ───────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const data = await fetchApi<Project[]>('/projects/');
  return data.success && data.result ? data.result : [];
}

export async function getProjectById(id: number): Promise<Project | null> {
  const data = await fetchApi<Project>(`/projects/${id}`);
  return data.success ? data.result : null;
}

export async function getProjectsByCategory(categoryId: number): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.categoryid === categoryId);
}

// ─── Project Categories ─────────────────────────────────────────────────────

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  const data = await fetchApi<ProjectCategory[]>('/project-categories/');
  return data.success && data.result ? data.result : [];
}

export async function getProjectCategoryById(id: number): Promise<ProjectCategory | null> {
  const data = await fetchApi<ProjectCategory>(`/project-categories/${id}`);
  return data.success ? data.result : null;
}

// ─── Project Images ─────────────────────────────────────────────────────────

export async function getProjectImages(): Promise<ProjectImage[]> {
  const data = await fetchApi<ProjectImage[]>('/project-images/');
  return data.success && data.result ? data.result : [];
}

export async function getProjectImageById(id: number): Promise<ProjectImage | null> {
  const data = await fetchApi<ProjectImage>(`/project-images/${id}`);
  return data.success ? data.result : null;
}

export async function getProjectImagesByProject(projectId: number): Promise<ProjectImage[]> {
  const images = await getProjectImages();
  return images
    .filter((img) => img.projectid === projectId && img.isactive)
    .sort((a, b) => (a.sequencenumber ?? 0) - (b.sequencenumber ?? 0));
}

// ─── Aggregated helpers ─────────────────────────────────────────────────────

/**
 * Get all projects with their category info and images attached.
 */
export async function getProjectsWithDetails(): Promise<
  (Project & { category: ProjectCategory | undefined; images: ProjectImage[] })[]
> {
  const [projects, categories, images] = await Promise.all([
    getProjects(),
    getProjectCategories(),
    getProjectImages(),
  ]);

  return projects.map((project) => ({
    ...project,
    category: categories.find((c) => c.id === project.categoryid),
    images: images
      .filter((img) => img.projectid === project.id && img.isactive)
      .sort((a, b) => (a.sequencenumber ?? 0) - (b.sequencenumber ?? 0)),
  }));
}

/**
 * Get active banners for a specific country, sorted by sequence.
 */
export async function getBannersByCountry(countryId: number): Promise<Banner[]> {
  const banners = await getBanners();
  return banners
    .filter((b) => b.countryid === countryId && b.isactive)
    .sort((a, b) => (a.sequencenumber ?? 0) - (b.sequencenumber ?? 0));
}

/**
 * Get all active banners sorted by sequence.
 */
export async function getActiveBanners(): Promise<Banner[]> {
  const banners = await getBanners();
  return banners
    .filter((b) => b.isactive)
    .sort((a, b) => (a.sequencenumber ?? 0) - (b.sequencenumber ?? 0));
}

// ─── Site Content ─────────────────────────────────────────────────────────────

export async function getSiteContent() {
  try {
    const res = await fetch(`${API_URL}/public/site-content`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch site content:', error);
    return null;
  }
}

import { apiFetch } from "./api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllCategories(opts?: {
  cache?: RequestCache;
  next?: { revalidate?: number | false };
}) {
  const response = `${API_BASE}/category/show/catalog`;
  return await apiFetch<any>(response, {
    cache: opts?.cache ?? "no-store",
    next: opts?.next,
  });
}

export async function getCategoryParents(opts?: {
  cache?: RequestCache;
  next?: { revalidate?: number | false };
}) {
  const response = `${API_BASE}/category/parent`;
  return await apiFetch<any>(response, {
    cache: opts?.cache ?? "no-store",
    next: opts?.next,
  });
}
// /category/show/catalog
export async function getShowingCatalogCategorys(opts?: {
  cache?: RequestCache;
  next?: { revalidate?: number | false };
}) {
  const response = `${API_BASE}/category/popular`;
  return await apiFetch<any>(response, {
    cache: opts?.cache ?? "no-store",
    next: opts?.next,
  });
}

// SSG wrappers
export const getAllCategoriesSSG = (opts?: {
  next?: { revalidate?: number | false };
}) => getAllCategories({ cache: "force-cache", next: opts?.next });

export const getCategoryParentsSSG = (opts?: {
  next?: { revalidate?: number | false };
}) => getCategoryParents({ cache: "force-cache", next: opts?.next });

export const getShowingCatalogCategorysSSG = (opts?: {
  next?: { revalidate?: number | false };
}) => getShowingCatalogCategorys({ cache: "force-cache", next: opts?.next });

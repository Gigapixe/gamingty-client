import { apiFetch } from "./api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPopularProducts(opts?: {
  cache?: RequestCache;
  next?: { revalidate?: number | false };
}) {
  const response = `${API_BASE}/products/popular`;
  return await apiFetch<any>(response, {
    cache: opts?.cache ?? "no-store",
    next: opts?.next,
  });
}
export const getPopularProductsSSG = (opts?: {
  next?: { revalidate?: number | false };
}) => getPopularProducts({ cache: "force-cache", next: opts?.next });

export async function getTrendingProducts(opts?: {
  cache?: RequestCache;
  next?: { revalidate?: number | false };
}) {
  const response = `${API_BASE}/products/trending`;
  return await apiFetch<any>(response, {
    cache: opts?.cache ?? "no-store",
    next: opts?.next,
  });
}
export const getTrendingProductsSSG = (opts?: {
  next?: { revalidate?: number | false };
}) => getTrendingProducts({ cache: "force-cache", next: opts?.next });

export async function getBestSellerProducts(opts?: {
  cache?: RequestCache;
  next?: { revalidate?: number | false };
}) {
  const response = `${API_BASE}/products/best-sale`;
  return await apiFetch<any>(response, {
    cache: opts?.cache ?? "no-store",
    next: opts?.next,
  });
}
export const getBestSellerProductsSSG = (opts?: {
  next?: { revalidate?: number | false };
}) => getBestSellerProducts({ cache: "force-cache", next: opts?.next });

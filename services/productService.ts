import { apiFetch } from "./api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPopularProducts() {
  const response = `${API_BASE}/products/popular`;
  return await apiFetch<any>(response, {
    cache: "no-store",
  });
}
export async function getTrendingProducts() {
  const response = `${API_BASE}/products/trending`;
  return await apiFetch<any>(response, {
    cache: "no-store",
  });
}

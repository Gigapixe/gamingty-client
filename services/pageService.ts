import { apiFetch } from "./api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPageBySlug(slug: string) {
  const response = `${API_BASE}/pages/${slug}`;
  return await apiFetch<any>(response, {
    cache: "no-store",
  });
}

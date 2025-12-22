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

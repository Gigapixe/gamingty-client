import { apiFetch } from "./api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPageBySlug(
  slug: string,
  opts?: { cache?: RequestCache; next?: { revalidate?: number | false } }
) {
  const response = `${API_BASE}/pages/${slug}`;
  return await apiFetch<any>(response, {
    cache: opts?.cache ?? "no-store",
    next: opts?.next,
  });
}

export const getPageBySlugSSG = (
  slug: string,
  opts?: { next?: { revalidate?: number | false } }
) => getPageBySlug(slug, { cache: "force-cache", next: opts?.next });

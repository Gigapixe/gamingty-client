import { apiFetch } from "./api";
import { Banner } from "@/types/banner";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface BannerResponse {
  success: boolean;
  data: Banner[];
}

export async function getAllBanners(): Promise<Banner[]> {
  const url = `${API_BASE}/banner/all`;
  const res = await apiFetch<BannerResponse>(url, {
    cache: "no-store",
  });
  return res?.data || [];
}

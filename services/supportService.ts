import { apiFetch } from "./api";
import { getToken } from "./getToken";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createSupportTicket(data: any) {
  const token = await getToken(); // Assume this function retrieves the auth token
  const response = `${API_BASE}/ticket`;
  return await apiFetch<any>(response, {
    method: "POST",
    body: data,
    token: token || undefined,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });
}

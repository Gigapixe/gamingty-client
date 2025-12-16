import { apiFetch } from "./api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function customerLogin(
  email: string,
  password: string
) {
  const response = await apiFetch(`${API_BASE}/customer/login`, {
    method: "POST",
    body: { email, password },
  });
  return response;
}

export async function requestPasswordReset(email: string) {
  const url = `${API_BASE}/customer/forgot-password`;
  return apiFetch(url, {
    method: "POST",
    body: { email },
  });
}
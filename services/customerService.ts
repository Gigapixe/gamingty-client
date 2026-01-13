import { apiFetch } from "./api";
import { getToken } from "./getToken";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function customerLogin(email: string, password: string) {
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
// resend OTP (send token in Authorization header)
export async function resendOTP(token: string) {
  const url = `${API_BASE}/customer/verify-otp-again`;
  return apiFetch(url, {
    method: "POST",
    token,
  });
}

// verify OTP using temp token in Authorization header
export async function verifyOTP(token: string, otp: string) {
  const url = `${API_BASE}/customer/verify-otp-customer-login`;
  return apiFetch(url, {
    method: "POST",
    token,
    body: { otp },
  });
}
// /customer/change-password
export async function changePassword(
  email: string,
  currentPassword: string,
  newPassword: string
) {
  const token = await getToken();
  const url = `${API_BASE}/customer/change-password`;
  return apiFetch(url, {
    method: "POST",
    body: { email, currentPassword, newPassword },
    token: token || undefined,
  });
}

// /customer/2fa/enable
export async function enable2FA() {
  const url = `${API_BASE}/customer/2fa/enable`;
  return apiFetch(url, {
    method: "POST",
  });
}
// /customer/2fa/verify-setup
export async function verify2FA(code: string) {
  const token = await getToken();
  const url = `${API_BASE}/customer/2fa/verify-setup`;
  return apiFetch(url, {
    method: "POST",
    body: { code },
    token: token || undefined,
  });
}
// /customer/2fa/disable
export async function disable2FA(code: string) {
  const token = await getToken();
  const url = `${API_BASE}/customer/2fa/disable`;
  return apiFetch(url, {
    method: "POST",
    body: { code },
    token: token || undefined,
  });
}

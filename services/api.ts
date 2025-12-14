// import { cookies } from "next/headers";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  token?: string; // Optional Bearer token
  cache?: RequestCache; // e.g., 'no-store' for dynamic SSR
  next?: { revalidate?: number | false; tags?: string[] }; // For ISR/revalidation
  etag?: string; // For conditional requests
}

export async function apiFetch<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    token,
    cache = "default",
    next,
    etag,
  } = options;

  // Merge headers with defaults (Content-Type, etc.)
  let mergedHeaders: HeadersInit = { ...headers };
  // Only set Content-Type if not uploading FormData
  if (!(body instanceof FormData)) {
    mergedHeaders = { "Content-Type": "application/json", ...mergedHeaders };
  }
  // Add If-None-Match header for ETag if provided
  if (etag) {
    mergedHeaders["If-None-Match"] = etag;
  }
  if (token) {
    mergedHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Add Bearer token if provided (or fetch from cookies in SSR)
  // let flexiAuthToken = token;
  // if (!flexiAuthToken && typeof window === "undefined") {
  //   // Server-side
  //   const cookieStore = await cookies();
  //   const cookie = cookieStore.get("flexiAuthToken"); // Assuming token in HTTP-only cookie
  //   flexiAuthToken = cookie?.value; // Extract string value from RequestCookie
  // } else if (!flexiAuthToken) {
  //   // Client-side fallback
  //   flexiAuthToken = localStorage.getItem("flexiAuthToken") || ""; // Insecure; use with caution
  // }
  // if (flexiAuthToken) {
  //   mergedHeaders["Authorization"] = `Bearer ${flexiAuthToken}`;
  // }

  const response = await fetch(url, {
    method,
    headers: mergedHeaders,
    body: body
      ? body instanceof FormData
        ? body
        : JSON.stringify(body)
      : undefined,
    cache, // Controls SSR caching
    next, // For revalidation in SSR/ISG
  });

  if (!response.ok) {
    // if (
    //   (response.status === 401 || response.status === 403) &&
    //   typeof window !== "undefined"
    // ) {
    //   // Token expired or unauthorized → clear cookie only
    //   document.cookie = "flexiAuthToken=; Max-Age=0; path=/";
    //   // Redirect to login page
    //   window.location.href = "/login";
    // }
    // const error = await response.json().catch(() => ({ message: "API error" }));
    // throw new Error(error.message || `HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

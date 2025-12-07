import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("flexiAuthToken")?.value;
  const isAuthenticated = !!token;

  // console.log(`Path: ${pathname}, Auth: ${isAuthenticated}`);

  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/otp-verification",
    "/verify-otp",
  ];

  const protectedRoutes = ["/customer", "/checkout"];

  // // Helper for cookie options
  // const cookieOptions = {
  //   path: "/",
  //   sameSite: "lax" as const,
  //   secure: process.env.NODE_ENV === "production",
  // };

  // Case 1: Protected routes - redirect to login if not authenticated and set lastRoute
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isProtectedRoute && !isAuthenticated) {
    // Set lastRoute cookie before redirecting
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: Public routes - redirect to dashboard if authenticated
  const isPublicRoute = publicRoutes.some((route) => pathname === route);
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/customer/dashboard", request.url));
  }

  // Case 3: All other routes - set lastRoute cookie
  if (!isPublicRoute) {
    const response = NextResponse.next();
    // response.cookies.set("lastRoute", pathname, cookieOptions);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.well-known).*)"],
};

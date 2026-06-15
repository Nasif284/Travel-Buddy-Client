import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("accessToken")?.value;

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/"];
  const authPaths = ["/login", "/signup"];
  const adminAuthPath = "/admin/login";
  const adminProtected = ["/admin/users"];

  const isAuth = authPaths.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAdminAuthPath = pathname == adminAuthPath;
  const isAdminProtected = adminProtected.includes(pathname);

  if (isAdminAuthPath && refreshToken) {
    return NextResponse.redirect(new URL("/admin/users", request.url));
  }
  if (isAuth && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAdminProtected && !refreshToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const userRefreshToken = request.cookies.get("refreshToken")?.value;
  const adminRefreshToken = request.cookies.get("adminRefreshToken")?.value;

  const isUserAuth = pathname === "/login" || pathname === "/signup";
  const isAdminAuth = pathname === "/admin/login";

  const isAdminRoute = pathname.startsWith("/admin");
  const isUserProtected = pathname === "/" || pathname.startsWith("/profile") || pathname.startsWith("/trips") || pathname.startsWith("/chat");

  if (isUserAuth && userRefreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminAuth && adminRefreshToken) {
    return NextResponse.redirect(new URL("/admin/users", request.url));
  }

  if (isUserProtected && !userRefreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && !isAdminAuth && !adminRefreshToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
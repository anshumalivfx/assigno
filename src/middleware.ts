import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/",
    "/admin",
    "/verify/:path*",
    "/new-password/:path*",
    "/employee-sign-in",
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  console.log(`Token: ${token ? "Present" : "Absent"}`);
  console.log(`Request Path: ${url.pathname}`);

  if (token) {
    if (url.pathname.startsWith("/admin-login") || url.pathname === "/") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } else if (url.pathname === "/" || url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

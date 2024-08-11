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
    "/admin-login",
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
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/new-password") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/employee-sign-in") ||
      url.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } else if (url.pathname === "/admin") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

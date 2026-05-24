import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LoginRoute, ProtectedRoute } from "./lib/routeList";

const { auth } = NextAuth(authConfig);

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { nextUrl } = req;

  const isProtected = ProtectedRoute.find((route) =>
    nextUrl.pathname.startsWith(route),
  );
  const isLogin = LoginRoute.includes(nextUrl.pathname);
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
  }
  if (isAuthenticated && isLogin) {
    return NextResponse.redirect(new URL("/profile", nextUrl));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin/:path*",
  ],
};

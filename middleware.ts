import { NextResponse } from "next/server";
import { auth } from "./auth";
import type { NextAuthRequest } from "next-auth";
import { LoginRoute, ProtectedRoute } from "./lib/routeList";

export default auth((req: NextAuthRequest) => {
  const session = req.auth;
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
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin/:path*",
  ],
};

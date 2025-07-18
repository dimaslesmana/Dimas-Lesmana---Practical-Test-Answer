import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const user =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("user");

  const isLoggedIn = typeof user !== "undefined";
  const isLoginPage = request.nextUrl.pathname === "/login";

  console.log("isLoggedIn:", isLoggedIn);
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

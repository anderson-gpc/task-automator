import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./app/lib/auth";

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login/:path*"
],
};

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;

  const publicRoutes = ["/", "/login"];
  const publicPrefixes = ["/public", "/assets"];

  if (publicPrefixes.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  const authed = await isAuthenticated(request);
  if (publicRoutes.includes(path)) {
    if (authed && path === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!authed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If token exists and user tries to visit /login or /signup, redirect to dashboard
  if (token && (pathname === "/login" || pathname === "/signup")) {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // If token doesn't exist and user tries to access protected route, redirect to login
  if (!token && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Apply middleware for these paths
export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};

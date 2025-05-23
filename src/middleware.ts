import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token);
  if (!token) {
    // If no token, redirect to login page
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Apply middleware only to /user-dashboard
export const config = {
  matcher: ["/dashboard"],
};

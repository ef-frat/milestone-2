import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Clone the current URL
  const url = req.nextUrl.clone();

  // Read the authentication cookie
  const authToken = req.cookies.get("authToken");

  // Define protected routes
  const protectedRoutes = ["/checkout", "/profile"];

  // Check if the current route is protected
  const isProtected = protectedRoutes.some((route) => url.pathname.startsWith(route));

  if (isProtected && !authToken) {
    // If the user is not authenticated, redirect to the login page
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if:
  // 1. The route is not protected.
  // 2. A valid authToken exists.
  return NextResponse.next();
}

export const config = {
  // Define the matcher for the middleware
  matcher: ["/checkout/:path*", "/profile/:path*"],
};
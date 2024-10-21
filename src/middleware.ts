import { NextResponse } from "next/server";

export function middleware(req: any) {
  const session = req.cookies.get("session"); // get session

  //check if session exists
  if (!session) {
    // if session doesn't exist, redirect to landing page
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if session exists, continue to protected page
  return NextResponse.next();
}

export const config = {
  matcher: ["/home"], // protected page
};

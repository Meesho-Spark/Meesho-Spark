import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Authentication bypass - all routes are accessible without authentication
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

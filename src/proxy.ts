import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const UNLOCK_AT = new Date("2026-03-28T11:30:00-06:00");

const LOCKED_PATHS = [
  "/b4g/Challenges",
  "/b4g/PokerBot",
  "/b4g/FigmaChallenge",
  "/b4g/startups/Thewconverts",
  "/b4g/startups/Finch",
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLocked = LOCKED_PATHS.some((p) => pathname.startsWith(p));

  if (isLocked && Date.now() < UNLOCK_AT.getTime()) {
    return NextResponse.redirect(new URL("/b4g", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/b4g/Challenges/:path*", "/b4g/PokerBot", "/b4g/FigmaChallenge", "/b4g/startups/:path*"],
};
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "rp_session";
// Cookie lives for 7 days (in seconds)
const MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword) {
    // Misconfiguration — fail closed
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (password !== sitePassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  // Correct — set session cookie and return OK
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });

  return res;
}

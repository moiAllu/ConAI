import { NextRequest, NextResponse } from "next/server";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { message: "Google sign-in is not configured." },
      { status: 503 },
    );
  }
  const callbackPath = "/api/auth/google/callback";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_URL ||
    req.nextUrl.origin;
  const redirectUri = `${baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`}${callbackPath}`;
  const scope = "openid email profile";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
    access_type: "offline",
    prompt: "consent",
  });
  const url = `${GOOGLE_AUTH_URL}?${params.toString()}`;
  return NextResponse.redirect(url);
}

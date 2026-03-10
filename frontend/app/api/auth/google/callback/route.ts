import { NextRequest, NextResponse } from "next/server";
import { signInWithGoogle } from "@/auth";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (error) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("error", "google_denied");
    return NextResponse.redirect(loginUrl.toString());
  }

  if (!code || !clientId || !clientSecret) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("error", "google_config");
    return NextResponse.redirect(loginUrl.toString());
  }

  const callbackPath = "/api/auth/google/callback";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_URL ||
    req.nextUrl.origin;
  const redirectUri = `${baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`}${callbackPath}`;

  try {
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("Google token exchange failed:", err);
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("error", "google_token");
      return NextResponse.redirect(loginUrl.toString());
    }
    const tokens = await tokenRes.json();
    const accessToken = tokens.access_token;

    const userRes = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userRes.ok) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("error", "google_profile");
      return NextResponse.redirect(loginUrl.toString());
    }
    const googleUser = await userRes.json();

    const result = await signInWithGoogle({
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name || googleUser.email?.split("@")[0] || "User",
      picture: googleUser.picture,
      verified_email: googleUser.verified_email,
    }) as { status: number; token?: string; user?: any; message?: string };

    if (result.status !== 200 || !result.token) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("error", encodeURIComponent(result.message || "google_signin_failed"));
      return NextResponse.redirect(loginUrl.toString());
    }

    const oauthCallbackUrl = new URL("/auth/oauth-callback", req.nextUrl.origin);
    oauthCallbackUrl.hash = `token=${encodeURIComponent(result.token)}`;
    return NextResponse.redirect(oauthCallbackUrl.toString());
  } catch (e) {
    console.error("Google callback error:", e);
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("error", "google_error");
    return NextResponse.redirect(loginUrl.toString());
  }
}

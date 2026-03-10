import { NextResponse } from "next/server";

/**
 * Chrome DevTools requests this URL when DevTools is open.
 * Returning an empty config prevents 404s in logs.
 * @see https://developer.chrome.com/docs/devtools/
 */
export async function GET() {
  return NextResponse.json({});
}

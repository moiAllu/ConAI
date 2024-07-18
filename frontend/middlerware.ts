
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(
    req: NextRequest
  ) {
    console.log("Middleware");
    const user = cookies().get("token");
    if(user){
      return NextResponse.next();
    }
    return NextResponse.redirect("/login");
  }
  export const config={
    matcher: "/dashboard"
  }

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwt } from './lib/auth';

export default async function middleware(req: NextRequest, ) {
  const userFromCookie = cookies().get('CONAI');
  if(userFromCookie){
  const response = await verifyJwt(userFromCookie?.value ||'') as any
    if(response.payload.user?.verified){
      return NextResponse.next();
    }
      const url = req.nextUrl.clone();
      url.pathname = 'signup/verify-otp';
      return NextResponse.redirect(url.toString())
    
  }

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url.toString());
}
export const config = {
  matcher: ['/forms/:path*', '/dashboard/:path*',]
};

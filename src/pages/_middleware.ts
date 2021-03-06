/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 07 2021
 * @ Time: 11:30
 */

import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextApiRequest) {
  const pathname = req.url;

  // let public urls pass through
  if (process.env.NODE_ENV !== 'production') {
    if (
      pathname &&
      process.env.PUBLIC_URLS.split('|').find((val) => pathname.startsWith(val))
    ) {
      return NextResponse.next();
    }
  } else {
    if (
      pathname &&
      process.env.PUBLIC_URLS.split('|').find((val) =>
        pathname.startsWith(`${process.env.NEXTAUTH_URL}${val}`)
      )
    ) {
      return NextResponse.next();
    }
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // redirect to login page if no session
  if (!session) return NextResponse.redirect('/login');

  // continue with the flow
  return NextResponse.next();
}

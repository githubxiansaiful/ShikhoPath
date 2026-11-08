import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth/session';

export async function POST(request: Request) {
  await destroySession();
  const url = new URL(request.url);
  return NextResponse.redirect(new URL('/login', url.origin), {
    status: 303,
  });
}

import { NextResponse } from 'next/server';
import { getTokenFromCookie, verifyToken } from '@/lib/auth';

export async function GET() {
  const token = getTokenFromCookie();
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: { email: payload.email, role: payload.role, vip: payload.vip } });
}

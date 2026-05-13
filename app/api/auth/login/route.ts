import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { comparePassword, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !comparePassword(password, user.passwordHash)) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = createToken({ id: user.id, email: user.email, role: user.role, vip: user.vip });
  setAuthCookie(token);

  return NextResponse.json({ message: 'Authenticated' });
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createHash, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json({ message: 'Username, email and password are required' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: createHash(password),
      vip: false
    }
  });

  const token = createToken({ id: user.id, email: user.email, role: user.role, vip: user.vip });
  setAuthCookie(token);

  return NextResponse.json({ message: 'Created' });
}

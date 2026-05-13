import { NextResponse } from 'next/server';
import { systemState } from '@/lib/system';

export async function GET() {
  return NextResponse.json({ bannerUrl: systemState.bannerUrl });
}

export async function POST(request: Request) {
  const { bannerUrl: url } = await request.json();
  if (typeof url === 'string') {
    systemState.bannerUrl = url;
  }
  return NextResponse.json({ bannerUrl: systemState.bannerUrl });
}

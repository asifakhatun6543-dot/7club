import { NextResponse } from 'next/server';
import { systemState } from '@/lib/system';

export async function GET() {
  return NextResponse.json({ maintenance: systemState.maintenanceMode });
}

export async function POST(request: Request) {
  const body = await request.json();
  systemState.maintenanceMode = Boolean(body.maintenance);
  return NextResponse.json({ maintenance: systemState.maintenanceMode });
}

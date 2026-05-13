import { NextResponse } from 'next/server';
import { systemState } from '@/lib/system';

export async function GET() {
  return NextResponse.json({
    maintenance: systemState.maintenanceMode,
    version: '1.0.0',
    serverName: 'Streammore Node API',
    bannerUrl: systemState.bannerUrl
  });
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const items = await prisma.content.findMany({
    orderBy: { releaseDate: 'desc' },
    take: 30,
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      poster: true,
      categories: true,
      genres: true,
      country: true,
      year: true,
      isVip: true
    }
  });
  const normalized = items.map((item) => ({
    ...item,
    categories: item.categories.split(',').map((value) => value.trim()),
    genres: item.genres.split(',').map((value) => value.trim())
  }));
  return NextResponse.json({ items: normalized });
}

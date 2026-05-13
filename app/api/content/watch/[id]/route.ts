import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const slug = params.id;
  const item = await prisma.content.findUnique({ where: { slug } });
  if (!item) {
    return NextResponse.json({ message: 'Content not found' }, { status: 404 });
  }
  return NextResponse.json({
    item: {
      title: item.title,
      description: item.description,
      poster: item.poster,
      externalUrl: item.externalUrl,
      slug: item.slug,
      isVip: item.isVip,
      categories: item.categories.split(',').map((value) => value.trim()),
      year: item.year,
      qualityUrls: JSON.parse(item.qualities as string),
      subtitles: JSON.parse(item.subtitles as string)
    }
  });
}

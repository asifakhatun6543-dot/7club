import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = bcrypt.hashSync('Admin123!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@streammore.test' },
    update: {},
    create: {
      email: 'admin@streammore.test',
      username: 'StreammoreAdmin',
      passwordHash: adminPassword,
      role: 'ADMIN',
      vip: true
    }
  });

  const sampleContent = [
    {
      title: 'Neon Horizon',
      slug: 'neon-horizon',
      description: 'A dark cinematic sci-fi thriller with dramatic cityscapes and high-speed intrigue.',
      type: 'MOVIE',
      categories: 'Trending,Western,Action',
      genres: 'Sci-Fi,Thriller',
      country: 'USA',
      year: 2025,
      poster: 'https://images.unsplash.com/photo-1517604931442-7d56a5d0e63b?auto=format&fit=crop&w=800&q=80',
      banner: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80',
      externalUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      qualities: JSON.stringify({ '480p': 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '720p': 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }),
      subtitles: JSON.stringify([{ label: 'English', src: '/subs/english.vtt', srclang: 'en' }]),
      isVip: false
    },
    {
      title: 'Mumbai Midnight',
      slug: 'mumbai-midnight',
      description: 'A mood-driven drama with vibrant streets, romance, and a growing sense of destiny.',
      type: 'MOVIE',
      categories: 'Hindi,Trending',
      genres: 'Romance,Drama',
      country: 'India',
      year: 2024,
      poster: 'https://images.unsplash.com/photo-1542204165-8a1d4058d31f?auto=format&fit=crop&w=800&q=80',
      banner: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
      externalUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      qualities: JSON.stringify({ '720p': 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' }),
      subtitles: JSON.stringify([]),
      isVip: true
    },
    {
      title: 'Seoul Avenue',
      slug: 'seoul-avenue',
      description: 'A stylish Korean series that blends romance, action, and cinematic mystery.',
      type: 'TV',
      categories: 'Korean,Recommended For You',
      genres: 'Romance,Thriller',
      country: 'South Korea',
      year: 2025,
      poster: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=800&q=80',
      banner: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80',
      externalUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      qualities: JSON.stringify({ '480p': 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }),
      subtitles: JSON.stringify([]),
      isVip: false
    }
  ];

  for (const item of sampleContent) {
    await prisma.content.upsert({
      where: { slug: item.slug },
      update: {},
      create: item as any
    });
  }
}

main()
  .then(() => {
    console.log('Seed complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

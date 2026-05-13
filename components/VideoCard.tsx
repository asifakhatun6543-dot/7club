import Link from 'next/link';

interface VideoCardProps {
  id: string;
  title: string;
  poster: string;
  description: string;
  slug: string;
  isVip: boolean;
}

export default function VideoCard({ id, title, poster, description, slug, isVip }: VideoCardProps) {
  return (
    <Link href={`/watch/${slug}`} className="video-card group">
      <div className="video-card-image" style={{ backgroundImage: `url(${poster})` }}>
        {isVip && <span className="video-badge">VIP</span>}
      </div>
      <div className="video-card-body">
        <h3>{title}</h3>
        <p>{description.slice(0, 70)}...</p>
      </div>
    </Link>
  );
}

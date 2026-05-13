import VideoCard from './VideoCard';

interface SectionRowProps {
  title: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    poster: string;
    slug: string;
    isVip: boolean;
  }>;
}

export default function SectionRow({ title, items }: SectionRowProps) {
  return (
    <section className="mb-8">
      <div className="section-row-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-row-scroll">
        {items.map((item) => (
          <VideoCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

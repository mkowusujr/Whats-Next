import MediaCard from './MediaCard';

type MediaCardGridProps = { media: Media[] };

export default function MediaCardGrid({ media }: MediaCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {media.map(m => (
        <MediaCard key={m.id} media={m} />
      ))}
    </div>
  );
}

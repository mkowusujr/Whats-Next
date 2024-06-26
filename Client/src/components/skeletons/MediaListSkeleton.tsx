import MediaCellSkeleton from './MediaCellSkeleton';

export default function MediaListSkeleton() {
  const MediaListSkeleton = [];
  for (let i = 0; i <= 13; i++) {
    MediaListSkeleton.push(<MediaCellSkeleton key={i} />);
  }
  return MediaListSkeleton;
}

import Skeleton from 'react-loading-skeleton';
import MediaListSkeleton from './MediaListSkeleton';

export default function ListPageSkeleton() {
  return (
    <div>
      <div className="filter">
        <div className="filter-group">
          <Skeleton width={740.6} height={39.4} />
          <Skeleton width={103.4} height={39.4} />
        </div>
      </div>
      <MediaListSkeleton />
    </div>
  );
}

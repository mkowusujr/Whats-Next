import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MediaCellSkeleton() {
  return (
    <div className="media-cell-item">
      <Skeleton variant="rectangular" height={75} width={50} />
      <div>
        <Skeleton variant="rectangular" height={20} width={150} />
      </div>
      <div className="media-cell-options">
        <Skeleton variant="rectangular" height={23.667} width={130.75} />
        <Skeleton variant="rectangular" height={23.667} width={95.4667} />
        <Skeleton variant="rectangular" height={23.667} width={20} />
        <Skeleton variant="rectangular" height={23.667} width={20} />
      </div>
    </div>
  );
}

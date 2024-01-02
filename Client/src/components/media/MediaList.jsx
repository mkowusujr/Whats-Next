import MediaItem from './MediaItem';
import '../../sass/media.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MediaList(props) {
  const mediaItems = props.mediaList.map(m => (
    <MediaItem
      key={m.id}
      media={m}
      removeFromList={props.removeFromList}
      updateList={props.updateList}
    />
  ));

  const loadingSkeleton = (
    <tr className="media-item">
      <td>
        <Skeleton variant="rectangular" height={75} width={50} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={195} />
        {/* <Skeleton variant="rectangular" height={22} width={75} /> */}
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={44} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={127} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={95} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={73} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={22} width={58} />
      </td>
    </tr>
  );

  return (
    <div className="media-list">
      <h2 className="title">{props.mediaType} Next </h2>
      <>{props.filterComponent}</>
      <hr className="media-hr"></hr>
      <table>
        <tbody>
          <>
            {mediaItems.length != 0 ? (
              <>{mediaItems}</>
            ) : (
              <>
                <>{loadingSkeleton}</>
                <>{loadingSkeleton}</>
                <>{loadingSkeleton}</>
                <>{loadingSkeleton}</>
                <>{loadingSkeleton}</>
              </>
            )}
          </>
        </tbody>
      </table>
    </div>
  );
}

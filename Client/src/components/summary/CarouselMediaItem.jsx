import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PropTypes } from 'prop-types';

import DialogComponent from '../common/DialogComponent';
import '../../sass/summary.scss';
import ProgressItem from '../Progress/ProgressItem';

/**
 * Component representing a media item in a carousel.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.data - The data item data.
 * @returns {JSX.Element} - The rendered CarouselMediaItem component.
 */
export default function CarouselMediaItem({ data }) {
  const progress = {
    id: data.pID,
    current: data.current,
    total: data.total,
    unit: data.unit,
    dateStarted: data.datedStarted,
    dateCompleted: data.dateCompleted
  };
  
  const progressTracking = (
    <>
      {data.pID ? (
        <ProgressItem
          mediaType={data.mediaType}
          progress={progress}
        />
      ) : (
        <></>
      )}
    </>
  );

  return (
    <div className="carousel-item">
      <LazyLoadImage
        id={`cover-img${data.id}`}
        src={data.img}
        width={100}
        height={150}
        placeholder={
          <Skeleton variant="rectangular" height={150} width={100} />
        }
      />
      <div className="item-info">
        <h4>
          {data.title +
            (data.subTitle ? ' ' + data.subTitle : '') +
            ' | ' +
            data.mediaType}
        </h4>
        <>{data.score ? <p>Score: {data.score}</p> : <></>}</>
        <p>Storage: {data.storage}</p>
        <p>Status: {data.status}</p>
        <>{progressTracking}</>
        <DialogComponent
          buttonText="View Summary"
          element={
            <div>
              <p>{data.summary}</p>
            </div>
          }
          onOpen={() => {}}
        />
      </div>
    </div>
  );
}

CarouselMediaItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    mediaType: PropTypes.string,
    score: PropTypes.number,
    storage: PropTypes.string,
    status: PropTypes.string,
    summary: PropTypes.string
  }).isRequired
};

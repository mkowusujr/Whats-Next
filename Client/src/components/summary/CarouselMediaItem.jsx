import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PropTypes } from 'prop-types';

import '../../sass/summary.scss';

/**
 * Component representing a media item in a carousel.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.data - The data item data.
 * @returns {JSX.Element} - The rendered CarouselMediaItem component.
 */
export default function CarouselMediaItem({ data }) {
  const progressTracking = (
    <>
      {data.pID ? (
        <p>
          {`${data.progressTitle} ${data.current}/${data.total} ${
            data.unit
          } Started ${
            data.dateStarted
              ? new Date(data.dateStarted).toDateString()
              : 'Date Unknown'
          }`}
        </p>
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
      <Link to={"/media?mediaID=" + data.id }>
      <div className="item-info">
        <h4>
          {data.title +
            (data.subTitle ? ' ' + data.subTitle : '') }
        </h4>
        <>{data.score ? <p>Score: {data.score}</p> : <></>}</>
        <p>Storage: {data.storage}</p>
        <p>Status: {data.status}</p>
        <>{progressTracking}</>
      </div>
      </Link>
        
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

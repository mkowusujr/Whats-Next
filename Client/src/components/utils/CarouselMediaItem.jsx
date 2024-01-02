import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PropTypes } from 'prop-types';

import DialogComponent from './DialogComponent';
import '../../sass/summary.scss';

/**
 * Component representing a media item in a carousel.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.media - The media item data.
 * @param {boolean} props.showScore - Determines whether to display the score information.
 * @returns {JSX.Element} - The rendered CarouselMediaItem component.
 */
export default function CarouselMediaItem({ media, showScore }) {
  return (
    <div className="carousel-item">
      <LazyLoadImage
        id={`cover-img${media.id}`}
        src={media.img}
        width={100}
        height={150}
        placeholder={
          <Skeleton variant="rectangular" height={150} width={100} />
        }
      />
      <div className="item-info">
        <h4>
          {media.title +
            (media.subTitle ? ' ' + media.subTitle : '') +
            ' | ' +
            media.mediaType}
        </h4>
        <>{showScore ? <p>Score: {media.score}</p> : <></>}</>
        <p>Storage: {media.storage}</p>
        <p>Status: {media.status}</p>
        {/* <DialogComponent
          buttonText="View Summary"
          element={
            <div>
              <p>{media.summary}</p>
            </div>
          }
          onOpen={() => {}}
        /> */}
      </div>
    </div>
  );
}

CarouselMediaItem.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    mediaType: PropTypes.string,
    score: PropTypes.number,
    storage: PropTypes.string,
    status: PropTypes.string,
    summary: PropTypes.string
  }).isRequired,
  showScore: PropTypes.bool.isRequired
};

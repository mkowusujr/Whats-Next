import '../../sass/summary.scss';
import DialogComponent from './DialogComponent';
import Skeleton from 'react-loading-skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CarouselMediaItem(props) {
  const media = props.item;

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
        <>{props.showScore ? <p>Score: {media.score}</p> : <></>}</>
        <p>Storage: {media.storage}</p>
        <p>Status: {media.status}</p>
        <DialogComponent
          buttonText="View Summary"
          cmpnt={
            <div>
              <p>{media.summary}</p>
            </div>
          }
          onOpen={() => {}}
        />
      </div>
    </div>
  );
}

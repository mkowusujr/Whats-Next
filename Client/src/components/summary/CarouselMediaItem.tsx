import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

type CarouselMediaItemProps = {
  /** The data item data. */
  data: any;
};

/** Component representing a media item in a carousel. */
export default function CarouselMediaItem({ data }: CarouselMediaItemProps) {
  const progressTracking = (
    <>
      {data.pID ? (
        <>
          <p>{`${data.progressTitle}`}</p>
          <p>
            {` Started ${
              data.dateStarted
                ? new Date(data.dateStarted).toDateString()
                : 'Date Unknown'
            }`}
          </p>
          <p>{`${data.current}/${data.total} ${data.unit}`}</p>
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <div
      style={{
        backgroundImage: `url(${data.img}), url('http://placehold.it/500x500')`
      }}
      className={`my-4 h-40 rounded-md bg-cover bg-fixed bg-center bg-no-repeat text-white`}
    >
      <Link
        className="flex h-full rounded-md bg-black/40 px-8 py-4 backdrop-blur-sm"
        to={'/media?mediaID=' + data.id}
      >
        <LazyLoadImage
          id={`cover-img${data.id}`}
          src={data.img}
          className="mr-8 hidden w-[90px] rounded-sm sm:block"
        />
        <div className="w-full text-sm sm:text-lg">
          <h4 className="text-lg font-semibold sm:text-xl">
            {data.title + (data.subTitle ? ' ' + data.subTitle : '')}
          </h4>
          <>{data.score ? <p>Score: {data.score}</p> : <></>}</>
          <>{progressTracking}</>
        </div>
      </Link>
    </div>
  );
}

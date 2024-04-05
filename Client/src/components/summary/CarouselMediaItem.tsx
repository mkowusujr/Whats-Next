import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useContext } from 'react';
import { SummaryPageDialogContext } from '@/pages/WhatsNextPage';
import { DialogTrigger } from '../common/Dialog';
import MediaSummary from './MediaSummary';
import { getMediaFullTitle } from '@/lib/utils/media-utils';

type CarouselMediaItemProps = {
  /** The data item data. */
  data: any;
};

/** Component representing a media item in a carousel. */
export default function CarouselMediaItem({ data }: CarouselMediaItemProps) {
  const { setContents } = useContext(SummaryPageDialogContext);
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
    <DialogTrigger onClick={() => setContents(<MediaSummary media={data} />)}>
      <div
        style={{
          backgroundImage: `url(${data.img}), url('http://placehold.it/500x500')`
        }}
        className={`my-4 h-40 w-full rounded-md bg-cover bg-fixed bg-center bg-no-repeat text-white`}
      >
        <div className="flex h-full rounded-md bg-black/40 px-8 py-4 backdrop-blur-sm">
          <LazyLoadImage
            id={`cover-img${data.id}`}
            src={data.img}
            className="mr-8 hidden w-[80px] rounded-sm sm:block"
          />
          <div className="w-full text-sm sm:text-lg">
            <h4 className="flex text-lg font-semibold sm:text-xl">
              {`${getMediaFullTitle(data)}${data.score !== undefined ? ` | Score: ${data.score}` : ''}`}
            </h4>
            <>
              {data.status === 'Planned' || data.status === 'Completed' ? (
                <p className="line-clamp-2">{data.summary}</p>
              ) : (
                <></>
              )}
            </>
            <>{progressTracking}</>
          </div>
        </div>
      </div>
    </DialogTrigger>
  );
}

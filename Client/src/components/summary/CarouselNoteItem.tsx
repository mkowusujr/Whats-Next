import { SummaryPageDialogContext } from '@/pages/WhatsNextPage';
import { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { DialogTrigger } from '../common/Dialog';
import NoteSummary from './NoteSummary';
import { getMediaFullTitle } from '@/lib/utils/media-utils';

type CarouselNoteItemProps = {
  /** The data item data. */
  data: NoteSummary;
};

/** Displays a carousel item for a note. */
export default function CarouselNoteItem({ data }: CarouselNoteItemProps) {
  const { setContents } = useContext(SummaryPageDialogContext);

  return (
    <DialogTrigger onClick={() => setContents(<NoteSummary note={data} />)}>
      <div
        style={{
          backgroundImage: `url(${data.img}), url('http://placehold.it/500x500')`
        }}
        className={`my-4 h-40 rounded-md bg-cover bg-fixed bg-center bg-no-repeat text-white`}
      >
        <div className="flex h-full rounded-md bg-black/40 px-8 py-4 backdrop-blur-sm">
          <LazyLoadImage
            id={`cover-img${data.id}`}
            src={data.img}
            className="mr-8 hidden w-[90px] rounded-sm sm:block"
          />
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">{`${data.title} [${getMediaFullTitle(
              data.mediaTitle,
              data.mediaSubtitle
            )}]`}</h4>
            <p className="line-clamp-2">{data.content}</p>
            <p className="ml-auto mt-auto text-sm">
              <i>Created on {new Date(data.dateCreated).toDateString()} </i>
            </p>
          </div>
        </div>
      </div>
    </DialogTrigger>
  );
}

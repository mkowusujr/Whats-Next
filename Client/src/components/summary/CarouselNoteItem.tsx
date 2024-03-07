import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

type CarouselNoteItemProps = {
  /** The data item data. */
  data: any;
};

/** Displays a carousel item for a note. */
export default function CarouselNoteItem({ data }: CarouselNoteItemProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${data.img}), url('http://placehold.it/500x500')`
      }}
      className={`my-4 h-40 rounded-md bg-cover bg-fixed bg-center bg-no-repeat text-white`}
    >
      <Link
        className="flex h-full rounded-md bg-black/40 px-8 py-4 backdrop-blur-sm"
        to={'/media?mediaID=' + data.mediaID}
      >
        <LazyLoadImage
          id={`cover-img${data.id}`}
          src={data.img}
          className="mr-8 hidden w-[90px] rounded-sm sm:block"
        />
        <div className="">
          <h4 className="text-lg font-semibold">{`${data.title} [${
            data.mediaTitle +
            (data.mediaSubTitle ? ' ' + data.mediaSubTitle : '')
          }]`}</h4>
          <p className="w-[375px] truncate ">
            {data.content}
            {/* {data.content.slice(0, 50) +
              (data.content.length > 50 ? '...' : '')} */}
          </p>
          <p className="text-sm">
            <i>Created on {new Date(data.dateCreated).toDateString()} </i>
          </p>
        </div>
      </Link>
    </div>
  );
}

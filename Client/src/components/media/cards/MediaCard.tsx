import { getMediaFullTitle } from '@/lib/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GoogleMedia from '../options/GoogleMedia';
import { ViewSummary } from '../options/ViewSummary';
import { MediaOptions } from '../options/MediaOptions';
import MediaCardProgressSection from './MediaCardProgressSection';

type MediaCardProps = { media: Media };

export default function MediaCard({ media }: MediaCardProps) {
  return (
    <div className="flex h-[155px] rounded-md border-2 border-accent bg-base-300 p-4 text-sm shadow-sm">
      <LazyLoadImage
        id={`cover-img${media.id}`}
        src={
          media.imgLink.includes('books.google.com')
            ? `https://books.google.com/books/content?id=${media.imgLink.split('id=')[1].split('&')[0]}&printsec=frontcover&img=1`
            : media.imgLink
        }
        width={80}
        height={120}
        placeholder={
          <div className="mr-4 h-[120px] w-20 animate-pulse rounded-sm bg-secondary"></div>
        }
        className="mr-4 h-[120px] w-20 rounded-sm"
      />
      <div className="flex flex-grow flex-col gap-2">
        <div className="inline-flex text-neutral">
          <span className="mr-2 font-semibold">{getMediaFullTitle(media)}</span>
          <div className="ml-auto flex gap-2">
            {/* <MediaLink /> */}
            <GoogleMedia name={getMediaFullTitle(media)} />
            <ViewSummary mediaSummary={media.summary} />
          </div>
        </div>
        <MediaCardProgressSection progress={media.progress[0]} />
        <MediaOptions media={media} />
      </div>
    </div>
  );
}

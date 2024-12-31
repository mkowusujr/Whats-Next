import { getMediaFullTitle } from '@/lib/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ViewSummary } from '../options/ViewSummary';
import MediaCardProgressSection from './MediaCardProgressSection';
import DeleteMedia from '../options/DeleteMedia';
import ViewProgress from '../options/ViewProgress';
import { ViewNotes } from '../options/ViewNotes';

type MediaCardProps = { media: Media };

export default function MediaCard({ media }: MediaCardProps) {
  const searchQuery = encodeURIComponent(getMediaFullTitle(media));
  const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}`;

  return (
    <div className="flex h-[200px] justify-between rounded-md border-2 border-borders-600 bg-base-200 p-4 text-sm shadow-sm">
      <LazyLoadImage
        id={`cover-img${media.id}`}
        src={
          media.imgLink.includes('books.google.com')
            ? `https://books.google.com/books/content?id=${media.imgLink.split('id=')[1].split('&')[0]}&printsec=frontcover&img=1`
            : media.imgLink
        }
        width={116}
        height={165}
        placeholder={
          <div className="bg-secondary h-[165px] w-[116px] animate-pulse rounded-sm"></div>
        }
        className="rounded-md"
      />
      <div className="flex flex-col gap-2">
        <div className="inline-flex text-solid-900">
          <a
            href={googleSearchUrl}
            className="mr-2 font-semibold hover:text-solid-1000"
          >
            {getMediaFullTitle(media)}
          </a>
        </div>
        <MediaCardProgressSection progress={media.currentProgress} />
      </div>
      <div className="flex flex-col justify-between text-solid-900 hover:text-solid-1000">
        {/* <MediaLink /> */}
        {/* <GoogleMedia name={getMediaFullTitle(media)} /> */}
        <ViewSummary mediaSummary={media.summary} />
        <ViewProgress media={media} />
        <ViewNotes media={media} />
        <DeleteMedia mediaId={media.id} />
      </div>
    </div>
  );
}

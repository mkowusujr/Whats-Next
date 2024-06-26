import { getMediaFullTitle } from '@/lib/utils';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import GoogleMedia from '../DEPRICATED/media/MediaOptions/GoogleMedia';
import {
  SelectMediaScore,
  SelectMediaStatus
} from '../DEPRICATED/media/MediaOptions/MediaSelectInputs';
import { ViewSummary } from '../DEPRICATED/media/MediaOptions/ViewSummary';

type Props = { media: Media[] };

export default function MediaCards({ media }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {media.map(m => (
        <MediaCard key={m.id} media={m} />
      ))}
    </div>
  );
}

const MediaCard = ({ media }: { media: Media }) => {
  const [mediaData, setMediaData] = useState(media);
  const [status, setStatus] = useState(media.status);
  const [score, setScore] = useState(media.score);
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
            <ViewSummary media={media} />
          </div>
        </div>
        <SelectMediaScore
          score={score}
          setScore={setScore}
          className="rounded-sm"
        />
        <SelectMediaStatus
          status={status}
          setStatus={setStatus}
          className="rounded-sm"
        />
        {/* <MediaOptions
          media={media}
          setmedia={setmedia}
          updateList={updateList}
          removeFromList={removeFromList}
        /> */}
      </div>
    </div>
  );
};

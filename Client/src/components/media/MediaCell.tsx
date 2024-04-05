import { useEffect, useState } from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';
import { updateMedia } from '@/lib/data/media';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ViewSummary } from './MediaOptions/ViewSummary';
import { MediaOptions } from './MediaOptions/MediaOptions';
import { getMediaFullTitle } from '@/lib/utils/media-utils';
import {
  SelectMediaScore,
  SelectMediaStatus
} from './MediaOptions/MediaSelectInputs';
import useSubsequentEffect from '@/lib/hooks/useSubsequentEffect';
import GoogleMedia from './MediaOptions/GoogleMedia';

type MediaCellProps = {
  /** The media object containing information about the item. */
  media: Media;
  /** Callback function to remove the media item from the list. */
  removeFromList: RemoveFromList;
  /** Callback function to update the list after a change.*/
  updateList: UpdateList<Media>;
};

/** Functional component representing a media item in a list. */
export default function MediaCell({
  media,
  removeFromList,
  updateList
}: MediaCellProps) {
  const [mediaData, setMediaData] = useState(media);
  const [status, setStatus] = useState(media.status);
  const [score, setScore] = useState(media.score);

  useEffect(() => {
    setScore(mediaData.score);
    setStatus(mediaData.status);
  }, [mediaData]);

  useSubsequentEffect(() => {
    const updatedMedia = {
      ...media,
      score: score,
      status: status
    };

    updateMedia(updatedMedia).catch(err => console.error(err));
  }, [score, status]);

  const MediaLink = () => {
    return (
      media.link && (
        <a href={media.link}>
          <LinkIcon className="size-5" />
        </a>
      )
    );
  };

  return (
    <div className="flex h-[155px] rounded-md border-2 border-accent bg-base-300 p-4 text-sm shadow-sm">
      <LazyLoadImage
        id={`cover-img${mediaData.id}`}
        src={mediaData.img}
        width={80}
        height={120}
        placeholder={
          <div className="mr-4 h-[120px] w-20 animate-pulse rounded-sm bg-secondary"></div>
        }
        className="mr-4 h-[120px] w-20 rounded-sm"
      />
      <div className="flex flex-grow flex-col gap-2">
        <div className="inline-flex text-neutral">
          <span className="mr-2 font-semibold">
            {getMediaFullTitle(mediaData)}
          </span>
          <div className="ml-auto flex gap-2">
            <MediaLink />
            <GoogleMedia name={getMediaFullTitle(mediaData)} />
            <ViewSummary media={mediaData} />
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
        <MediaOptions
          media={mediaData}
          setMediaData={setMediaData}
          updateList={updateList}
          removeFromList={removeFromList}
        />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';
import { scores, statuses } from '@/lib/form-fields';
import Select from '@/components/common/Select';
import { updateMedia } from '@/lib/data/media';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ViewSummary } from './MediaOptions/ViewSummary';
import { MediaOptions } from './MediaOptions/MediaOptions';
import { getMediaFullTitle } from '@/lib/utils/media-utils';

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

  /** Handles changes in input fields and updates the media data. */
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setMediaData({ ...media, [name]: value });
    updateMedia({ ...media, [name]: value })
      .then(m => updateList(m!))
      .catch(err => console.error(err));
  };

  // Selectors for score and status dropdowns
  const ScoreSelector = () => (
    <Select
      name={'score'}
      value={mediaData.score}
      options={scores}
      onChange={handleChange}
      className="rounded-sm"
    />
  );

  const StatusSelector = () => (
    <Select
      name={'status'}
      value={mediaData.status}
      options={statuses}
      onChange={handleChange}
      className="rounded-sm"
    />
  );

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
        id={`cover-img${media.id}`}
        src={media.img}
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
            <MediaLink />
            <ViewSummary media={media} />
          </div>
        </div>
        <ScoreSelector />
        <StatusSelector />
        <MediaOptions
          media={media}
          updateList={updateList}
          removeFromList={removeFromList}
        />
      </div>
    </div>
  );
}

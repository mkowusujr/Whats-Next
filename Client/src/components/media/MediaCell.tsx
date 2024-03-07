import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { scores, statuses } from '@/lib/form-fields';
import Select from '../common/Select';
import { deleteMedia, updateMedia } from '@/lib/data/media';
import MediaCellSkeleton from '../skeletons/MediaCellSkeleton';
import {
  LazyLoadComponent,
  LazyLoadImage
} from 'react-lazy-load-image-component';

type MediaCellProps = {
  /** The media object containing information about the item. */
  media: Media;
  /** Callback function to remove the media item from the list. */
  removeFromList: Function;
  /** Callback function to update the list after a change.*/
  updateList: Function;
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
      .then(m => updateList(m))
      .catch(err => console.error(err));
  };

  // Selectors for score and status dropdowns
  const ScoreSelector = () => (
    <Select
      name={'score'}
      value={mediaData.score}
      options={scores}
      onChange={handleChange}
    />
  );

  const StatusSelector = () => (
    <Select
      name={'status'}
      value={mediaData.status}
      options={statuses}
      onChange={handleChange}
    />
  );

  const ViewMore = ({ className }: { className?: string }) => (
    <button className={className ?? ''}>
      <Link to={'/media?mediaID=' + media.id}>
        <InformationCircleIcon className="size-5">
          <i className="gg-menu"></i>
        </InformationCircleIcon>
      </Link>
    </button>
  );

  // Button click handler for deleting the media item
  const handleDeletion = () => {
    deleteMedia(media.id)
      .then(() => removeFromList(media.id))
      .catch(err => console.error(err));
  };

  const DeleteBtn = () => <TrashIcon className="size-5" />;

  return (
    <div className="flex rounded-md bg-slate-500 p-4 text-sm shadow-sm">
      <LazyLoadImage
        id={`cover-img${media.id}`}
        src={media.img}
        width={80}
        height={120}
        placeholder={
          <div className="mr-4 h-[120px] w-20 animate-pulse rounded-sm bg-gray-400"></div>
        }
        className="mr-4 h-[120px] w-20 rounded-sm"
      />
      <div className="flex flex-grow flex-col gap-2">
        <div className="inline-flex text-white">
          <span className="mr-2 font-semibold">
            {(media.title + ' ' + (media.subTitle ?? '')).trim()}
          </span>
          <ViewMore className="ml-auto" />
        </div>
        <ScoreSelector />
        <StatusSelector />
        {/* <DeleteBtn/> */}
      </div>
    </div>
  );
}

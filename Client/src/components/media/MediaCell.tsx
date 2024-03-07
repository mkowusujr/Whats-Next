import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrashIcon,
  InformationCircleIcon,
  LinkIcon,
  BookOpenIcon,
  PencilSquareIcon,
  PresentationChartLineIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { scores, statuses } from '@/lib/form-fields';
import Select from '../common/Select';
import { deleteMedia, updateMedia } from '@/lib/data/media';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Dialog, DialogContent, DialogTrigger } from '../common/Dialog';
import clsx from 'clsx';

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

  const MediaLink = () => {
    return (
      media.link && (
        <a href={media.link}>
          <LinkIcon className="size-5" />
        </a>
      )
    );
  };

  const ViewSummary = () => (
    <div>
      <Dialog>
        <DialogTrigger>
          <InformationCircleIcon className="size-5" />
        </DialogTrigger>
        <DialogContent>
          <p className="w-72 rounded-md bg-white/80 p-6 text-2xl text-black backdrop-blur-sm sm:w-[500px] lg:w-[800px]">
            {media.summary}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );

  const MoreOption = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="mt-auto flex justify-end gap-2 text-white">
        <div
          className={clsx('flex gap-1 opacity-0', {
            'pointer-events-auto animate-fade-out opacity-0': !isOpen,
            'pointer-events-auto visible animate-fade-in opacity-100': isOpen
          })}
        >
          <BookOpenIcon className="size-5" />
          <PresentationChartLineIcon className="size-5" />
          <PencilSquareIcon className="size-5" />
          <TrashIcon className="size-5" />
        </div>
        <EllipsisVerticalIcon
          className="size-5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  };

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
          <div className="ml-auto flex gap-2">
            <MediaLink />
            <ViewSummary />
          </div>
        </div>
        <ScoreSelector />
        <StatusSelector />
        <MoreOption />
      </div>
    </div>
  );
}

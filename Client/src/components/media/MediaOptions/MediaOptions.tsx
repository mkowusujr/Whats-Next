import {
  BookOpenIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import DeleteMedia from './DeleteMedia';
import EditMedia from './EditMedia';
import ViewProgress from './ViewProgress';
import { ViewNotes } from './ViewNotes';

type MediaOptionsProps = {
  media: Media;
  updateList: any;
  removeFromList: any;
  setMediaData: React.Dispatch<React.SetStateAction<Media>>;
};

export const MediaOptions = ({
  media,
  updateList,
  removeFromList,
  setMediaData
}: MediaOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-auto flex h-5 items-center justify-end gap-2 text-neutral">
      <div
        className={clsx('flex gap-1 align-middle opacity-0', {
          'pointer-events-auto hidden animate-fade-out opacity-0': !isOpen,
          'pointer-events-auto visible animate-fade-in opacity-100': isOpen
        })}
      >
        <ViewNotes media={media} />
        <ViewProgress media={media} />
        <EditMedia
          media={media}
          setMediaData={setMediaData}
          updateList={updateList}
        />
        <DeleteMedia media={media} removeFromList={removeFromList} />
      </div>
      <EllipsisVerticalIcon
        className="size-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

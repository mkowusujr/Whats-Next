import { cn, getMediaFullTitle } from '@/lib/utils';
import { StarIcon } from '@heroicons/react/24/outline';
import React from 'react';

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
  return (
    <div className="relative flex h-52 w-full flex-col overflow-hidden">
      <img src={media.imgLink} className="m-auto h-52 w-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 z-20 mt-auto flex w-full flex-col bg-black/85 p-2 text-white">
        <div className="flex justify-between">
          <div>
            <span className="font-bold">{media.title}</span>
            {media.subTitle && <span>: {media.subTitle}</span>}
          </div>
        </div>
        <div className="flex justify-between">
          <span>Progress</span>
          <div className="flex items-center gap-2">
            <StarIcon className="size-5" />
            <span>{media.score ?? 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// import { apiToast } from '@/lib/data/api-base';
// import { addMedia } from '@/lib/data/media';
// import { getMediaFullTitle } from '@/lib/utils/media-utils';
import { addMedia } from '@/lib/data/media';
import { getMediaFullTitle } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MediaTypesContext } from '../MediaTypesProvider';

type Props = {
  media: ExternalMedia;
};

export default function ExternalMediaPreview({ media }: Props) {
  const mediaTypes = useContext(MediaTypesContext);
  const queryClient = useQueryClient();
  const { mutateAsync: addMediaMutation } = useMutation({
    mutationFn: (media: ExternalMedia) => addMedia(media),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${mediaTypes.join('')}-media`] });
    }
  });

  const addExternalMedia = async () => {
    // const callAPI = new Promise<string>((res, rej) => {
    await addMediaMutation(media)
      .then(m => {
        // res(`Successfully added ${m!.title}`);
      })
      .catch(err => console.log(err));
    // });
    // apiToast(callAPI);
  };

  return (
    <div className="mb-6 flex break-inside-avoid-column justify-center gap-4 rounded-md border border-borders-600 bg-base-200 p-4">
      <div className="flex flex-col">
        <LazyLoadImage
          src={media.imgLink}
          className="my-auto rounded-md"
          placeholder={<div className="animate-pulse bg-gray-400"></div>}
        />
        <div>{media?.creator?.[0] ?? null}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-primary text-xl font-semibold">
            {getMediaFullTitle(media)}
          </h2>
          <div>{new Date(media.releaseDate).toLocaleDateString()}</div>
        </div>
        <div className="flex flex-col justify-around md:flex-row">
          <div className="flex justify-between">
            <div>{media.duration}</div>
            <div className="w-32 truncate capitalize">
              {media?.categories?.join(', ') ?? null}
            </div>
            <div className="capitalize">{media.mediaType}</div>
          </div>
        </div>
        <div className="h-40 w-[380px] overflow-y-auto rounded-md bg-interactive-300 p-2 px-4 py-1 text-lg">
          {media.summary}
        </div>
        <button
          onClick={addExternalMedia}
          className="text-secondary mt-auto rounded-md bg-solid-900 px-4 py-1 text-interactive-300 outline-none"
        >
          Add Next
        </button>
      </div>
    </div>
  );
}

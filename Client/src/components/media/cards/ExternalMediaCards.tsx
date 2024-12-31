// import { apiToast } from '@/lib/data/api-base';
// import { addMedia } from '@/lib/data/media';
// import { getMediaFullTitle } from '@/lib/utils/media-utils';
import { addMedia } from '@/lib/data/media';
import { getMediaFullTitle } from '@/lib/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Props = {
  media: ExternalMedia;
};

export default function ExternalMediaPreview({ media }: Props) {
  const addExternalMedia = async () => {
    // const callAPI = new Promise<string>((res, rej) => {
    await addMedia(media)
      .then(m => {
        // res(`Successfully added ${m!.title}`);
      })
      .catch(err => console.log(err));
    // });
    // apiToast(callAPI);
  };

  return (
    <div className="border-borders-600 rounded-md border bg-base-200 mb-6 flex break-inside-avoid-column justify-center gap-4 p-4">
      <div className='flex flex-col w-36'>

      <LazyLoadImage
        src={media.imgLink}
        className="my-auto h-32 w-20 rounded-md md:h-72 md:w-48"
        placeholder={
          <div className="h-32 w-20 animate-pulse bg-gray-400 md:h-72 md:w-48"></div>
        }
      />
        <div>{media?.creator?.[0] ?? null}</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className='flex items-center justify-between'>
        <h2 className="text-primary text-xl font-semibold">
          {getMediaFullTitle(media)}
        </h2>
          <div>{new Date(media.releaseDate).toLocaleDateString()}</div>
        </div>
        <div className="flex flex-col justify-around md:flex-row">
          <div className='flex justify-between'>
            <div>{media.duration}</div>
            <div className='truncate w-32'>{media?.categories?.join(', ') ?? null}</div>
            <div>{media.mediaType}</div>
          </div>
        </div>
        <div className="bg-interactive-300 h-40 resize-none overflow-y-auto rounded-md p-2 px-4 py-1 text-lg">
          {media.summary}
        </div>
        <button
          onClick={addExternalMedia}
          className="bg-solid-900 text-interactive-300 text-secondary mt-auto rounded-md px-4 py-1 outline-none"
        >
          Add Next
        </button>
      </div>
    </div>
  );
}

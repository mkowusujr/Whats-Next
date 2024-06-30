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
    <div className="mb-6 flex break-inside-avoid-column justify-center gap-4 rounded-md bg-base-300 p-4">
      <LazyLoadImage
        src={media.imgLink}
        className="my-auto h-32 w-20 rounded-md md:h-72 md:w-48"
        placeholder={
          <div className="h-32 w-20 animate-pulse bg-gray-400 md:h-72 md:w-48"></div>
        }
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-primary">
          {getMediaFullTitle(media)}
        </h2>
        <div className="flex flex-col justify-around md:flex-row">
          <div>{new Date(media.releaseDate).toLocaleDateString()}</div>
          <div>{media?.creator?.[0] ?? null}</div>
          <div>{media.mediaType}</div>
          <div>{media.duration}</div>
          <div>{media?.categories?.join(', ') ?? null}</div>
        </div>
        <div className="h-40 resize-none overflow-y-auto rounded-md bg-secondary p-2 px-4 py-1 text-lg">
          {media.summary}
        </div>
        <button
          onClick={addExternalMedia}
          className="mt-auto rounded-md bg-primary px-4 py-1 text-secondary outline-none"
        >
          Add Next
        </button>
      </div>
    </div>
  );
}

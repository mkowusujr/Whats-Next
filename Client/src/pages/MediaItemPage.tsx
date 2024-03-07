import { SetStateAction, Suspense, lazy, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Select from '@/components/common/Select';
import { getMediaInfo, updateMedia } from '@/lib/data/media';
import { listNotesForMedia } from '@/lib/data/notes';
import { listProgressForMedia } from '@/lib/data/progress';
import { scores, statuses, storageTypes } from '@/lib/form-fields';
import ProjectTracker from '@/components/Progress/ProgressTracker';
import MediaNotes from '@/components/notes/MediaNotes';

export default function MediaItemPage() {
  const [queryParams] = useSearchParams();
  const mediaID = queryParams.get('mediaID');

  const [media, setMedia] = useState<Media | undefined>(undefined);
  const [progressList, setProgressList] = useState([]);
  const [noteList, setNoteList] = useState([]);

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');
  const [storage, setStorage] = useState('');

  useEffect(() => {
    getMediaInfo(mediaID)
      .then(m => {
        setTitle(m.title);
        setSubTitle(m.subTitle ?? '');
        setScore(m.score);
        setStatus(m.status);
        setStorage(m.storage);
        document.title =
          (m.title + ' ' + (m.subTitle ?? '')).trim() + ' | ' + m.status;

        setMedia(m);
      })
      .catch(err => console.error(err));

    listProgressForMedia(mediaID)
      .then(ps => setProgressList(ps))
      .catch(err => console.error(err));

    listNotesForMedia(mediaID)
      .then(ns => setNoteList(ns))
      .catch(err => console.error(err));
  }, []);

  const handleUpdate = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const updatedMedia = {
      ...media,
      title: title,
      subTitle: subTitle,
      score: +score,
      status: status,
      storage: storage
    };

    document.title = (title + ' ' + (subTitle ?? '')).trim() + ' | ' + status;

    updateMedia(updatedMedia).catch(err => console.error(err));
  };

  return media ? (
    <div className="flex flex-col px-10 py-4 sm:px-14 md:px-16">
      <h1 className="mx-auto text-center text-2xl font-bold">
        {title.toUpperCase()}
      </h1>
      <p className="mx-auto mb-4 text-center">
        Released on {new Date(media.releaseDate).toDateString()} By{' '}
        {media.creator}
      </p>
      <div className="flex flex-col items-center sm:flex-row sm:justify-around">
        <LazyLoadImage
          src={media.img}
          width={200}
          className="mb-4 rounded-sm"
        />
        <form
          className="flex flex-col items-center justify-around gap-4"
          onSubmit={handleUpdate}
        >
          <div className="flex gap-4">
            <input
              type="text"
              name="title"
              value={title}
              size={title.length}
              onChange={e => setTitle(e.target.value)}
              placeholder="Add Title"
              autoComplete="off"
              required
            />
            <input
              type="text"
              name="subTitle"
              value={subTitle}
              size={subTitle?.length ?? 3}
              onChange={e => setSubTitle(e.target.value)}
              placeholder="Add Subtitle"
              autoComplete="off"
            />
          </div>

          <Select
            label={'Score: '}
            name={'score'}
            value={score}
            options={scores}
            onChange={(e: { target: { value: SetStateAction<number> } }) =>
              setScore(e.target.value)
            }
          />
          <Select
            label={'Status: '}
            name={'status'}
            value={status}
            options={statuses}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setStatus(e.target.value)
            }
          />
          <Select
            label={'Storage: '}
            name={'storage'}
            value={storage}
            options={storageTypes}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setStorage(e.target.value)
            }
          />

          <input className="update-button" type="submit" value="Update Media" />
        </form>
      </div>
      <p className="my-4 indent-4">{media.summary}</p>
      <hr />
      <Suspense>
        <ProjectTracker
          media={media}
          progressTrackingUtils={[progressList, setProgressList]}
        />
      </Suspense>
      <hr />
      <Suspense>
        <MediaNotes mediaID={media.id} noteUtils={[noteList, setNoteList]} />
      </Suspense>
    </div>
  ) : (
    <></>
  );
}

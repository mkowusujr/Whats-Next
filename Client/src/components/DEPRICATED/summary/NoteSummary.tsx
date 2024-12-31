import { getMediaFullTitle } from '@/lib/utils/media-utils';

export default function NoteSummary({ note }: { note: NoteSummary }) {
  return (
    <div className="text-netural lg:w-[700px]flex bg-base-300 flex flex-col justify-between gap-1 text-2xl">
      <input
        type="text"
        value={note.title}
        name="title"
        className="bg-secondary text-primary w-full rounded-t-md px-4 py-1 placeholder-base-100 outline-none"
        autoComplete="off"
        disabled
      />
      <div className="text-secondary flex justify-between gap-4 text-base italic">
        <span>{`Created on: ${getMediaFullTitle(note.mediaTitle, note.mediaSubtitle)}`}</span>
        <span>Created : {new Date(note.dateCreated).toDateString()}</span>
        <span>Updated : {new Date(note.dateLastUpdated).toDateString()}</span>
      </div>
      <textarea
        value={note.content}
        name="content"
        className="bg-secondary h-[300px] resize-none rounded-b-md px-4 py-1 text-base-100 placeholder-base-100 outline-none"
        disabled
      ></textarea>
    </div>
  );
}

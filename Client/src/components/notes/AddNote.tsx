import { useState } from 'react';

import { apiToast } from '@/lib/data/api-base';
import { addNote } from '@/lib/data/notes';

type AddNoteProps = {
  /** The ID of the associated media item. */
  mediaID: number;
  /** The function to add a new note to the list. */
  addToList: (note: Note) => void;
};

/** Component for adding notes to a media item. */
export default function AddNote({ mediaID, addToList }: AddNoteProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  /**
   * Handles the form submission to add a new note.
   *
   * @param e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const callAPI = new Promise<string>((res, rej) => {
      const note = {
        title: title,
        content: content,
        mediaID: mediaID
      };

      addNote(note)
        .then(n => {
          addToList(n!);
          setTitle('');
          setContent('');
          res('Successfully added note');
        })
        .catch(err => rej(err));
    });

    apiToast(callAPI);
  };

  return (
    <form
      className="flex flex-col gap-4 rounded-sm text-2xl "
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={title}
        name="title"
        onChange={e => setTitle(e.target.value)}
        placeholder="Add Title"
        autoComplete="off"
        className="w-full rounded-t-md bg-secondary px-4 py-1 text-primary placeholder-base-100 outline-none"
        required
      />
      <textarea
        value={content}
        name="content"
        onChange={e => setContent(e.target.value)}
        placeholder="Add Content"
        className="h-[200px] rounded-b-md bg-secondary px-4 py-1 text-base-100 placeholder-base-100 outline-none"
        required
      ></textarea>
      <input
        className="cursor-pointer rounded-md bg-primary px-4 py-1 text-secondary outline-none"
        type="submit"
        value="Add Note"
      />
    </form>
  );
}

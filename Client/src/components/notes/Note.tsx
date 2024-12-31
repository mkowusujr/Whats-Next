// import { deleteNote, updateNote } from '@/lib/data/notes';
import { useState } from 'react';

type NoteProps = {
  /** The note object with id, title, and content. */
  note: Note;
  /** The function to remove the note from the list. */
  // removeFromList?: RemoveFromList;
};

/** Component representing a single note with the ability to update and delete. */
export default function Note({ note }: NoteProps) {
  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  /**
   * Handles the form submission to update the note contents.
   *
   * @param e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedNote: UpdatedNote = {
      id: note.id,
      title: title,
      content: content
    };

    // updateNote(updatedNote).catch(err => console.error(err));
  };

  // const handleDelete = () => {
  //   if (!removeFromList) return;
  //   deleteNote(note.id)
  //     .then(() => {
  //       removeFromList(note.id);
  //     })
  //     .catch(err => console.error(err));
  // };

  return (
    <li className="note">
      <form
        className="text-netural bg-base-300 my-10 flex flex-col justify-between gap-4 lg:w-[700px]"
        onSubmit={handleSubmit}
      >
        <hr className="border-primary mb-6 border-2" />
        <div className="text-accent text-base italic">
          <p>Created : {new Date(note.dateCreated).toDateString()}</p>
          <p>Updated : {new Date(note.dateLastUpdated).toDateString()}</p>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={title}
            name="title"
            onChange={e => setTitle(e.target.value)}
            className="bg-secondary text-primary w-full rounded-t-md px-4 py-1 placeholder-base-100 outline-none"
            autoComplete="off"
            required
          />
          <textarea
            value={content}
            name="content"
            onChange={e => setContent(e.target.value)}
            className="bg-secondary h-[200px] resize-none rounded-b-md px-4 py-1 text-base-100 placeholder-base-100 outline-none"
            required
          ></textarea>
        </div>
        <input
          className="bg-primary text-secondary cursor-pointer rounded-md px-4 py-1 outline-none"
          type="submit"
          value="Update Note"
        />
        {/* {removeFromList && (
          <button
            className="cursor-pointer rounded-md bg-base-100 px-4 py-1 text-primary outline-none"
            onClick={handleDelete}
          >
            Delete Note
          </button>
        )} */}
      </form>
    </li>
  );
}

import { useState } from 'react';

import { PropTypes } from 'prop-types';

import { apiToast } from '@/lib/data/api-base';
import { Dialog, DialogContent, DialogTrigger } from '../common/Dialog';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

/**
 * Component for adding notes to a media item.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.mediaID - The ID of the associated media item.
 * @param {function} props.addToList - The function to add a new note to the list.
 * @returns {JSX.Element} - The rendered AddNote component.
 */
export default function AddNote({ mediaID, addToList }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  /**
   * Handles the form submission to add a new note.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = e => {
    e.preventDefault();

    const callAPI = new Promise((res, rej) => {
      const note = {
        title: title,
        content: content,
        mediaID: mediaID
      };

      import('@/lib/data/notes').then(addNote =>
        addNote(note)
          .then(n => {
            addToList(n);
            setTitle('');
            setContent('');
            res('Successfully added note');
          })
          .catch(err => rej(err))
      );
    });

    apiToast(callAPI);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="align-center fixed bottom-20 left-4 z-30 flex rounded-md bg-slate-800/80 px-4 py-2 text-2xl font-bold text-white shadow-lg  backdrop-blur-md">
          <PlusCircleIcon className="mr-2 size-8" />
          <span>Add Note</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <form
          className="flex w-[300px] flex-col justify-between gap-4 rounded-sm bg-white/80 p-6 text-2xl backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={title}
            name="title"
            onChange={e => setTitle(e.target.value)}
            placeholder="Add Title"
            autoComplete="off"
            required
          />
          <textarea
            value={content}
            name="content"
            onChange={e => setContent(e.target.value)}
            placeholder="Add Content"
            required
          ></textarea>
          <input type="submit" value="Add Note" />
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddNote.propTypes = {
  mediaID: PropTypes.number.isRequired,
  addToList: PropTypes.func.isRequired
};

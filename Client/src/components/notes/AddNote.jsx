import { useState } from 'react';

import { PropTypes } from 'prop-types';

import { apiToast } from '../../lib/api-base.service';
import '../../sass/notes.scss';

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

      import('../../lib/notes.service').then(addNote =>
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
    <div className="note-form">
      <h3>Add Note</h3>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

AddNote.propTypes = {
  mediaID: PropTypes.number.isRequired,
  addToList: PropTypes.func.isRequired
};

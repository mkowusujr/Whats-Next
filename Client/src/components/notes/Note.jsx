import { useState } from 'react';

import { PropTypes } from 'prop-types';

import { deleteNote, updateNote } from '../../services/notes.service';
import '../../sass/notes.scss';

/**
 * Component representing a single note with the ability to update and delete.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.note - The note object with id, title, and content.
 * @param {function} props.removeFromList - The function to remove the note from the list.
 * @returns {JSX.Element} - The rendered Note component.
 */
export default function Note({ note, removeFromList }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  /**
   * Handles the form submission to update the note contents.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = e => {
    e.preventDefault();

    const updatedNote = {
      id: note.id,
      title: title,
      content: content
    };

    updateNote(updatedNote).catch(err => console.error(err));
  };

  const handleDelete = () => {
    deleteNote(note.id)
      .then(() => {
        removeFromList(note.id);
      })
      .catch(err => console.error(err));
  };

  return (
    <li className="note">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          name="title"
          onChange={e => setTitle(e.target.value)}
          autoComplete="off"
          required
        />
        <div className="dates">
          <p>Created : {new Date(note.dateCreated).toDateString()}</p>
          <p>Updated : {new Date(note.dateLastUpdated).toDateString()}</p>
        </div>
        <textarea
          value={content}
          name="content"
          onChange={e => setContent(e.target.value)}
          required
        ></textarea>
        <input type="submit" value="Update Note" />
        <button onClick={handleDelete}>Delete Note</button>
      </form>
    </li>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  removeFromList: PropTypes.func
};

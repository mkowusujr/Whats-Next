import { PropTypes } from 'prop-types';

import AddNote from './AddNote';
import NoteList from './NoteList';

/**
 * Component for managing notes related to a media item.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.mediaID - The ID of the associated media item.
 * @param {[Array, function]} props.noteUtils - State and setter function for managing notes.
 * @returns {JSX.Element} - The rendered MediaNotes component.
 */
export default function MediaNotes({ mediaID, noteUtils }) {
  const [notes, setNotes] = noteUtils;

  const addToList = item => {
    setNotes([item, ...notes]);
  };

  return (
    <div className="media-item-notes">
      <h2>Notes</h2>
      <AddNote mediaID={mediaID} addToList={addToList} />
      <NoteList mediaID={mediaID} noteUtils={noteUtils} />
    </div>
  );
}

MediaNotes.propTypes = {
  mediaID: PropTypes.number.isRequired,
  noteUtils: PropTypes.array.isRequired
};

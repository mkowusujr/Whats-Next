import { PropTypes } from 'prop-types';

import Note from './Note';

/**
 * Component for displaying a list of notes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {[Array, function]} props.noteUtils - State and setter function for managing notes.
 * @returns {JSX.Element} - The rendered NoteList component.
 */
export default function NoteList({ noteUtils }) {
  const [noteList, setNoteList] = noteUtils;

  /**
   * Removes a note from the list based on its ID.
   *
   * @param {number} id - The ID of the note to be removed.
   */
  const removeFromList = id => {
    setNoteList(noteList.filter(n => n.id != id));
  };

  const noteItems = noteList.map(n => (
    <Note key={n.id} note={n} removeFromList={removeFromList} />
  ));
  return <ul>{noteItems}</ul>;
}

NoteList.propTypes = {
  noteUtils: PropTypes.array.isRequired
};

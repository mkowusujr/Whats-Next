import AddNote from './AddNote';
import NoteList from './NoteList';

export default function MediaNotes(props) {
  const addToList = item => {
    props.notes.set([item, ...props.notes.get]);
  };

  return (
    <div>
      <h2>Notes</h2>
      <AddNote mediaID={props.mediaID} addToList={addToList} />
      <NoteList mediaID={props.mediaID} notes={props.notes} />
    </div>
  );
}

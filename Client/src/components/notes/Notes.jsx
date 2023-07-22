import AddNoteForm from './AddNoteForm';
import NotesList from './NotesList';

export default function Notes(props) {
  const mediaID = props.mediaID;
  const bookID = props.bookID;

  return (
    <>
      <NotesList mediaID={mediaID} bookID={bookID} />
      <AddNoteForm mediaID={mediaID} bookID={bookID} />
    </>
  );
}

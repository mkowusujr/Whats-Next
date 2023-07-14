import { useEffect, useState } from 'react';
import {
  listNotesForBook,
  listNotesForMedia
} from '../../services/notes.service';
import AddNoteForm from './AddNoteForm';
import NotesList from './NotesList';
import '../../sass/notes/Notes.scss';

export default function Notes(props) {
  const mediaID = props.mediaID;
  const bookID = props.bookID;
  const [notesList, setNotesList] = useState([]);

  const updateNoteList = () => {
    if (mediaID) {
      listNotesForMedia(mediaID).then(notesList => setNotesList(notesList));
    } else {
      listNotesForBook(bookID).then(notesList => setNotesList(notesList));
    }
  };

  useEffect(() => updateNoteList(), [mediaID, bookID]);

  return (
    <>
      <NotesList notesList={notesList} />
      <AddNoteForm
        mediaID={mediaID}
        bookID={bookID}
        updateNoteList={updateNoteList}
      />
    </>
  );
}

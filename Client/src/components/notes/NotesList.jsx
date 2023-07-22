import Note from './Note';
import DialogComponent from '../utils/DialogComponent';
import {
  listNotesForBook,
  listNotesForMedia
} from '../../services/notes.service';

import { useState } from 'react';

export default function NotesList(props) {
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

  return (
    <>
      <DialogComponent
        buttonText="View Notes"
        onOpen={updateNoteList}
        cmpnt={
          <div className="notes-list">
            {notesList.map(note => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        }
      />
    </>
  );
}

import { useEffect, useState } from "react";
import { listNotesForMedia } from "../../services/notes.service";
import Note from "./Note";
import "../../sass/notes/NotesList.scss";
import DialogComponent from "../utils/DialogComponent";

export default function NotesList(props) {
  const mediaID = props.mediaID;
  const [notesLists, setNotesList] = useState([]);
  useEffect(() => {
    listNotesForMedia(mediaID).then((notesList) => setNotesList(notesList));
  }, [mediaID]);

  return (
    <>
      <DialogComponent
        buttonText="View Notes"
        cmpnt={
          <div className="notes-list">
            {notesLists.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        }
      />
    </>
  );
}

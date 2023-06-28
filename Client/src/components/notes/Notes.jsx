import { useEffect, useState } from "react";
import { listNotesForMedia } from "../../services/notes.service";
import AddNoteForm from "./AddNoteForm";
import NotesList from "./NotesList";
import "../../sass/notes/Notes.scss";

export default function Notes(props) {
  const mediaID = props.mediaID;
  const [notesList, setNotesList] = useState([]);

  const updateNoteList = () => {
    listNotesForMedia(mediaID).then((notesList) => setNotesList(notesList));
  };

  useEffect(() => updateNoteList(), [mediaID]);

  return (
    <>
      <NotesList notesList={notesList} />
      <AddNoteForm mediaID={mediaID} updateNoteList={updateNoteList} />
    </>
  );
}

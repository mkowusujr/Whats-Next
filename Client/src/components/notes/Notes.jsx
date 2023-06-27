import AddNoteForm from "./AddNoteForm";
import NotesList from "./NotesList";
import "../../sass/notes/Notes.scss"

export default function Notes(props) {
	return <>
		{/* <button>View Notes</button> */}
		{/* <button>Add Note</button> */}
		<NotesList mediaID={props.mediaID} />
		<AddNoteForm mediaID={ props.mediaID} />
	</>
}
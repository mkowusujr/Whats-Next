import Note from './Note';
import '../../sass/notes/NotesList.scss';
import DialogComponent from '../utils/DialogComponent';

export default function NotesList(props) {
  return (
    <>
      <DialogComponent
        buttonText="View Notes"
        cmpnt={
          <div className="notes-list">
            {props.notesList.map(note => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        }
      />
    </>
  );
}

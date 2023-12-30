import Note from './Note';

export default function NoteList(props) {
  const noteList = props.notes.get;
  const setNoteList = props.notes.set;

  const removeFromList = id => {
    setNoteList(noteList.filter(n => n.id != id));
  };

  const noteItems = noteList.map(n => (
    <Note key={n.id} note={n} removeFromList={removeFromList} />
  ));
  return <ul>{noteItems}</ul>;
}

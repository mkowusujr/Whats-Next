import Note from './Note';

type NotesListProps = {
  notes: Note[];
  removeFromList: RemoveFromList;
};

/**
 * Component for displaying a list of notes.
 *
 * @returns The rendered NoteList component.
 */
export default function NoteList({ notes, removeFromList }: NotesListProps) {
  const NoteItems = () =>
    notes.map(n => (
      <Note key={n.id} note={n} removeFromList={removeFromList} />
    ));
  return (
    <>
      <ul className="note-list">
        <NoteItems />
      </ul>
    </>
  );
}

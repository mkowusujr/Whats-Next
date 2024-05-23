import { listNotesForMedia } from '@/lib/data/notes';
import AddNote from './AddNote';
import NoteList from './NoteList';
import { useListUtils } from '@/lib/hooks/useListUtils';

type MediaNotesProps = {
  /** The ID of the associated media item. */
  mediaID: number;
};

/**
 * Component for managing notes related to a media item.
 *
 * @returns The rendered MediaNotes component.
 */
export default function MediaNotes({ mediaID }: MediaNotesProps) {
  const {
    list: notes,
    addToList,
    removeFromList
  } = useListUtils(() => listNotesForMedia(mediaID));

  return (
    <div>
      <AddNote mediaID={mediaID} addToList={addToList} />
      <NoteList notes={notes} removeFromList={removeFromList} />
    </div>
  );
}

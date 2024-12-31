// import { listNotesForMedia } from '@/lib/data/notes';
import AddNote from './AddNote';
import NoteList from '../DEPRICATED/common/notes/NoteList';
import { listNotesForMedia } from '@/lib/DEPRICATED/data/notes';
import { useQuery } from '@tanstack/react-query';
import Note from './Note';
// import { useListUtils } from '@/lib/hooks/useListUtils';

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
  const { data: mediaNotesList, isPending } = useQuery({
    queryKey: [`notes-list-${mediaID}`],
    queryFn: () => listNotesForMedia(mediaID)
  });

  if (isPending || !mediaNotesList) {
    return <div>Loading...</div>;
  }

  const MediaNoteItems = () =>
    mediaNotesList.map(n => <Note key={n.id} note={n} />);
  // const {
  //   list: notes,
  //   addToList,
  //   removeFromList
  // } = useListUtils(() => listNotesForMedia(mediaID));

  return (
    <div>
      <MediaNoteItems />
      {/* <AddNote mediaID={mediaID} /> */}
      {/* <NoteList notes={notes} removeFromList={removeFromList} /> */}
    </div>
  );
}

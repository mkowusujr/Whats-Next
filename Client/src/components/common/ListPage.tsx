import AddMedia from '@/components/media/AddMedia';
import Filter from '@/components/media/Filter';
import { listMedia } from '@/lib/data/media';
import { useListUtils } from '@/lib/hooks/useListUtils';
import { useFilters } from '@/lib/hooks/useFilters';
import MediaCell from '@/components/media/MediaCell';
import MediaListSkeleton from '@/components/skeletons/MediaListSkeleton';

type ListPageProps = {
  /** The name of the page.*/
  pageName: string;
  /** An array of media types. */
  mediaTypes: string[];
};

/**  Functional component representing a page that displays a list of media items. */
export default function ListPage({ mediaTypes, pageName }: ListPageProps) {
  const {
    list: mediaList,
    addToList,
    removeFromList,
    updateList
  } = useListUtils(() => listMedia(mediaTypes));

  const [filters, setFilters, filteredList] = useFilters(mediaTypes, mediaList);

  const MediaItems = () => {
    return filteredList.map(m => (
      <MediaCell
        key={m.id}
        media={m}
        removeFromList={removeFromList}
        updateList={updateList}
      />
    ));
  };

  return (
    <div className="p-12">
      <AddMedia pageName={pageName} addToList={addToList} />
      <Filter filterProps={[filters, setFilters]} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <>{mediaList.length != 0 ? <MediaItems /> : <MediaListSkeleton />}</>
      </div>
    </div>
  );
}

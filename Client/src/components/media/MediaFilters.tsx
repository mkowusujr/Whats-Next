import ScoreFilterSelector from '../filters/ScoreFilterSelector';
import SearchFilter from '../filters/SearchFilter';
import SortByFilterSelector from '../filters/SortByFilterSelector';
import StatusFilterSelector from '../filters/StatusFilterSelector';
import AddMedia from './creation/AddMedia';

export default function MediaFilters() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex gap-4">
        <SearchFilter />
        <AddMedia />
      </div>
      <div className="flex justify-around gap-4">
        <SortByFilterSelector />
        <ScoreFilterSelector />
        <StatusFilterSelector />
      </div>
    </div>
  );
}

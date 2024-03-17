import MediaListSkeleton from './MediaListSkeleton';
import NavBarSkeleton from './NavBarSkeleton';

export default function ListPageSkeleton() {
  return (
    <div>
      <NavBarSkeleton />
      <div className="p-8">
        <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          <MediaListSkeleton />
        </div>
        <div className="align-center fixed bottom-20 left-4 z-30 flex h-[48px] w-[140.6px] rounded-md bg-accent px-4 py-2 text-2xl font-bold shadow-lg"></div>
        <div className="align-center fixed bottom-4 left-4 z-30 flex h-[48px] w-[218px] rounded-md bg-accent px-4 py-2 text-2xl font-bold shadow-lg"></div>
      </div>
    </div>
  );
}

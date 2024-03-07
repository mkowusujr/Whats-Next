export default function MediaCellSkeleton() {
  return (
    <div className="flex h-fit rounded-sm bg-slate-500 p-4 text-sm">
      <div className="mr-4 h-[120px] w-20 animate-pulse rounded-sm bg-gray-400"></div>
      <div className="flex flex-grow flex-col gap-2 ">
        <div className=" inline-flex w-full">
          <div className="mr-2 h-5 w-full animate-pulse bg-gray-400 font-semibold"></div>
          <div className="ml-auto size-5 animate-pulse rounded-full bg-gray-400"></div>
        </div>
        <div className="mr-2 h-[26.4px] w-full animate-pulse rounded-sm bg-gray-400 font-semibold"></div>
        <div className="mr-2 h-[26.4px] w-full animate-pulse rounded-sm bg-gray-400 font-semibold"></div>
      </div>
    </div>
  );
}

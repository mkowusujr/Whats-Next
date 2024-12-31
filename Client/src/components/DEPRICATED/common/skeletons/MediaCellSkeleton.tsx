export default function MediaCellSkeleton() {
  return (
    <div className="border-accent bg-base-300 flex h-fit rounded-md border-2 p-4 text-sm">
      <div className="bg-secondary mr-4 h-[120px] w-20 animate-pulse rounded-sm"></div>
      <div className="flex flex-grow flex-col gap-2 ">
        <div className=" inline-flex w-full">
          <div className="bg-secondary mr-2 h-5 w-full animate-pulse font-semibold"></div>
          <div className="bg-secondary ml-auto size-5 animate-pulse rounded-full"></div>
        </div>
        <div className="bg-secondary mr-2 h-[26.4px] w-full animate-pulse rounded-sm font-semibold"></div>
        <div className="bg-secondary mr-2 h-[26.4px] w-full animate-pulse rounded-sm font-semibold"></div>
        <div className="mt-auto flex h-5 items-center justify-end gap-2"></div>
      </div>
    </div>
  );
}

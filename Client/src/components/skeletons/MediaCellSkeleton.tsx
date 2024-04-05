export default function MediaCellSkeleton() {
  return (
    <div className="flex h-fit rounded-md border-2 border-accent bg-base-300 p-4 text-sm">
      <div className="mr-4 h-[120px] w-20 animate-pulse rounded-sm bg-secondary"></div>
      <div className="flex flex-grow flex-col gap-2 ">
        <div className=" inline-flex w-full">
          <div className="mr-2 h-5 w-full animate-pulse bg-secondary font-semibold"></div>
          <div className="ml-auto size-5 animate-pulse rounded-full bg-secondary"></div>
        </div>
        <div className="mr-2 h-[26.4px] w-full animate-pulse rounded-sm bg-secondary font-semibold"></div>
        <div className="mr-2 h-[26.4px] w-full animate-pulse rounded-sm bg-secondary font-semibold"></div>
        <div className="mt-auto flex h-5 items-center justify-end gap-2"></div>
      </div>
    </div>
  );
}

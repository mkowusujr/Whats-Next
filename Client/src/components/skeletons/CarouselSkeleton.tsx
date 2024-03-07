export default function CarouselSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="m-auto h-9 w-[250px] animate-pulse bg-gray-400"></div>
      <div className="my-4 h-40 animate-pulse rounded-md bg-gray-400"></div>
    </div>
  );
}

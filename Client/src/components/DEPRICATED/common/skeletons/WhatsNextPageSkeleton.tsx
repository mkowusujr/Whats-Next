import CarouselSkeleton from './CarouselSkeleton';
import NavBarSkeleton from './NavBarSkeleton';

export default function WhatsNextPageSkeleton() {
  return (
    <div>
      <NavBarSkeleton />
      <div className="flex flex-col px-10 py-4 sm:px-14 md:px-16 lg:grid lg:grid-cols-2 lg:gap-4">
        <CarouselSkeleton />
        <CarouselSkeleton />
        <CarouselSkeleton />
        <CarouselSkeleton />
      </div>
    </div>
  );
}

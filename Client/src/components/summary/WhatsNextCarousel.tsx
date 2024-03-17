import Carousel from 'nuka-carousel';

type WhatsNextCarouselProps = {
  /** The title of the carousel. */
  title: string;
  /** An array of items to be displayed in the carousel. */
  items: any[];
  /** The component used as a slide in the carousel.*/
  SlideComponent: any;
};

/** Component to display a carousel with custom slides. */
export default function WhatsNextCarousel({
  title,
  items,
  SlideComponent
}: WhatsNextCarouselProps) {
  return (
    <div className="rounded-md border-2 border-accent bg-base-300 p-2">
      <h2 className="text-center text-3xl font-semibold text-primary">
        {title}
      </h2>
      <Carousel
        autoplay
        autoplayInterval={5000}
        wrapAround
        pauseOnHover
        withoutControls
        cellSpacing={10}
      >
        {items.map(i => (
          <SlideComponent key={i.id} data={i} />
        ))}
      </Carousel>
    </div>
  );
}

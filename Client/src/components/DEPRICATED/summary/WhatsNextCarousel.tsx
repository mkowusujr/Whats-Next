import { useState, useEffect, useId } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../DEPRICATED/common/Carousel';
import Autoplay from 'embla-carousel-autoplay';

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000
        })
      ]}
    >
      // ...
    </Carousel>
  );
}

type WhatsNextCarouselProps = {
  /** An array of items to be displayed in the carousel. */
  items: any[];
  /** The component used as a slide in the carousel.*/
  SlideComponent: any;
};

/** Component to display a carousel with custom slides. */
export default function WhatsNextCarousel({
  items,
  SlideComponent
}: WhatsNextCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      key={useId()}
      className="px-4"
      setApi={setApi}
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnMouseEnter: true,
          stopOnInteraction: false
        })
      ]}
    >
      <CarouselContent>
        {items.map(i => {
          const key = useId();
          return (
            <CarouselItem key={key}>
              <SlideComponent data={i} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="baseline flex justify-between text-primary">
        <CarouselPrevious />
        <div className="m-auto flex justify-center">
          Slide {current} of {count}
        </div>
        <CarouselNext />
      </div>
    </Carousel>
  );
}

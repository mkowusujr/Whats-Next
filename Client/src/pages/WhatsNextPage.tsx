import { useEffect, useState } from 'react';

import CarouselMediaItem from '@/components/summary/CarouselMediaItem';
import CarouselNoteItem from '@/components/summary/CarouselNoteItem';
import WhatsNextCarousel from '@/components/summary/WhatsNextCarousel';
import { getSummary } from '@/lib/data/summary';

/** The landing page */
export default function WhatsNextPage() {
  const [summary, setSummary] = useState({
    completed: [],
    inprogress: [],
    planned: [],
    notes: []
  });

  useEffect(() => {
    document.title = "What's Next?";
    getSummary()
      .then(s => setSummary(s))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="flex flex-col px-10 py-4 sm:px-14 md:px-16 lg:grid lg:grid-cols-2 lg:gap-4">
      <WhatsNextCarousel
        title="In Progress"
        items={summary.inprogress}
        SlideComponent={CarouselMediaItem}
      />
      <WhatsNextCarousel
        title={`What's Next?`}
        items={summary.planned}
        SlideComponent={CarouselMediaItem}
      />
      <WhatsNextCarousel
        title="Recently Completed"
        items={summary.completed}
        SlideComponent={CarouselMediaItem}
      />
      <WhatsNextCarousel
        title="Recent Notes"
        items={summary.notes}
        SlideComponent={CarouselNoteItem}
      />
    </div>
  );
}

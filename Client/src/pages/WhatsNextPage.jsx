import { useEffect, useState } from 'react';

import CarouselMediaItem from '../components/summary/CarouselMediaItem';
import CarouselNoteItem from '../components/summary/CarouselNoteItem';
import WhatsNextCarousel from '../components/summary/WhatsNextCarousel';
import { getSummary } from '../services/summary.service';
import '../sass/pages.scss';

export default function WhatsNextPage() {
  const [summary, setSummary] = useState({
    completed: [],
    inprogress: [],
    planned: [],
    notes: []
  });

  useEffect(() => {
    getSummary()
      .then(s => setSummary(s))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="summary-page">
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

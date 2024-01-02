import { useEffect, useState } from 'react';

import Carousel from 'nuka-carousel';
import { PropTypes } from 'prop-types';

import CarouselMediaItem from '../components/utils/CarouselMediaItem';
import { getSummary } from '../services/summary.service';
import '../sass/pages.scss';
import '../sass/media.scss';
import Note from '../components/notes/Note';
import CarouselNoteItem from '../components/utils/CarouselNoteItem';

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
      <div className="summary-inprogress">
        <h2>In Progress</h2>
        <Carousel autoplay autoplayInterval={5000} wrapAround pauseOnHover>
          {summary.inprogress.map(i => (
            <CarouselMediaItem key={i.id} media={i} showScore={true} />
          ))}
        </Carousel>
      </div>
      <div className="summary-planned">
        <h2>{`What's Next?`}</h2>
        <Carousel autoplay autoplayInterval={5000} wrapAround pauseOnHover>
          {summary.planned.map(i => (
            <CarouselMediaItem key={i.id} media={i} />
          ))}
        </Carousel>
      </div>
      <div className="summary-completed">
        <h2>Recently Completed</h2>
        <Carousel autoplay autoplayInterval={5000} wrapAround pauseOnHover>
          {summary.completed.map(i => (
            <CarouselMediaItem key={i.id} media={i} showScore={true} />
          ))}
        </Carousel>
      </div>
      <div className="summary-notes">
        <h2>Recent Notes</h2>
        <Carousel autoplay autoplayInterval={5000} wrapAround>
          {summary.notes.map(i => (
            <CarouselNoteItem key={i.id} note={i} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

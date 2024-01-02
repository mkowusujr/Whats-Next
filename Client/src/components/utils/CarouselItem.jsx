import '../../sass/summary.scss';
import DialogComponent from './DialogComponent';
import MediaMoreInfo from '../media/MediaMoreInfo';
import { updateMedia } from '../../services/media.service';
import { getMediaInfo } from '../../services/media.service';
import { listProgressForMedia } from '../../services/progress.service';
import { listNotesForMedia } from '../../services/notes.service';
import { useState } from 'react';

export default function CarouselItem(props) {
  const [media, setMedia] = useState(props.item);
  const [mediaInfo, setMediaInfo] = useState({});
  const [progressList, setProgressList] = useState([]);
  const [noteList, setNoteList] = useState([]);

  const setupMediaInfo = () => {
    getMediaInfo(media.id)
      .then(m => setMediaInfo(m))
      .catch(err => console.error(err));

    listProgressForMedia(media.id)
      .then(ps => setProgressList(ps))
      .catch(err => console.error(err));

    listNotesForMedia(media.id)
      .then(ns => setNoteList(ns))
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setMedia({ ...media, [name]: value });
    updateMedia({ ...media, [name]: value })
      .then()
      .catch(err => console.error(err));
  };

  return (
    <div className="carousel-item">
      <div>
        <h4>
          {props.item.title +
            (props.item.subTitle ? ' ' + props.item.subTitle : '') +
            ' | ' +
            props.item.mediaType}
        </h4>
      </div>
      <>{props.showScore ? <p>Score: {props.item.score}</p> : <></>}</>
      <p>Storage: {props.item.storage}</p>
      <p>Status: {props.item.status}</p>
      <DialogComponent
        buttonText={'View More'}
        onOpen={setupMediaInfo}
        cmpnt={
          <MediaMoreInfo
            media={props.item}
            mediaInfo={mediaInfo}
            progressTracking={{ get: progressList, set: setProgressList }}
            notes={{ get: noteList, set: setNoteList }}
            handleChange={handleChange}
          />
        }
      />
    </div>
  );
}

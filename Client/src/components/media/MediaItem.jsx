import Select from '../utils/Select';
import { scores, statuses } from '../utils/FormFields';
import { useState } from 'react';
import { deleteMedia, updateMedia } from '../../services/media.service';
import DialogComponent from '../utils/DialogComponent';
import MediaMoreInfo from './MediaMoreInfo';
import { listProgressForMedia } from '../../services/progress.service';
import { getMediaInfo } from '../../services/media.service';
import { listNotesForMedia } from '../../services/notes.service';
import '../../sass/media.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from 'react-loading-skeleton';

export default function MediaItem(props) {
  const [media, setMedia] = useState(props.media);

  const handleChange = e => {
    const { name, value } = e.target;
    setMedia({ ...media, [name]: value });
    updateMedia({ ...media, [name]: value })
      .then(m => props.updateList(m))
      .catch(err => console.error(err));
  };

  const scoreSelector = (
    <Select
      name={'score'}
      value={media.score}
      options={scores}
      onChange={handleChange}
    />
  );

  const statusSelector = (
    <Select
      name={'status'}
      value={media.status}
      options={statuses}
      onChange={handleChange}
    />
  );

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

  const viewMoreBtn = (
    <DialogComponent
      buttonText={'View More'}
      onOpen={setupMediaInfo}
      cmpnt={
        <MediaMoreInfo
          media={media}
          mediaInfo={mediaInfo}
          progressTracking={{ get: progressList, set: setProgressList }}
          notes={{ get: noteList, set: setNoteList }}
          handleChange={handleChange}
        />
      }
    />
  );

  const handleDeletion = () => {
    deleteMedia(media.id)
      .then(() => props.removeFromList(media.id))
      .catch(err => console.error(err));
  };
  const deleteBtn = <button onClick={handleDeletion}>Remove</button>;

  return (
    <tr className="media-item">
      <td>
        <LazyLoadImage
          id={`cover-img${media.id}`}
          src={media.img}
          width={50}
          placeholder={
            <Skeleton variant="rectangular" height={100} width={50} />
          }
        />
      </td>
      <td>
        <input
          value={media.title}
          name="title"
          size={media.title.length}
          onChange={handleChange}
        />
        <input
          value={media.subTitle}
          name="subTitle"
          size={media.subTitle ? media.subTitle.length : 'SubTitle'.length}
          placeholder="SubTitle"
          onChange={handleChange}
        />
      </td>
      <td>{media.mediaType}</td>
      <td>{scoreSelector}</td>
      <td>{statusSelector}</td>
      <td>{viewMoreBtn}</td>
      <td>{deleteBtn}</td>
    </tr>
  );
}

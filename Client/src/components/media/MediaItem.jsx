import Select from '../utils/Select';
import { scores, statuses } from '../utils/FormFields';
import { useState } from 'react';
import { updateMedia } from '../../services/media.service';
import DialogComponent from '../utils/DialogComponent';
import MediaMoreInfo from './MediaMoreInfo';
import { getProgressForMedia } from '../../services/progress.service';

export default function MediaItem(props) {
  const [media, setMedia] = useState(props.media);

  const handleChange = e => {
    const { name, value } = e.target;
    setMedia({ ...media, [name]: value });
    updateMedia(media).catch(err => console.error(err));
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

  const [progressList, setProgressList] = useState([]);
  const getMediaProgress = () => {
    getProgressForMedia(media.id)
      .then(ps => setProgressList(ps))
      .catch(err => console.error(err));
  };

  const viewMoreBtn = (
    <DialogComponent
      buttonText={'View More'}
      onOpen={getMediaProgress}
      cmpnt={
        <MediaMoreInfo
          media={media}
          progressTracking={{ get: progressList, set: setProgressList }}
        />
      }
    />
  );

  return (
    <tr className="media-item">
      <td>{media.title + (media.subTitle ? ' ' + media.subTitle : '')}</td>

      <td>{media.mediaType}</td>
      <td>{scoreSelector}</td>
      <td>{statusSelector}</td>
      <td>{viewMoreBtn}</td>
    </tr>
  );
}

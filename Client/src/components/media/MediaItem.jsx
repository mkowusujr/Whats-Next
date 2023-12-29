import Select from '../utils/Select';
import { scores, statuses } from '../utils/FormFields';
import { useEffect, useState } from 'react';
import { updateMedia } from '../../services/media.service';

export default function MediaItem(props) {
  const [media, setMedia] = useState(props.media);

  const handleChange = e => {
    const { name, value } = e.target;
    setMedia({ ...media, [name]: value });
  };

  useEffect(() => {
    updateMedia(media).catch(err => console.error(err));
  }, [media]);

  return (
    <tr className="media-item">
      <td>{media.title + (media.subTitle ? ' ' + media.subTitle : '')}</td>

      <td>{media.mediaType}</td>
      <td>
        <Select
          name={'score'}
          value={media.score}
          options={scores}
          onChange={handleChange}
        />
      </td>
      <td>
        <Select
          name={'status'}
          value={media.status}
          options={statuses}
          onChange={handleChange}
        />
      </td>
      <td>More</td>
    </tr>
  );
}

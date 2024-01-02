import { useState } from 'react';

import {
  bookTypes,
  videoMediaTypes,
  statuses,
  scores
} from '../utils/FormFields';
import Select from '../utils/Select';
import { apiToast } from '../../services/api-base.service';
import { addMedia } from '../../services/media.service';
import '../../sass/media.scss';

export default function AddMedia(props) {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');

  let allowedMediaOptions = [];
  const defaultMediaType = { label: 'MediaType', value: '' };

  switch (props.mediaType) {
    case 'Watch':
      allowedMediaOptions = [defaultMediaType, ...videoMediaTypes];
      break;
    case 'Read':
      allowedMediaOptions = [defaultMediaType, ...bookTypes];
      break;
  }

  const handleSubmit = e => {
    e.preventDefault();

    const callAPI = new Promise((res, rej) => {
      const newMedia = {
        title: title,
        subTitle: subTitle,
        mediaType: mediaType,
        score: score,
        status: status
      };

      addMedia(newMedia)
        .then(m => {
          props.addToList(m);
          setTitle('');
          setSubTitle('');
          setMediaType('');
          setScore(0);
          setStatus('');
          res(`Successfully added ${m.title}`);
        })
        .catch(err => rej(err));
    });

    apiToast(callAPI);
  };

  return (
    <div className="media-form">
      <h2 className="title">Add To Next</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add Title"
          required
        />
        <input
          type="text"
          name="subTitle"
          value={subTitle}
          onChange={e => setSubTitle(e.target.value)}
          placeholder="Add Subtitle"
        />
        <Select
          name={'mediaType'}
          value={mediaType}
          options={allowedMediaOptions}
          onChange={e => setMediaType(e.target.value)}
          isRequired={true}
        />
        <Select
          name={'score'}
          value={score}
          options={scores}
          onChange={e => setScore(e.target.value)}
        />
        <Select
          name={'status'}
          value={status}
          options={statuses}
          onChange={e => setStatus(e.target.value)}
        />
        <input type="submit" value="Add Next" />
      </form>
    </div>
  );
}

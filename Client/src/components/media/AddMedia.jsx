import Select from '../utils/Select';
import {
  bookTypes,
  videoMediaTypes,
  statuses,
  scores
} from '../utils/FormFields';
import { useState } from 'react';
import { addMedia } from '../../services/media.service';

export default function AddMedia(props) {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [score, setScore] = useState('');
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

  const addNewMedia = e => {
    e.preventDefault();

    const newMedia = {
      title: title,
      subTitle: subTitle,
      mediaType: mediaType,
      score: score,
      status: status
    };

    addMedia(newMedia)
      .then(m => props.addToList(m))
      .catch(err => console.log(err));
  };

  return (
    <>
      <h2>Add To Next</h2>
      <form onSubmit={addNewMedia}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          name="subTitle"
          value={subTitle}
          onChange={e => setSubTitle(e.target.value)}
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
    </>
  );
}

import ProjectTracker from '../Progress/ProgressTracker';
import Select from '../utils/Select';
import { scores, statuses, storageTypes } from '../utils/FormFields';
import MediaNotes from '../notes/MediaNotes';
import '../../sass/media.scss';

export default function MediaMoreInfo(props) {
  const media = props.media;
  const mediaInfo = props.mediaInfo;

  const mediaFields = (
    <div>
      <Select
        label={'Score: '}
        name={'score'}
        value={media.score}
        options={scores}
        onChange={props.handleChange}
      />
      <Select
        label={'Status: '}
        name={'status'}
        value={media.status}
        options={statuses}
        onChange={props.handleChange}
      />
      <Select
        label={'Storage: '}
        name={'storage'}
        value={media.storage}
        options={storageTypes}
        onChange={props.handleChange}
      />
    </div>
  );

  return (
    <div className="media-info">
      <div>
        <h1>{media.title}</h1>
        <img style={{ width: '200px' }} src={mediaInfo.img} />
        <p>{mediaInfo.summary}</p>
        <p>{mediaInfo.releaseDate}</p>
        <p>{mediaInfo.creator}</p>
      </div>
      {mediaFields}
      <ProjectTracker media={media} progressTracking={props.progressTracking} />
      <MediaNotes mediaID={media.id} notes={props.notes} />
    </div>
  );
}

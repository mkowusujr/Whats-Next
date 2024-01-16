import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import Select from '../components/common/Select';
import ProjectTracker from '../components/Progress/ProgressTracker';
import MediaNotes from '../components/notes/MediaNotes';
import { getMediaInfo, updateMedia } from '../services/media.service';
import { listNotesForMedia } from '../services/notes.service';
import { listProgressForMedia } from '../services/progress.service';
import { scores, statuses, storageTypes } from '../components/common/FormFields';
import useSubsequentEffect from '../components/common/useSubsequentEffect';

export default function MediaItemPage({ }) {
	const [queryParams] = useSearchParams()

	const [progressList, setProgressList] = useState([]);
	const [noteList, setNoteList] = useState([]);
	const [media, setMedia] = useState(null);

	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const [mediaType, setMediaType] = useState('');
	const [score, setScore] = useState(0);
	const [status, setStatus] = useState('');
	const [storage, setStorage] = useState('');

	useEffect(() => {
		const mediaID = queryParams.get("mediaID")

		getMediaInfo(mediaID)
			.then(m => setMedia(m))
			.catch(err => console.error(err));

		listProgressForMedia(mediaID)
			.then(ps => setProgressList(ps))
			.catch(err => console.error(err));

		listNotesForMedia(mediaID)
			.then(ns => setNoteList(ns))
			.catch(err => console.error(err));
	}, [])

	useSubsequentEffect(() => { 
		const updatedMedia = {
			id: media?.id,
			title: title,
			subTitle: subTitle,
			score: score,
			status: status,
			storage: storage
		}
		
		updateMedia(updatedMedia)
		.catch(err => console.error(err))
	},
		[title, subTitle, score, status, storage])

	return (
		media ?
			<div className="media-info">
				<h1>{media.title.toUpperCase()}</h1>
				<p>Released on {new Date(media.releaseDate).toDateString()}</p>
				<p>{media.creator}</p>
				<LazyLoadImage src={media.img} width={200} />
				<p className="desc">{media.summary}</p>
				<div className="media-fields">
					<Select
						label={'Score: '}
						name={'score'}
						value={media.score}
						options={scores}
						onChange={() => { }}
					/>
					<Select
						label={'Status: '}
						name={'status'}
						value={media.status}
						options={statuses}
						onChange={() => { }}
					/>
					<Select
						label={'Storage: '}
						name={'storage'}
						value={media.storage}
						options={storageTypes}
						onChange={() => { }}
					/>
				</div>
				<hr />
				<ProjectTracker
					media={media}
					progressTrackingUtils={[progressList, setProgressList]}
				/>
				<hr />
				<MediaNotes mediaID={media.id} noteUtils={[noteList, setNoteList]} />
			</div>
			:
			<></>
	)
}
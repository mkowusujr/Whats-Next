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
import "../sass/media_item_page.scss";

export default function MediaItemPage() {
	const [queryParams] = useSearchParams()
	const mediaID = queryParams.get("mediaID")

	const [progressList, setProgressList] = useState([]);
	const [noteList, setNoteList] = useState([]);
	const [media, setMedia] = useState(null);

	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const [score, setScore] = useState(0);
	const [status, setStatus] = useState('');
	const [storage, setStorage] = useState('');

	useEffect(() => {
		getMediaInfo(mediaID)
			.then(m => {
				setTitle(m.title)
				setSubTitle(m.subTitle ?? '')
				setScore(m.score)
				setStatus(m.status)
				setStorage(m.storage)
				document.title = (m.title + ' ' + (m.subTitle ?? '')).trim() + " | " + m.status

				setMedia(m)
			})
			.catch(err => console.error(err));

		listProgressForMedia(mediaID)
			.then(ps => setProgressList(ps))
			.catch(err => console.error(err));

		listNotesForMedia(mediaID)
			.then(ns => setNoteList(ns))
			.catch(err => console.error(err));
	}, [])

	const handleUpdate = (e) => {
		e.preventDefault();

		const updatedMedia = {
			...media,
			title: title,
			subTitle: subTitle,
			score: +score,
			status: status,
			storage: storage
		}

		document.title = (title + ' ' + (subTitle ?? '')).trim() + " | " + status

		updateMedia(updatedMedia)
			.catch(err => console.error(err))
	}

	return (
		media ?
			<div className="media-item-page">
				<h1>{title.toUpperCase()}</h1>
				<p>Released on {new Date(media.releaseDate).toDateString()} By {media.creator}</p>
				<LazyLoadImage src={media.img} width={200} />
				<form className="media-item-fields" onSubmit={handleUpdate}>
					<div>
						<input
							type="text"
							name="title"
							value={title}
							size={title.length}
							onChange={e => setTitle(e.target.value)}
							placeholder="Add Title"
							autoComplete="off"
							required
						/>
						<input
							type="text"
							name="subTitle"
							value={subTitle }
							size={subTitle?.length?? 3}
							onChange={e => setSubTitle(e.target.value)}
							placeholder="Add Subtitle"
							autoComplete="off"
						/>
					</div>
					<div className='media-item-remaining-options'>
						<Select
							label={'Score: '}
							name={'score'}
							value={score}
							options={scores}
							onChange={e => setScore(e.target.value)}
						/>
						<Select
							label={'Status: '}
							name={'status'}
							value={status}
							options={statuses}
							onChange={e => setStatus(e.target.value)}
						/>
						<Select
							label={'Storage: '}
							name={'storage'}
							value={storage}
							options={storageTypes}
							onChange={e => setStorage(e.target.value)}
						/>
					</div>
					<input className='update-button' type='submit' value="Update Media" />
				</form>


				<p className="desc">{media.summary}</p>
				<hr />
				<ProjectTracker
					className="media-item-progress-tracker"
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
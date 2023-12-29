import { useEffect, useState } from "react";
import { listMedia } from "../../services/media.service";
import MediaItem from "./MediaItem";

function MediaList(props) {
	const [mediaList, setMediaList] = useState([]);

	useEffect(() => {
		listMedia(props.mediaTypes)
			.then(ms => setMediaList(ms))
			.catch(err => console.error(err));
	}, [props.mediaTypes]);

	const mediaItems = mediaList.map(m =>
	(
		<MediaItem key={m.id} media={m} />
	)
	);

	return <table>
		<tbody className="media-list">{mediaItems}</tbody>
	</table>
}

export default MediaList;
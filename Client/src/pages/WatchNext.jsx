import MediaList from "../components/media/MediaList";

function WatchNextPage() {
	const videoMediaTypes = ['Movie', 'Series'];

	return <MediaList mediaTypes={videoMediaTypes} />
}

export default WatchNextPage
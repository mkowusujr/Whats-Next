import MediaList from "../components/media/MediaList";

function ReadNextPage() {
	const bookTypes = [
		'Graphic Novels',
		'Fiction',
	];

	return <MediaList mediaTypes={bookTypes} />
}

export default ReadNextPage
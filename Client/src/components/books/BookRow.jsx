import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useEffect, useState } from 'react';
import '../../sass/media/MediaRow.scss';
import { updateBook } from '../../services/book.service';
export default function BookRow(props) {
	const item = props.item;

	const [readingStatus, setReadingStatus] = useState(item.readingStatus);
	const [personalRating, setPersonalRating] = useState(item.personalRating);
	const [dateStarted, setDateStarted] = useState(item.dateStarted);
	const [dateCompleted, setDateCompleted] = useState(item.dateCompleted);
	const [ownershipStatus, setOwnershipStatus] = useState(item.ownershipStatus);
	
	useEffect(() => {
		updateRow();
	}, [
		personalRating,
		readingStatus,
		dateStarted,
		dateCompleted,
		ownershipStatus
	]);
	
	const updateRow = () => {
		const updatedBook = {
			id: item.id,
			readingStatus: readingStatus,
			personalRating: personalRating,
			dateStarted: dateStarted,
			dateCompleted: dateCompleted,
			ownershipStatus: ownershipStatus
		};

		updateBook(updatedBook)
      .then(() => props.updateCategoryList())
      .catch(err => console.error(err));
	};

const preloadImage = url => (document.createElement('img').src = url);
preloadImage(item.imageUrl);

	const DefaultBookRow = (
    <tr
      className="media-row-dafault"
      onClick={() => {
        props.imgUrlUtils.setImgUrl(item.posterImageUrl);
        props.setSelectedItem(item);
      }}
    >
      <td>
        <LazyLoadImage src={item.imageUrl} width={130} />
      </td>
      <td className="media-info"></td>
      <td></td>
    </tr>
  );

	return <>
	{DefaultBookRow}
	</>
}
export default function BookDetails(props) {
  const book = props.book;
  const preloadImage = url => (document.createElement('img').src = url);
  preloadImage(book.imageUrl);
  return (
    <div className="media-details">
      <img src={book.imageUrl} />
			<div className="offical-info">
				<div className="imdb-stats">
					<label>Page Count { book.pageCount}</label>
					<label>Rating { book.rating}</label>
					<label>Publisher { book.publisher}</label>
				</div>
			</div>
    </div>
  );
}

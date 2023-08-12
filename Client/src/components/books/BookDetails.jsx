import { bookCoverUrl } from "../../services/book.service";

export default function BookDetails(props) {
  const book = props.book;
  
  return (
    <div className="media-details">
      <img src={`${bookCoverUrl(book.id)}?v=${new Date().getTime()}`} />
      <div className="offical-info">
        <div className="imdb-stats">
          <label>Publisher: {book.publisher}</label>
          <label>Author(s): {JSON.parse(book.authors)}</label>
          <label>
            Page Count: {book.pageCount == 0 ? 'N/A' : book.pageCount}
          </label>
        </div>
        <label>{book.description}</label>
        <div className="imdb-stats">
          <label>ISBN-13: {book.isbn}</label>
        </div>
      </div>
    </div>
  );
}

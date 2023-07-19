import { useEffect, useState } from 'react';
import { listBooks } from '../../services/book.service';
import Category from '../utils/Category';
import CategoryTable from '../utils/CategoryTable';
import AddBookForm from './AddBookForm';
import BookFilter from './BookFilter';
import BookDetails from './BookDetails';
import BookRow from './BookRow';
export default function Books(props) {
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem('bookFilters')) ?? {
      sortBy: {
        prop: 'Personal Rating',
        desc: true
      },
      bookType: '',
      readingStatus: ''
    }
  );
  const filterProps = { filters, setFilters };

  const updateBookList = () => {
    listBooks(filters)
      .then(bookList => setBookList(bookList))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    updateBookList();
  }, [filters]);

  return (
    <>
      <Category
        AddForm={<AddBookForm updateBookList={updateBookList} />}
        ItemDetails={<BookDetails book={selectedBook} />}
        selectedRow={selectedBook}
        Table={
          <CategoryTable
            filters={<BookFilter filterProps={filterProps} />}
            categoryList={bookList}
            show={filters.readingStatus}
            imgUrlUtils={props.imgUrlUtils}
            setSelectedItem={setSelectedBook}
            updateCategoryList={updateBookList}
            rowElement={BookRow}
          />
        }
      />
    </>
  );
}

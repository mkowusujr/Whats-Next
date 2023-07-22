import { useEffect, useState } from 'react';
import { listBooks } from '../../services/book.service';
import Category from '../utils/Category';
import CategoryTable from '../utils/CategoryTable';
import AddBookForm from './AddBookForm';
import BookFilter from './BookFilter';
import BookDetails from './BookDetails';
import BookRow from './BookRow';
import { applyFilters } from '../utils/utils';

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
      readingStatus: '',
      title: ''
    }
  );
  const filterProps = { filters, setFilters };

  useEffect(() => {
    listBooks()
      .then(bookList => setBookList(bookList))
      .catch(err => console.error(err));
  }, []);

  const removeItemFromList = id =>
    setBookList([...bookList].filter(i => i.id != id));

  const addItemToList = item => setBookList([...bookList, item]);

  const updateItemInList = item =>
    setBookList([...bookList.filter(i => i.id != item.id), item]);

  return (
    <>
      <Category
        AddForm={<AddBookForm addItemToList={addItemToList} />}
        ItemDetails={<BookDetails book={selectedBook} />}
        selectedRow={selectedBook}
        Table={
          <CategoryTable
            filters={<BookFilter filterProps={filterProps} />}
            categoryList={applyFilters(bookList, filters)}
            show={filters.readingStatus}
            imgUrlUtils={props.imgUrlUtils}
            setSelectedItem={setSelectedBook}
            removeItemFromList={removeItemFromList}
            updateItemInList={updateItemInList}
            rowElement={BookRow}
          />
        }
      />
    </>
  );
}

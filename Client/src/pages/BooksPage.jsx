import { useEffect } from 'react';
import Books from '../components/books/Books';

export default function BooksPage(props) {
  useEffect(() => {
    document.title = 'Read Next?';
  }, []);

  return <Books imgUrlUtils={props.imgUrlUtils} />;
}

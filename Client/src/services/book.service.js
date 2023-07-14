import { applyFilters } from '../components/utils/utils';
import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base.service';

const baseUrl = 'http://localhost:3000/books';

export const addBook = book => {
  const apiUrl = `${baseUrl}`;
  return postRequest(apiUrl, book);
};

export const listBooks = (filters) => {
  const apiUrl = `${baseUrl}`;
  return getRequest(apiUrl).then(bookList => applyFilters(bookList, filters));
};

export const updateBook = book => {
  const apiUrl = `${baseUrl}`;
  return updateRquest(apiUrl, book);
};

export const deleteBook = bookID => {
  const apiUrl = `${baseUrl}/${bookID}`;
  return deleteRequest(apiUrl);
};

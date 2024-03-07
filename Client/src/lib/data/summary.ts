import { getRequest } from './api-base';
const baseUrl = 'http://localhost:3000/summary';

/**
 * Retrieves summary information by making a GET request to the summary API.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const getSummary = () => {
  const apiUrl = `${baseUrl}`;
  return getRequest(apiUrl);
};

import { apiUrl, getRequest } from '../../data/api-base';
const baseUrl = `${apiUrl}/summary`;

/**
 * Retrieves summary information by making a GET request to the summary API.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const getSummary = () => {
  const apiUrl = `${baseUrl}`;
  return getRequest<Summary>(apiUrl);
};

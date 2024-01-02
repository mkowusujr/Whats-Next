import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base.service';

const baseUrl = 'http://localhost:3000/media';

/**
 * Adds new media by making a POST request to the media API.
 * @param {Object} media - The media object to be added.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const addMedia = media => {
  const apiUrl = `${baseUrl}`;
  return postRequest(apiUrl, media);
};

/**
 * Retrieves media information by making a GET request to the media API.
 * @param {number} mediaID - The ID of the media to retrieve information for.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const getMediaInfo = mediaID => {
  const apiUrl = `${baseUrl}/${mediaID}`;
  return getRequest(apiUrl);
};

/**
 * Lists media based on specified media types by making a GET request to the media API.
 * @param {string[]} mediaTypes - An array of media types to filter the results.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const listMedia = mediaTypes => {
  let queryParams = '?mediaType=' + mediaTypes.join('&mediaType=');
  const apiUrl = `${baseUrl}${queryParams}`;
  return getRequest(apiUrl);
};

/**
 * Updates media information by making a PUT request to the media API.
 * @param {Object} media - The updated media object.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const updateMedia = media => {
  const apiUrl = `${baseUrl}`;
  return updateRquest(apiUrl, media);
};

/**
 * Deletes media by making a DELETE request to the media API.
 * @param {number} mediaID - The ID of the media to be deleted.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const deleteMedia = mediaID => {
  const apiUrl = `${baseUrl}/${mediaID}`;
  return deleteRequest(apiUrl);
};

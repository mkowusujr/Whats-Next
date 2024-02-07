import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base.service';

const baseUrl = 'http://localhost:3000/progress';

/**
 * Adds progress data by making a POST request to the progress API.
 * @param {Object} progressData - The progress data to be added.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const addProgress = progressData => {
  const apiUrl = `${baseUrl}`;
  return postRequest(apiUrl, progressData);
};

/**
 * Updates progress information by making a PUT request to the progress API.
 * @param {Object} progress - The updated progress object.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const updateProgress = progress => {
  const apiUrl = `${baseUrl}`;
  return updateRquest(apiUrl, progress);
};

/**
 * Deletes progress data by making a DELETE request to the progress API.
 * @param {number} progressID - The ID of the progress data to be deleted.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const deleteProgress = progressID => {
  const apiUrl = `${baseUrl}/${progressID}`;
  return deleteRequest(apiUrl);
};

/**
 * Retrieves progress information by making a GET request to the progress API.
 * @param {number} progressID - The ID of the progress data to retrieve information for.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const getProgress = progressID => {
  const apiUrl = `${baseUrl}/${progressID}`;
  return getRequest(apiUrl);
};

/**
 * Lists progress data associated with a specific media by making a GET request to the progress API.
 * @param {number} mediaID - The ID of the media for which progress data is to be listed.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const listProgressForMedia = mediaID => {
  const apiUrl = `${baseUrl}/media/${mediaID}`;
  return getRequest(apiUrl);
};

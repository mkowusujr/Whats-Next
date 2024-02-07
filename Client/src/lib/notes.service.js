import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base.service';

const baseUrl = 'http://localhost:3000/notes';

/**
 * Adds a new note by making a POST request to the notes API.
 * @param {Object} note - The note object to be added.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const addNote = note => {
  const apiUrl = `${baseUrl}`;
  return postRequest(apiUrl, note);
};

/**
 * Retrieves note information by making a GET request to the notes API.
 * @param {number} noteID - The ID of the note to retrieve information for.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const getNote = noteID => {
  const apiUrl = `${baseUrl}/${noteID}`;
  return getRequest(apiUrl);
};

/**
 * Lists notes associated with a specific media by making a GET request to the notes API.
 * @param {number} mediaID - The ID of the media for which notes are to be listed.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const listNotesForMedia = mediaID => {
  const apiUrl = `${baseUrl}/media/${mediaID}`;
  return getRequest(apiUrl);
};

/**
 * Updates note information by making a PUT request to the notes API.
 * @param {Object} note - The updated note object.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const updateNote = note => {
  const apiUrl = `${baseUrl}`;
  return updateRquest(apiUrl, note);
};

/**
 * Deletes a note by making a DELETE request to the notes API.
 * @param {number} noteID - The ID of the note to be deleted.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const deleteNote = noteID => {
  const apiUrl = `${baseUrl}/${noteID}`;
  return deleteRequest(apiUrl);
};

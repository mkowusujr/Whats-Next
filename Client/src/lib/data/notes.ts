import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base';

const baseUrl = 'http://localhost:3000/notes';

/**
 * Adds a new note by making a POST request to the notes API.
 * @param note - The note object to be added.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const addNote = (note: CreatedNote) => {
  const apiUrl = `${baseUrl}`;
  return postRequest<Note, CreatedNote>(apiUrl, note);
};

/**
 * Retrieves note information by making a GET request to the notes API.
 * @param noteID - The ID of the note to retrieve information for.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const getNote = (noteID: number) => {
  const apiUrl = `${baseUrl}/${noteID}`;
  return getRequest<Note>(apiUrl);
};

/**
 * Lists notes associated with a specific media by making a GET request to the notes API.
 * @param mediaID - The ID of the media for which notes are to be listed.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const listNotesForMedia = (mediaID: number) => {
  const apiUrl = `${baseUrl}/media/${mediaID}`;
  return getRequest<Note[]>(apiUrl);
};

/**
 * Updates note information by making a PUT request to the notes API.
 * @param note - The updated note object.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const updateNote = (note: UpdatedNote) => {
  const apiUrl = `${baseUrl}`;
  return updateRquest<Note, UpdatedNote>(apiUrl, note);
};

/**
 * Deletes a note by making a DELETE request to the notes API.
 * @param noteID - The ID of the note to be deleted.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const deleteNote = (noteID: number) => {
  const apiUrl = `${baseUrl}/${noteID}`;
  return deleteRequest(apiUrl);
};

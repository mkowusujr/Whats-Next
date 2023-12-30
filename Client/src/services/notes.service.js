import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base.service';

const baseUrl = 'http://localhost:3000/notes';

export const addNote = note => {
  const apiUrl = `${baseUrl}`;
  return postRequest(apiUrl, note);
};

export const getNote = noteID => {
  const apiUrl = `${baseUrl}/${noteID}`;
  return getRequest(apiUrl);
};

export const listNotesForMedia = mediaID => {
  const apiUrl = `${baseUrl}/media/${mediaID}`;
  return getRequest(apiUrl);
};

export const updateNote = note => {
  const apiUrl = `${baseUrl}`;
  return updateRquest(apiUrl, note);
};

export const deleteNote = noteID => {
  const apiUrl = `${baseUrl}/${noteID}`;
  return deleteRequest(apiUrl);
};

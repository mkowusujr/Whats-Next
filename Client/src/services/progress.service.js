import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base.service';

const baseUrl = 'http://localhost:3000/progress';

export const addProgress = progressData => {
  const apiUrl = `${baseUrl}`;
  return postRequest(apiUrl, progressData);
};

export const updateProgress = progress => {
  const apiUrl = `${baseUrl}`;
  return updateRquest(apiUrl, progress);
};

export const deleteProgress = progressID => {
  const apiUrl = `${baseUrl}/${progressID}`;
  return deleteRequest(apiUrl);
};

export const getProgress = progressID => {
  const apiUrl = `${baseUrl}/${progressID}`;
  return getRequest(apiUrl);
};

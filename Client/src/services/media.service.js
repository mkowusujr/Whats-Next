import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base.service';

const baseUrl = 'http://localhost:3000/media';

export const addMedia = media => {
  const apiUrl = `${baseUrl}`;
  return postRequest(apiUrl, media);
};

export const getMediaInfo = mediaID => {
  const apiUrl = `${baseUrl}/${mediaID}`;
  return getRequest(apiUrl);
};

export const listMedia = mediaTypes => {
  let queryParams = '?mediaType=' + mediaTypes.join('&mediaType=');
  const apiUrl = `${baseUrl}${queryParams}`;
  return getRequest(apiUrl);
};

export const updateMedia = media => {
  const apiUrl = `${baseUrl}`;
  return updateRquest(apiUrl, media);
};

export const deleteMedia = mediaID => {
  const apiUrl = `${baseUrl}/${mediaID}`;
  return deleteRequest(apiUrl);
};

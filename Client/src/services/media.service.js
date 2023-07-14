import { applyFilters } from '../components/utils/utils';
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

export const listMedia = filters => {
  const apiUrl = `${baseUrl}`;
  return getRequest(apiUrl).then(mediaList => applyFilters(mediaList, filters));
};

export const updateMedia = media => {
  const apiUrl = `${baseUrl}`;
  return updateRquest(apiUrl, media);
};

export const deleteMedia = media => {
  const apiUrl = `${baseUrl}/${media.id}`;
  return deleteRequest(apiUrl);
};

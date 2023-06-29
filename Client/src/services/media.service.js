import { sortByOptions } from '../components/media/FormFields';
import {
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base.service';

const baseUrl = 'http://localhost:3000/media';

const getSortUtils = option => {
  const sortOption = Object.values(sortByOptions).find(o => o.label == option);
  return {
    sortByProp: sortOption.sortBy,
    findNullProps: sortOption.findNullProps
  };
};

const applyFilters = (mediaList, filters) => {
  if (filters.watchStatus != '') {
    mediaList = mediaList.filter(m => filters.watchStatus === m.watchStatus);
  }

  if (filters.mediaType != '') {
    mediaList = mediaList.filter(m => filters.mediaType === m.mediaType);
  }

  if (filters.sortBy.prop) {
    const { sortByProp, findNullProps } = getSortUtils(filters.sortBy.prop);

    const nullMedia = mediaList.filter(findNullProps);
    const sortedMediaList = mediaList
      .filter(m => !findNullProps(m))
      .sort(sortByProp);

    mediaList = sortedMediaList;

    if (filters.sortBy.desc) {
      mediaList = mediaList.reverse();
    }

    mediaList = [...sortedMediaList, ...nullMedia];
  }

  return mediaList;
};

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

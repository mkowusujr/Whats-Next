import {
  apiUrl,
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from './api-base';

const baseUrl = `${apiUrl}/media`;

/**
 * Adds new media by making a POST request to the media API.
 * @param media - The media object to be added.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const addMedia = (media: ExternalMedia) => {
  const apiUrl = `${baseUrl}`;
  return postRequest<Media, ExternalMedia>(apiUrl, media);
};

/**
 * Retrieves media information by making a GET request to the media API.
 * @param mediaID - The ID of the media to retrieve information for.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const getMediaInfo = (mediaID: number) => {
  const apiUrl = `${baseUrl}/${mediaID}`;
  return getRequest<Media>(apiUrl);
};

/**
 * Lists media based on specified media types by making a GET request to the media API.
 * @param mediaTypes - An array of media types to filter the results.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const listInternalMedia = (page: { pageParam: number }, searchParams: string, mediaTypes: string[]) => {
  // let queryParams = '?mediaType=' + mediaTypes.join('&mediaType=');
  const apiUrl = `${baseUrl}/internal?cursor=${page.pageParam}&take=10&${searchParams}`
  return getRequest<{
    media: Media[];
    nextCursor: number;
  }>(apiUrl);
};

export const searchExternally = (query: string, mediaType: string) => {
  let queryParams = `/external?query=${encodeURIComponent(query)}&mediaType=${encodeURIComponent(mediaType)}`;
  const apiUrl = `${baseUrl}${queryParams}`;
  return getRequest<ExternalMedia[]>(apiUrl);
};

/**
 * Updates media information by making a PUT request to the media API.
 * @param media - The updated media object.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const updateMedia = (media: Media) => {
  const apiUrl = `${baseUrl}`;
  return updateRquest<Media, Media>(apiUrl, media);
};

/**
 * Deletes media by making a DELETE request to the media API.
 * @param mediaID - The ID of the media to be deleted.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const deleteMedia = (mediaID: number) => {
  const apiUrl = `${baseUrl}/${mediaID}`;
  return deleteRequest(apiUrl);
};

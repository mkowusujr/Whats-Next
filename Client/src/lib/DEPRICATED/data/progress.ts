import {
  apiUrl,
  deleteRequest,
  getRequest,
  postRequest,
  updateRquest
} from '../../data/api-base';

const baseUrl = `${apiUrl}/progress`;

/**
 * Adds progress data by making a POST request to the progress API.
 * @param progressData - The progress data to be added.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const addProgress = (progressData: CreatedProgress) => {
  const apiUrl = `${baseUrl}`;
  return postRequest<Progress, CreatedProgress>(apiUrl, progressData);
};

/**
 * Updates progress information by making a PUT request to the progress API.
 * @param progress - The updated progress object.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const updateProgress = (progress: UpdatedProgress) => {
  const apiUrl = `${baseUrl}`;
  return updateRquest<Progress, UpdatedProgress>(apiUrl, progress);
};

/**
 * Deletes progress data by making a DELETE request to the progress API.
 * @param progressID - The ID of the progress data to be deleted.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const deleteProgress = (progressID: number) => {
  const apiUrl = `${baseUrl}/${progressID}`;
  return deleteRequest(apiUrl);
};

/**
 * Retrieves progress information by making a GET request to the progress API.
 * @param progressID - The ID of the progress data to retrieve information for.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const getProgress = (progressID: number) => {
  const apiUrl = `${baseUrl}/${progressID}`;
  return getRequest<Progress>(apiUrl);
};

/**
 * Lists progress data associated with a specific media by making a GET request to the progress API.
 * @param mediaID - The ID of the media for which progress data is to be listed.
 * @returns A promise that resolves to the response data or rejects with an error.
 */
export const listProgressForMedia = (mediaID: number) => {
  const apiUrl = `${baseUrl}/media/${mediaID}`;
  return getRequest<Progress[]>(apiUrl);
};

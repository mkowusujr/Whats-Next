import { getRequest } from './api-base.service';
const baseUrl = 'http://localhost:3000/summary';

export const getSummary = () => {
  const apiUrl = `${baseUrl}`;
  return getRequest(apiUrl);
};

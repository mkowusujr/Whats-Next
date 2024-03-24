import { getRequest } from "./api-base";

const baseUrl = 'http://localhost:3000/media/external';

export const searchExternally = (query: string, mediaType: string) => {
	let queryParams = `?q=${encodeURIComponent(query)}&t=${encodeURIComponent(mediaType)}`;
	console.log(queryParams)
	const apiUrl = `${baseUrl}${queryParams}`;
	return getRequest<ExternalMedia[]>(apiUrl);
};
import { apiUrl, getRequest } from "./api-base";

const baseUrl = `${apiUrl}/media/external`;

export const searchExternally = (query: string, mediaType: string) => {
	let queryParams = `?q=${encodeURIComponent(query)}&t=${encodeURIComponent(mediaType)}`;
	console.log(queryParams)
	const apiUrl = `${baseUrl}${queryParams}`;
	return getRequest<ExternalMedia[]>(apiUrl);
};
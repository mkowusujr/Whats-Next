import { apiUrl, getRequest } from "../../data/api-base";

const baseUrl = `${apiUrl}/media/external`;

export const searchExternally = (query: string, mediaType: string) => {
	let queryParams = `?q=${encodeURIComponent(query)}&t=${encodeURIComponent(mediaType)}`;
	const apiUrl = `${baseUrl}${queryParams}`;

	return getRequest<ExternalMedia[]>(apiUrl);
};
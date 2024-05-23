import queryString from "query-string";
import { useQueryParams, StringParam } from "use-query-params";

export const useFilterQueryParams = () => {
	const [searchParams, _] = useQueryParams({
		sort: StringParam,
		query: StringParam,
		score: StringParam,
		status: StringParam
	});

	return queryString.stringify(searchParams)
}
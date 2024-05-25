import queryString from "query-string";
import { useQueryParams, StringParam } from "use-query-params";
import { useUnmount } from "usehooks-ts";

export const useFilterQueryParams = () => {
	const [searchParams, setSearchParams] = useQueryParams({
		sort: StringParam,
		query: StringParam,
		score: StringParam,
		status: StringParam
	});

	useUnmount(() => {
		setSearchParams({
			sort: null,
			query: null,
			score: null,
			status: null
		})
	})

	return queryString.stringify(searchParams)
}
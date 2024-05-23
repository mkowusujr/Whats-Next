type SummaryStats = {
	totalMediaInProgress: string
	totalSeriesInProgress: string;
	totalMoviesInProgress: string;
	totalGraphicNovelsInProgress: string;
	totalBookInProgress: string;

	totalMediaPlanned: string;
	totalSeriesPlanned: string;
	totalMoviesPlanned: string;
	totalGraphicNovelsPlanned: string;
	totalBookPlanned: string;

	totalMediaCompleted: string;
	totalSeriesCompleted: string;
	totalMoviesCompleted: string;
	totalGraphicNovelsCompleted: string;
	totalBookCompleted: string;

	totalMediaOnHold: string;
	totalSeriesOnHold: string;
	totalMoviesOnHold: string;
	totalGraphicNovelsOnHold: string;
	totalBookOnHold: string;
}

type Summary = {
	stats: SummaryStats;
	completed: Media[];
	inprogress: Media[];
	planned: Media[];
	notes: Note[];
};

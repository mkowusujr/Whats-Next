type SummaryStats = {
	totalMediaInProgress: string
	totalSeriesInProgress: string;
	totalMoviesInProgress: string;
	totalGraphicNovelsInProgress: string;
	totalFictionInProgress: string;

	totalMediaPlanned: string;
	totalSeriesPlanned: string;
	totalMoviesPlanned: string;
	totalGraphicNovelsPlanned: string;
	totalFictionPlanned: string;

	totalMediaCompleted: string;
	totalSeriesCompleted: string;
	totalMoviesCompleted: string;
	totalGraphicNovelsCompleted: string;
	totalFictionCompleted: string;

	totalMediaOnHold: string;
	totalSeriesOnHold: string;
	totalMoviesOnHold: string;
	totalGraphicNovelsOnHold: string;
	totalFictionOnHold: string;
}

type Summary = {
	stats: SummaryStats;
	completed: Media[];
	inprogress: Media[];
	planned: Media[];
	notes: Note[];
};

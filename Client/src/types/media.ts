type Media = {
	id: number;
	title: string;
	subTitle: string;
	summary: string;
	currentProgress: Progress
	storage: string;
	releaseDate: string;
	creator: string;
	mediaType: MediaType;
	imgLink: string;
	mediaLink: string;
	dateStarted: string;
	dateCompleted: string;
	createdAt: string;
	updatedAt: string;
};

type MediaType = {
	id: number;
	mediaType: string;
}

type CreatedMedia = {
	title: string;
	subTitle: string;
	mediaType: string;
	score: number;
	status: string;
	duration?: string
	imgLink?: string;
	creator?: string;
	summary?: string;
	releaseDate?: string;
	mediaLink?: string;
	categories?: string[];
};

type Filter = {
	name: string;
	mediaTypes: string[];
	score: string;
	status: string;
	sortBy: string;
	isAsc: boolean;
};

type ExternalMedia = {
	title: string,
	subTitle: string,
	creator: string[],
	releaseDate: string,
	summary: string,
	duration: string,
	categories: string[],
	mediaType: string,
	img: string
}
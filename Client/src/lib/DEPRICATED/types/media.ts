type Media = {
	imgLink: string;
	id: number;
	title: string;
	subTitle: string;
	summary: string;
	progress: Progress[]
	storage: string;
	releaseDate: string;
	creator: string;
	mediaType: string;
	mediaLink: string;
	dateStarted: string;
	dateCompleted: string;
	createdAt: string;
	updatedAt: string;
};

type CreatedMedia = {
	title: string;
	subTitle: string;
	mediaType: string;
	score: number;
	status: string;
	link: string;
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
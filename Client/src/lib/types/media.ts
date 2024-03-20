type Media = {
	id: number;
	title: string;
	subTitle: string;
	summary: string;
	score: number;
	status: string;
	storage: string;
	releaseDate: string;
	creator: string;
	img: string;
	mediaType: string;
	link: string;
	dateStarted: string;
	dateCompleted: string;
	dateCreated: string;
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
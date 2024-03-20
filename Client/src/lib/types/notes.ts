type Note = {
	id: number;
	title: string;
	content: string;
	mediaID: number;
	dateCreated: string;
	dateLastUpdated: string;
};

type NoteSummary = {
	id: number;
	title: string;
	content: string;
	mediaID: number;
	dateCreated: string;
	dateLastUpdated: string;
	img: string;
	mediaTitle: string
	mediaSubtitle: string;
};

type CreatedNote = {
	title: string;
	content: string;
	mediaID: number;
};

type UpdatedNote = {
	id: number;
	title: string;
	content: string;
};

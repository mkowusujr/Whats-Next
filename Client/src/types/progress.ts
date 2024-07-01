type Progress = {
	id: number;
	title: string;
	current: number;
	total: number;
	unit: string;
	status: string;
	score: number;
	dateStarted: string;
	dateCompleted: string;
	mediaID: number;
	createdAt: string;
	updatedAt: string;
};

type CreatedProgress = {
	title: string;
	current: number;
	total: number;
	unit: string;
	dateStarted: string;
	dateCompleted: string | null;
	mediaID: number;
};

type UpdatedProgress = {
	title: string;
	current: number;
	total: number;
	unit: string;
	dateStarted: string;
	dateCompleted: string;
	mediaID: number;
};
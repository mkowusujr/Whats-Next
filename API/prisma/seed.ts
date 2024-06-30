import { prisma } from "../src/lib/prisma";

// Define your media types
const mediaTypes = [
	{ mediaType: "Movie" },
	{ mediaType: "TV Show" },
	// Add more media types as needed
];

// Define your categories
const categories = [
	{ category: "Action" },
	{ category: "Comedy" },
	{ category: "Drama" },
	// Add more categories as needed
];

// Seed media types
const seedMediaTypes = async () => {
	for (const type of mediaTypes) {
		await prisma.mediaType.create({
			data: type,
		});
	}
};

// Seed categories
const seedCategories = async () => {
	for (const category of categories) {
		await prisma.catagory.create({
			data: category,
		});
	}
};

// Seed series
const seedSeries = async () => {
	await prisma.series.create({
		data: {
			title: "Sample Series",
		},
	});
	// Add more series if needed
};

// Seed progress
const seedProgress = async (mediaId: number) => {
	const progressList = [];
	for (let i = 0; i < 5; i++) {
		const progress = await prisma.progress.create({
			data: {
				status: "In Progress",
				score: Math.floor(Math.random() * 10) + 1,
				current: Math.floor(Math.random() * 100),
				total: 100,
				unit: "minutes",
				dateStarted: new Date(),
				mediaID: mediaId,
			},
		});
		progressList.push(progress);
	}
	return progressList;
};

// Seed media
const seedMedia = async () => {
	for (let i = 0; i < 50; i++) {
		const media = await prisma.media.create({
			data: {
				title: `Sample Media ${i + 1}`,
				subTitle: `Sample Subtitle ${i + 1}`,
				storage: `Sample Storage ${i + 1}`,
				duration: "2h 30m", // Sample duration
				releaseDate: new Date(),
				imgLink: `https://example.com/image_${i + 1}.jpg`,
				creator: `Sample Creator ${i + 1}`,
				summary: `Sample Summary ${i + 1}`,
				mediaLink: `https://example.com/media_${i + 1}.mp4`,
				mediaTypeId: Math.floor(Math.random() * mediaTypes.length) + 1,
				currentProgress: { connect: { id: 1 } },
				seriesId: 1, // Change this to match the desired series ID
				catagories: { connect: [{ id: 1 }, { id: 2 }] }, // Change IDs to match desired categories
			},
		});
		const progressList = await seedProgress(media.id);
		const currentProgress = progressList[Math.floor(Math.random() * progressList.length)];
		await prisma.media.update({
			where: { id: media.id },
			data: {
				currentProgressId: currentProgress.id,
			},
		});
	}
};

// Main seeding function
const seed = async () => {
	await seedMediaTypes();
	await seedCategories();
	await seedSeries();
	await seedMedia();
};

// Execute seeding function
seed().catch((error) => {
	console.error(error);
	process.exit(1);
});

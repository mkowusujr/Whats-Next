const movier = require('movier');
const gbookFinder = require('@chewhx/google-books');
const fetch = require('node-fetch');
const stringSimilarity = require('string-similarity');

const searchForBooks = async (query) => {
	try {
		console.log("Book")
		const gBooks = await gbookFinder.search({ q: query });
		const links = gBooks.items.map(b => b.selfLink);

		const fetchPromises = links.map(l => {
			return fetch(l)
				.then(response => response.json())
				.then(data => {
					const bookInfo = data.volumeInfo;
					const book = {
						similarity: stringSimilarity.compareTwoStrings(
							query,
							bookInfo.title
						),
						title: bookInfo.title.split(':')[0],
						subTitle: bookInfo.title.split(':')[1],
						creator: bookInfo.authors,
						releaseDate: bookInfo.publishedDate,
						summary: bookInfo.description,
						industryIdentifiers: bookInfo.industryIdentifiers,
						duration: `${bookInfo.printedPageCount} pgs`,
						mediaType: bookInfo?.printType.toLowerCase(),
						categories: [...new Set(bookInfo?.categories?.flatMap(g => g.split("/")))],
						img:
							bookInfo?.imageLinks?.large ??
							bookInfo?.imageLinks?.medium ??
							bookInfo?.imageLinks?.small ??
							"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
					};
					return book;
				});
		});

		const detailedGbooks = await Promise.all(fetchPromises);
		return detailedGbooks
			.sort((a, b) => a.similarity - b.similarity)
			.reverse();
	} catch (err) {
		console.error(err);
	}
}

const searchForMovies = async (query) => {
	try {
		const imdbInfo = await movier.searchTitleByName(query);
		const imdbIds = imdbInfo.slice(0, 5).map(i => i.source.sourceId);

		const fetchPromises = imdbIds.map(id => {
			return movier.getTitleDetailsByIMDBId(id).then(d => {
				const item = {
					similarity: stringSimilarity.compareTwoStrings(query, d.name),
					title: d.name.split(':')[0],
					subTitle: d.name.split(':')[1],
					creator: [d?.directors?.[0]?.name],
					releaseDate: d?.dates?.startDate,
					summary: d.plot,
					duration: d.runtime.seconds,
					mediaType: d.mainType,
					categories: d.genres,
					img: d.posterImage.url ?? null
				};

				return item;
			});
		});
		const result = await Promise.all(fetchPromises);
		return result.sort((a, b) => a.similarity - b.similarity).reverse()
	} catch (err) {
		console.log(err);
	}
}

exports.searchExternally = async (query, mediaType) => {
	switch (mediaType) {
		case 'Book':
			return await searchForBooks(query)
		case "Movie/Show":
			return await searchForMovies(query)
	}
}
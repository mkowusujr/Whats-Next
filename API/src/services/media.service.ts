import { prisma } from '@/src/lib/prisma';
import { GetAllMedia, Media, ProgressStatuses, ProgressUnits as ProgressUnit, ProgressUnitKeys } from '@/src/types/media';
import type { media } from '@prisma/client';
const movier = require('movier');
const gbookFinder = require('@chewhx/google-books');
import fetch from 'node-fetch';
import stringSimilarity from 'string-similarity';
const prettySeconds = require("pretty-seconds")

/** Adds a new media entry to the database. */
export const addMedia = async (media: Media): Promise<media> => {
  const progressUnit = media.mediaType.toUpperCase() as ProgressUnitKeys
  const createdMedia = await prisma.media.create({
    data: {
      title: media.title,
      subTitle: media.subTitle,
      mediaType: {
        connectOrCreate: {
          where: { mediaType: media.mediaType },
          create: { mediaType: media.mediaType }
        }
      },
      progress: {
        create: {
          status: ProgressStatuses.PLANNED,
          unit: ProgressUnit[progressUnit]
        }
      },
      duration: String(media.duration),
      score: media.score,
      imgLink: media.imgLink,
      creator: JSON.stringify(media.creator),
      summary: media.summary,
      releaseDate: media.releaseDate,
      mediaLink: media.mediaLink
    }
  });

  return createdMedia;
};

/** Retrieves a list of media entries from the database based on media types. */
export const listInternalMedia = async (params: {
  query?: string;
  score?: string;
  status?: string;
  series?: string;
  order?: string;
  sort?: string;
  cursor?: number;
  take: number;
}): Promise<GetAllMedia> => {
  const cursor = Number(params.cursor ?? 0);

  const media = await prisma.media.findMany({
    take: Number(params.take),
    ...(cursor !== 0 && { skip: 1 }),
    ...(cursor && { cursor: { id: cursor } }),
    where: {
      isDeleted: false,
      ...(params.score && { score: Number(params.score) }),
      ...(params.status && {
        progress: { some: { status: params.status } }
      }),
      ...(params.series && { series: { title: params.series } }),
      ...(params.query && {
        OR: [
          {
            title: {
              contains: params.query
            }
          },
          {
            subTitle: {
              contains: params.query
            }
          }
        ]
      })
    },
    orderBy: [
      {
        ...(params.sort && { [params.sort]: params.order ?? 'asc' })
      }
    ],
    include: {
      series: true,
      progress: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      },
      catagories: true
    }
  });

  const lastMedia = media?.[params.take - 1];
  const nextCursor = lastMedia?.id;

  return { media, nextCursor };
};

/** Retrieves information for a media entry from the database based on media ID. */
export const getMedia = async (mediaID: number) => {
  const media = await prisma.media.findFirstOrThrow({
    where: { id: mediaID },
    include: {
      progress: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      },
      catagories: true,
      series: true
    }
  });

  return media;
};

/** Updates a media entry in the database. */
export const updateMedia = async (media: Media) => {
  const mostRecentProgressCreationDate = await prisma.progress.findFirstOrThrow({
    select: { createdAt: true },
    where: { mediaID: media.id },
    orderBy: { createdAt: "desc" }
  }).then(progress => progress.createdAt)

  const updatedMedia = await prisma.media.update({
    where: { id: media.id },
    data: {
      title: media.title,
      subTitle: media.subTitle,
      mediaType: {
        connectOrCreate: {
          where: { mediaType: media.mediaType },
          create: { mediaType: media.mediaType }
        }
      },
      progress: {
        updateMany: {
          where: {
            createdAt: {
              equals: mostRecentProgressCreationDate
            }
          },
          data: { status: media.status }
        }
      },
      score: media.score,
      imgLink: media.imgLink,
      creator: media.creator,
      summary: media.summary,
      releaseDate: media.releaseDate,
      mediaLink: media.mediaLink
    }
  });

  return updatedMedia;
};

/**  Deletes a media entry from the database based on media ID. */
export const deleteMedia = async (mediaID: number) => {
  await prisma.media.update({
    where: { id: mediaID },
    data: { isDeleted: true }
  });
  return { message: 'Successfully deleted media ' + mediaID };
};

const searchForBooks = async (query: string) => {
  const gBooks = await gbookFinder.search({ q: query });
  const links =
    gBooks?.items?.map((b: { selfLink: string }) => b.selfLink) ?? [];

  const fetchPromises = links.map(async (l: fetch.RequestInfo) => {
    const response = await fetch(l!);
    const data = await response.json();

    const bookInfo = data.volumeInfo;

    let imgLink: string | null =
      bookInfo?.imageLinks?.large ??
      bookInfo?.imageLinks?.medium ??
      bookInfo?.imageLinks?.small ??
      null;
    imgLink = imgLink
      ? `https://books.google.com/books/content?id=${imgLink.split('id=')[1].split('&')[0]
      }&printsec=frontcover&img=1`
      : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

    const book = {
      similarity: stringSimilarity.compareTwoStrings(query, bookInfo.title),
      title: bookInfo.title.split(':')[0],
      subTitle: bookInfo.title.split(':')[1],
      creator: bookInfo.authors,
      releaseDate: bookInfo.publishedDate,
      summary: bookInfo.description,
      // industryIdentifiers: bookInfo.industryIdentifiers,
      duration: `${bookInfo.printedPageCount} pgs`,
      mediaType: bookInfo?.printType.toLowerCase(),
      categories: [
        ...new Set(bookInfo?.categories?.flatMap((g: string) => g.split('/')))
      ],
      imgLink: imgLink
    };
    return book;
  });

  const detailedGbooks = await Promise.all(fetchPromises);
  return detailedGbooks.sort((a, b) => a.similarity - b.similarity).reverse();
};

const searchForMovies = async (query: string) => {
  const imdbInfo = await movier.searchTitleByName(query);
  const imdbIds = imdbInfo
    .map((i: { source: { sourceId: string } }) => i.source.sourceId);

  const fetchPromises = imdbIds.map((id: string) => {
    return movier
      .getTitleDetailsByIMDBId(id)
      .then(
        (d: {
          name: string;
          directors: { name: any }[];
          dates: { startDate: any };
          plot: any;
          runtime: { seconds: any };
          mainType: any;
          genres: any;
          posterImage: { url: any };
        }) => {
          const item = {
            similarity: stringSimilarity.compareTwoStrings(query, d.name),
            title: d.name.split(':')[0],
            subTitle: d.name.split(':')[1],
            creator: [d?.directors?.[0]?.name],
            releaseDate: d?.dates?.startDate,
            summary: d.plot,
            duration: prettySeconds(d.runtime.seconds),
            mediaType: d.mainType,
            categories: d.genres,
            imgLink: d.posterImage.url ?? 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
          };

          return item;
        }
      );
  });
  const result = await Promise.all(fetchPromises);
  return result
    .sort(
      (a: { similarity: number }, b: { similarity: number }) =>
        a.similarity - b.similarity
    )
    .filter(m => m.summary)
    .reverse();
};

/** Find External Media */
export const findExternalMedia = async (params: {
  query: string;
  mediaType: string;
}) => {
  console.log("find")
  console.log(params.mediaType)
  switch (params.mediaType) {
    case 'Book':
      return await searchForBooks(params.query);
    case 'Movie/Show':
      return await searchForMovies(params.query);
  }
};

import { prisma } from "@/src/lib/prisma";

/** The stats summary */
export const getStats = async () => {
  const stats: any[] = await prisma.$queryRaw`
    SELECT
      SUM(CASE WHEN p.status = 'Completed' THEN 1 ELSE 0 END) AS totalMediaCompleted,
      SUM(CASE WHEN m.mediaType = 'Series' AND p.status = 'Completed' THEN 1 ELSE 0 END) AS totalSeriesCompleted,
      SUM(CASE WHEN m.mediaType = 'Movie' AND p.status = 'Completed' THEN 1 ELSE 0 END) AS totalMoviesCompleted,
      SUM(CASE WHEN m.mediaType = 'Graphic Novels' AND p.status = 'Completed' THEN 1 ELSE 0 END) AS totalGraphicNovelsCompleted,
      SUM(CASE WHEN m.mediaType = 'Book' AND p.status = 'Completed' THEN 1 ELSE 0 END) AS totalBookCompleted,
  
      SUM(CASE WHEN p.status = 'In Progress' THEN 1 ELSE 0 END) AS totalMediaInProgress,
      SUM(CASE WHEN m.mediaType = 'Series' AND p.status = 'In Progress' THEN 1 ELSE 0 END) AS totalSeriesInProgress,
      SUM(CASASE WHEN p.status = 'Planned' THEN 1 ELSE 0 END) AS totalMediaPlanned,
      SUM(CASE WHEN m.mediaType = 'Series' AND p.status = 'Planned' THEN 1 ELSE 0 END) AS totalSeriesPlanned,
      SUM(CASE WHEN m.mediaType = 'Movie' AND p.status = 'Planned' THEN 1 ELSE 0 END) AS totalMoviesPlanned,
      SUM(CASE WHEN m.mediaType = 'Graphic Novels' AND p.status = 'Planned' THEN 1 ELSE 0 END) AS totalGraphicNovelsPlanned,
      SUM(CASE WHEN m.mediaType = 'Book' AND p.status = 'Planned' THEN 1 ELSE 0 END) AS totalBookPlanned,
  
      SUM(CASE WHEN p.status = 'On Hold' THEN 1 ELSE 0 END) AS totalMediaOnHold,
      SUM(CASE WHEN m.mediaType = 'Series' AND p.status = 'On Hold' THEN 1 ELSE 0 END) AS totalSeriesOnHold,
      SUM(CASE WHEN m.mediaType = 'Movie' AND p.status = 'On Hold' THEN 1 ELSE 0 END) AS totalMoviesOnHold,
      SUM(CASE WHEN m.mediaType = 'Graphic Novels' AND p.status = 'On Hold' THEN 1 ELSE 0 END) AS totalGraphicNovelsOnHold,
      SUM(CASE WHEN m.mediaType = 'Book' AND p.status = 'On Hold' THEN 1 ELSE 0 END) AS totalBookOnHold
    FROM pE WHEN m.mediaType = 'Movie' AND p.status = 'In Progress' THEN 1 ELSE 0 END) AS totalMoviesInProgress,
      SUM(CASE WHEN m.mediaType = 'Graphic Novels' AND p.status = 'In Progress' THEN 1 ELSE 0 END) AS totalGraphicNovelsInProgress,
      SUM(CASE WHEN m.mediaType = 'Book' AND p.status = 'In Progress' THEN 1 ELSE 0 END) AS totalBookInProgress,
  
      SUM(Crogress p
    JOIN media m ON p.mediaID = m.id
  `;

  return stats[0]; // Return the first row of the result
};

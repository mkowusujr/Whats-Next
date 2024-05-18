-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "score" REAL,
    "storage" TEXT,
    "duration" TEXT,
    "releaseDate" DATETIME,
    "imgLink" TEXT,
    "creator" TEXT,
    "summary" TEXT,
    "mediaLink" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "seriesId" INTEGER,
    "mediaTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "media_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "media_mediaTypeId_fkey" FOREIGN KEY ("mediaTypeId") REFERENCES "mediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_media" ("createdAt", "creator", "duration", "id", "imgLink", "isDeleted", "mediaLink", "mediaTypeId", "releaseDate", "score", "seriesId", "storage", "subTitle", "summary", "title", "updatedAt") SELECT "createdAt", "creator", "duration", "id", "imgLink", coalesce("isDeleted", false) AS "isDeleted", "mediaLink", "mediaTypeId", "releaseDate", "score", "seriesId", "storage", "subTitle", "summary", "title", "updatedAt" FROM "media";
DROP TABLE "media";
ALTER TABLE "new_media" RENAME TO "media";
CREATE TABLE "new_progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "current" INTEGER,
    "total" INTEGER,
    "unit" TEXT,
    "dateStarted" DATETIME,
    "dateCompleted" DATETIME,
    "mediaID" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'First Watch',
    "isDeleted" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "progress_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_progress" ("createdAt", "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "status", "title", "total", "unit", "updatedAt") SELECT "createdAt", "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "status", "title", "total", "unit", "updatedAt" FROM "progress";
DROP TABLE "progress";
ALTER TABLE "new_progress" RENAME TO "progress";
PRAGMA foreign_key_check("media");
PRAGMA foreign_key_check("progress");
PRAGMA foreign_keys=ON;

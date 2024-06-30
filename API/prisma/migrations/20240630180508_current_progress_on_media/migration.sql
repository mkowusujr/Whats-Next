/*
  Warnings:

  - You are about to drop the column `score` on the `media` table. All the data in the column will be lost.
  - Added the required column `currentProgressId` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT 'First Watch',
    "status" TEXT NOT NULL,
    "score" INTEGER,
    "current" INTEGER,
    "total" INTEGER,
    "unit" TEXT,
    "dateStarted" DATETIME,
    "dateCompleted" DATETIME,
    "mediaID" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "progress_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_progress" ("createdAt", "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "status", "title", "total", "unit", "updatedAt") SELECT "createdAt", "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "status", "title", "total", "unit", "updatedAt" FROM "progress";
DROP TABLE "progress";
ALTER TABLE "new_progress" RENAME TO "progress";
CREATE TABLE "new_media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
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
    "currentProgressId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "media_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "media_mediaTypeId_fkey" FOREIGN KEY ("mediaTypeId") REFERENCES "mediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "media_currentProgressId_fkey" FOREIGN KEY ("currentProgressId") REFERENCES "progress" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_media" ("createdAt", "creator", "duration", "id", "imgLink", "isDeleted", "mediaLink", "mediaTypeId", "releaseDate", "seriesId", "storage", "subTitle", "summary", "title", "updatedAt") SELECT "createdAt", "creator", "duration", "id", "imgLink", "isDeleted", "mediaLink", "mediaTypeId", "releaseDate", "seriesId", "storage", "subTitle", "summary", "title", "updatedAt" FROM "media";
DROP TABLE "media";
ALTER TABLE "new_media" RENAME TO "media";
CREATE UNIQUE INDEX "media_currentProgressId_key" ON "media"("currentProgressId");
PRAGMA foreign_key_check("progress");
PRAGMA foreign_key_check("media");
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `dateCreated` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `dateLastUpdated` on the `media` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `catagory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `mediaType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "notes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mediaID" INTEGER NOT NULL,
    "isDeleted" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "note_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_series" ("id", "title") SELECT "id", "title" FROM "series";
DROP TABLE "series";
ALTER TABLE "new_series" RENAME TO "series";
CREATE UNIQUE INDEX "series_title_key" ON "series"("title");
CREATE TABLE "new_progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT,
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
INSERT INTO "new_progress" ("current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "status", "title", "total", "unit") SELECT "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "status", "title", "total", "unit" FROM "progress";
DROP TABLE "progress";
ALTER TABLE "new_progress" RENAME TO "progress";
CREATE TABLE "new_catagory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_catagory" ("category", "id") SELECT "category", "id" FROM "catagory";
DROP TABLE "catagory";
ALTER TABLE "new_catagory" RENAME TO "catagory";
CREATE UNIQUE INDEX "catagory_category_key" ON "catagory"("category");
CREATE TABLE "new_mediaType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mediaType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_mediaType" ("id", "mediaType") SELECT "id", "mediaType" FROM "mediaType";
DROP TABLE "mediaType";
ALTER TABLE "new_mediaType" RENAME TO "mediaType";
CREATE UNIQUE INDEX "mediaType_mediaType_key" ON "mediaType"("mediaType");
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
    "isDeleted" BOOLEAN,
    "seriesId" INTEGER,
    "mediaTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "media_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "media_mediaTypeId_fkey" FOREIGN KEY ("mediaTypeId") REFERENCES "mediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_media" ("creator", "duration", "id", "imgLink", "isDeleted", "mediaLink", "mediaTypeId", "releaseDate", "score", "seriesId", "storage", "subTitle", "summary", "title") SELECT "creator", "duration", "id", "imgLink", "isDeleted", "mediaLink", "mediaTypeId", "releaseDate", "score", "seriesId", "storage", "subTitle", "summary", "title" FROM "media";
DROP TABLE "media";
ALTER TABLE "new_media" RENAME TO "media";
PRAGMA foreign_key_check("series");
PRAGMA foreign_key_check("progress");
PRAGMA foreign_key_check("catagory");
PRAGMA foreign_key_check("mediaType");
PRAGMA foreign_key_check("media");
PRAGMA foreign_keys=ON;

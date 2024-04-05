/*
  Warnings:

  - You are about to alter the column `releaseDate` on the `media` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "mediaType" TEXT NOT NULL,
    "categories" TEXT,
    "score" REAL,
    "status" TEXT NOT NULL,
    "storage" TEXT,
    "releaseDate" DATETIME,
    "dateCreated" DATETIME NOT NULL,
    "dateLastUpdated" DATETIME,
    "img" TEXT,
    "creator" TEXT,
    "summary" TEXT,
    "link" TEXT,
    "isDeleted" BOOLEAN
);
INSERT INTO "new_media" ("categories", "creator", "dateCreated", "dateLastUpdated", "id", "img", "isDeleted", "link", "mediaType", "releaseDate", "score", "status", "storage", "subTitle", "summary", "title") SELECT "categories", "creator", "dateCreated", "dateLastUpdated", "id", "img", "isDeleted", "link", "mediaType", "releaseDate", "score", "status", "storage", "subTitle", "summary", "title" FROM "media";
DROP TABLE "media";
ALTER TABLE "new_media" RENAME TO "media";
CREATE TABLE "new_progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "current" TEXT,
    "total" TEXT,
    "unit" TEXT,
    "dateStarted" DATETIME,
    "dateCompleted" DATETIME,
    "mediaID" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'First Watch',
    "isDeleted" BOOLEAN,
    CONSTRAINT "progress_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_progress" ("current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "title", "total", "unit") SELECT "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "title", "total", "unit" FROM "progress";
DROP TABLE "progress";
ALTER TABLE "new_progress" RENAME TO "progress";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

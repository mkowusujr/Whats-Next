-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "current" TEXT,
    "total" TEXT,
    "unit" TEXT,
    "dateStarted" DATETIME,
    "dateCompleted" DATETIME,
    "mediaID" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'First Watch',
    CONSTRAINT "progress_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_progress" ("current", "dateCompleted", "dateStarted", "id", "mediaID", "title", "total", "unit") SELECT "current", "dateCompleted", "dateStarted", "id", "mediaID", "title", "total", "unit" FROM "progress";
DROP TABLE "progress";
ALTER TABLE "new_progress" RENAME TO "progress";
CREATE TABLE "new_media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "mediaType" TEXT NOT NULL,
    "score" REAL,
    "status" TEXT NOT NULL,
    "storage" TEXT,
    "releaseDate" TEXT,
    "dateCreated" DATETIME NOT NULL,
    "dateLastUpdated" DATETIME,
    "img" TEXT,
    "creator" TEXT,
    "summary" TEXT
);
INSERT INTO "new_media" ("creator", "dateCreated", "dateLastUpdated", "id", "img", "mediaType", "releaseDate", "score", "status", "storage", "subTitle", "summary", "title") SELECT "creator", "dateCreated", "dateLastUpdated", "id", "img", "mediaType", "releaseDate", "score", "status", "storage", "subTitle", "summary", "title" FROM "media";
DROP TABLE "media";
ALTER TABLE "new_media" RENAME TO "media";
CREATE TABLE "new_notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL,
    "dateLastUpdated" DATETIME,
    "mediaID" INTEGER NOT NULL,
    CONSTRAINT "notes_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_notes" ("content", "dateCreated", "dateLastUpdated", "id", "mediaID", "title") SELECT "content", "dateCreated", "dateLastUpdated", "id", "mediaID", "title" FROM "notes";
DROP TABLE "notes";
ALTER TABLE "new_notes" RENAME TO "notes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

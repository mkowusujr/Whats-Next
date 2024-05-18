-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mediaType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mediaType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_mediaType" ("createdAt", "id", "mediaType", "updatedAt") SELECT "createdAt", "id", "mediaType", "updatedAt" FROM "mediaType";
DROP TABLE "mediaType";
ALTER TABLE "new_mediaType" RENAME TO "mediaType";
CREATE UNIQUE INDEX "mediaType_mediaType_key" ON "mediaType"("mediaType");
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
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "progress_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_progress" ("createdAt", "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "status", "title", "total", "unit", "updatedAt") SELECT "createdAt", "current", "dateCompleted", "dateStarted", "id", coalesce("isDeleted", false) AS "isDeleted", "mediaID", "status", "title", "total", "unit", "updatedAt" FROM "progress";
DROP TABLE "progress";
ALTER TABLE "new_progress" RENAME TO "progress";
CREATE TABLE "new_series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_series" ("createdAt", "id", "title", "updatedAt") SELECT "createdAt", "id", "title", "updatedAt" FROM "series";
DROP TABLE "series";
ALTER TABLE "new_series" RENAME TO "series";
CREATE UNIQUE INDEX "series_title_key" ON "series"("title");
CREATE TABLE "new_catagory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_catagory" ("category", "createdAt", "id", "updatedAt") SELECT "category", "createdAt", "id", "updatedAt" FROM "catagory";
DROP TABLE "catagory";
ALTER TABLE "new_catagory" RENAME TO "catagory";
CREATE UNIQUE INDEX "catagory_category_key" ON "catagory"("category");
CREATE TABLE "new_note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mediaID" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "note_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_note" ("content", "createdAt", "id", "isDeleted", "mediaID", "title", "updatedAt") SELECT "content", "createdAt", "id", coalesce("isDeleted", false) AS "isDeleted", "mediaID", "title", "updatedAt" FROM "note";
DROP TABLE "note";
ALTER TABLE "new_note" RENAME TO "note";
PRAGMA foreign_key_check("mediaType");
PRAGMA foreign_key_check("progress");
PRAGMA foreign_key_check("series");
PRAGMA foreign_key_check("catagory");
PRAGMA foreign_key_check("note");
PRAGMA foreign_keys=ON;

-- CreateTable
CREATE TABLE "media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" string NOT NULL,
    "subTitle" string,
    "mediaType" string NOT NULL,
    "score" REAL,
    "status" string NOT NULL,
    "storage" string,
    "releaseDate" string,
    "dateCreated" DATETIME NOT NULL,
    "dateLastUpdated" DATETIME,
    "img" string,
    "creator" string,
    "summary" string
);

-- CreateTable
CREATE TABLE "notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" string NOT NULL,
    "content" string NOT NULL,
    "dateCreated" DATETIME NOT NULL,
    "dateLastUpdated" DATETIME,
    "mediaID" INTEGER NOT NULL,
    CONSTRAINT "notes_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "current" string,
    "total" string,
    "unit" string,
    "dateStarted" DATETIME,
    "dateCompleted" DATETIME,
    "mediaID" INTEGER NOT NULL,
    "title" string NOT NULL DEFAULT 'First Watch',
    CONSTRAINT "progress_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);


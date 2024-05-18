-- CreateTable
CREATE TABLE "media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "score" REAL,
    "storage" TEXT,
    "duration" TEXT,
    "releaseDate" DATETIME,
    "dateCreated" DATETIME NOT NULL,
    "dateLastUpdated" DATETIME,
    "imgLink" TEXT,
    "creator" TEXT,
    "summary" TEXT,
    "mediaLink" TEXT,
    "isDeleted" BOOLEAN,
    "seriesId" INTEGER,
    "mediaTypeId" INTEGER NOT NULL,
    CONSTRAINT "media_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "media_mediaTypeId_fkey" FOREIGN KEY ("mediaTypeId") REFERENCES "mediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mediaType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mediaType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "catagory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL,
    "dateLastUpdated" DATETIME,
    "mediaID" INTEGER NOT NULL,
    "isDeleted" BOOLEAN,
    CONSTRAINT "notes_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "progress" (
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
    CONSTRAINT "progress_mediaID_fkey" FOREIGN KEY ("mediaID") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "_catagoryTomedia" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_catagoryTomedia_A_fkey" FOREIGN KEY ("A") REFERENCES "catagory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_catagoryTomedia_B_fkey" FOREIGN KEY ("B") REFERENCES "media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_catagoryTomedia_AB_unique" ON "_catagoryTomedia"("A", "B");

-- CreateIndex
CREATE INDEX "_catagoryTomedia_B_index" ON "_catagoryTomedia"("B");

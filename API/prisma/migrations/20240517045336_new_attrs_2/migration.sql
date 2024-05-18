/*
  Warnings:

  - Made the column `status` on table `progress` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
PRAGMA foreign_key_check("progress");
PRAGMA foreign_keys=ON;

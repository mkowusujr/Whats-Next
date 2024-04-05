-- AlterTable
ALTER TABLE "media" ADD COLUMN "link" TEXT;

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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_progress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "status" TEXT,
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
INSERT INTO "new_progress" ("createdAt", "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "score", "status", "title", "total", "unit", "updatedAt") SELECT "createdAt", "current", "dateCompleted", "dateStarted", "id", "isDeleted", "mediaID", "score", "status", "title", "total", "unit", "updatedAt" FROM "progress";
DROP TABLE "progress";
ALTER TABLE "new_progress" RENAME TO "progress";
PRAGMA foreign_key_check("progress");
PRAGMA foreign_keys=ON;

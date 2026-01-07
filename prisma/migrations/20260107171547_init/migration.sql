-- CreateTable
CREATE TABLE "Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "dateApplied" DATETIME,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

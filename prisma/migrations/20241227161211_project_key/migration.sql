/*
  Warnings:

  - Added the required column `key` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "what_contribution" TEXT NOT NULL,
    "demo_url" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "stack_id" INTEGER NOT NULL
);
INSERT INTO "new_Project" ("demo_url", "description", "github_url", "goals", "id", "name", "stack_id", "what_contribution") SELECT "demo_url", "description", "github_url", "goals", "id", "name", "stack_id", "what_contribution" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_key_key" ON "Project"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Stack` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Stack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stack" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stack_key_key" ON "Stack"("key");

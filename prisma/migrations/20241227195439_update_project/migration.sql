/*
  Warnings:

  - You are about to drop the column `what_contribution` on the `Project` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectStack" AS ENUM ('FRONT_END', 'BACK_END', 'FULL_STACK');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "what_contribution",
ADD COLUMN     "contribution" TEXT[];

/*
  Warnings:

  - Made the column `logo_url` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `primary_color` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "logo_url" SET NOT NULL,
ALTER COLUMN "primary_color" SET NOT NULL;

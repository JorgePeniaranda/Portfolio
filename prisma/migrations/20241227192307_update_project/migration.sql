/*
  Warnings:

  - You are about to drop the column `stack_id` on the `Project` table. All the data in the column will be lost.
  - The `goals` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `start_date` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('FINISHED', 'IN_PROGRESS', 'STALLED');

-- AlterTable
ALTER TABLE "Colaborator" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "stack_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "goals",
ADD COLUMN     "goals" TEXT[],
ALTER COLUMN "what_contribution" DROP NOT NULL,
ALTER COLUMN "logo_url" DROP NOT NULL,
ALTER COLUMN "primary_color" DROP NOT NULL,
ALTER COLUMN "demo_url" DROP NOT NULL,
ALTER COLUMN "github_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Stack" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

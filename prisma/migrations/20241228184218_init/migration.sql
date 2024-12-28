-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('FINISHED', 'IN_PROGRESS', 'STALLED');

-- CreateEnum
CREATE TYPE "StackCategory" AS ENUM ('FRONT_END', 'BACK_END', 'FULL_STACK');

-- CreateEnum
CREATE TYPE "StackType" AS ENUM ('LANGUAGE', 'FRAMEWORK', 'LIBRARY', 'DATABASE', 'TOOL');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "stack" "StackCategory" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "goals" TEXT[],
    "contribution" TEXT[],
    "logo_url" TEXT NOT NULL,
    "primary_color" TEXT NOT NULL,
    "demo_url" TEXT,
    "github_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "StackCategory",
    "type" "StackType",
    "icon_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedStack" (
    "id" SERIAL NOT NULL,
    "fromStack" INTEGER NOT NULL,
    "toStack" INTEGER NOT NULL,

    CONSTRAINT "RelatedStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colaborator" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "github_username" TEXT,
    "linkedin_username" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Colaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectStacks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectStacks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProjectColaborators" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectColaborators_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_key_key" ON "Project"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Colaborator_nickname_key" ON "Colaborator"("nickname");

-- CreateIndex
CREATE INDEX "_ProjectStacks_B_index" ON "_ProjectStacks"("B");

-- CreateIndex
CREATE INDEX "_ProjectColaborators_B_index" ON "_ProjectColaborators"("B");

-- AddForeignKey
ALTER TABLE "RelatedStack" ADD CONSTRAINT "RelatedStack_fromStack_fkey" FOREIGN KEY ("fromStack") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedStack" ADD CONSTRAINT "RelatedStack_toStack_fkey" FOREIGN KEY ("toStack") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectStacks" ADD CONSTRAINT "_ProjectStacks_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectStacks" ADD CONSTRAINT "_ProjectStacks_B_fkey" FOREIGN KEY ("B") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectColaborators" ADD CONSTRAINT "_ProjectColaborators_A_fkey" FOREIGN KEY ("A") REFERENCES "Colaborator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectColaborators" ADD CONSTRAINT "_ProjectColaborators_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

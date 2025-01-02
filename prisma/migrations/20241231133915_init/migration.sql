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
    "stackCategory" "StackCategory" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "contributions" TEXT NOT NULL,
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
    "key" TEXT NOT NULL,
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
    "from_stack" INTEGER NOT NULL,
    "to_stack" INTEGER NOT NULL,

    CONSTRAINT "RelatedStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "github_username" TEXT,
    "linkedin_username" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StackAssociatedToProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_StackAssociatedToProjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CollaboratorsAssociatedToProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CollaboratorsAssociatedToProjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_key_key" ON "Project"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Stack_key_key" ON "Stack"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_nickname_key" ON "Collaborator"("nickname");

-- CreateIndex
CREATE INDEX "_StackAssociatedToProjects_B_index" ON "_StackAssociatedToProjects"("B");

-- CreateIndex
CREATE INDEX "_CollaboratorsAssociatedToProjects_B_index" ON "_CollaboratorsAssociatedToProjects"("B");

-- AddForeignKey
ALTER TABLE "RelatedStack" ADD CONSTRAINT "RelatedStack_from_stack_fkey" FOREIGN KEY ("from_stack") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedStack" ADD CONSTRAINT "RelatedStack_to_stack_fkey" FOREIGN KEY ("to_stack") REFERENCES "Stack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StackAssociatedToProjects" ADD CONSTRAINT "_StackAssociatedToProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StackAssociatedToProjects" ADD CONSTRAINT "_StackAssociatedToProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorsAssociatedToProjects" ADD CONSTRAINT "_CollaboratorsAssociatedToProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Collaborator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollaboratorsAssociatedToProjects" ADD CONSTRAINT "_CollaboratorsAssociatedToProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

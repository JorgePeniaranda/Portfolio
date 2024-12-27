-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "what_contribution" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "primary_color" TEXT NOT NULL,
    "demo_url" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "stack_id" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,

    CONSTRAINT "Stack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colaborator" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "github_username" TEXT,
    "linkedin_username" TEXT,

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
ALTER TABLE "_ProjectStacks" ADD CONSTRAINT "_ProjectStacks_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectStacks" ADD CONSTRAINT "_ProjectStacks_B_fkey" FOREIGN KEY ("B") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectColaborators" ADD CONSTRAINT "_ProjectColaborators_A_fkey" FOREIGN KEY ("A") REFERENCES "Colaborator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectColaborators" ADD CONSTRAINT "_ProjectColaborators_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

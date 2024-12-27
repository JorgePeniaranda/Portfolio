-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "what_contribution" TEXT NOT NULL,
    "demo_url" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "stack_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Stack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Colaborator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "github_username" TEXT,
    "linkedin_username" TEXT,
    "project_id" INTEGER NOT NULL,
    CONSTRAINT "Colaborator_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProjectStacks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectStacks_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectStacks_B_fkey" FOREIGN KEY ("B") REFERENCES "Stack" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Colaborator_nickname_key" ON "Colaborator"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectStacks_AB_unique" ON "_ProjectStacks"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectStacks_B_index" ON "_ProjectStacks"("B");

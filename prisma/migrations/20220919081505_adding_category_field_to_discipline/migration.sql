-- CreateTable
CREATE TABLE "_categoriesTodisciplines" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_categoriesTodisciplines_AB_unique" ON "_categoriesTodisciplines"("A", "B");

-- CreateIndex
CREATE INDEX "_categoriesTodisciplines_B_index" ON "_categoriesTodisciplines"("B");

-- AddForeignKey
ALTER TABLE "_categoriesTodisciplines" ADD CONSTRAINT "_categoriesTodisciplines_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoriesTodisciplines" ADD CONSTRAINT "_categoriesTodisciplines_B_fkey" FOREIGN KEY ("B") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

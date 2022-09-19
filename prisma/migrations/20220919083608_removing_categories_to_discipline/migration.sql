/*
  Warnings:

  - You are about to drop the `_categoriesTodisciplines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_categoriesTodisciplines" DROP CONSTRAINT "_categoriesTodisciplines_A_fkey";

-- DropForeignKey
ALTER TABLE "_categoriesTodisciplines" DROP CONSTRAINT "_categoriesTodisciplines_B_fkey";

-- DropTable
DROP TABLE "_categoriesTodisciplines";

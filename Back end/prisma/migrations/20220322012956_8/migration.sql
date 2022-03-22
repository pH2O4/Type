/*
  Warnings:

  - You are about to drop the column `classId` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `className` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_classId_fkey";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "classId",
ADD COLUMN     "className" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("Name") ON DELETE RESTRICT ON UPDATE CASCADE;

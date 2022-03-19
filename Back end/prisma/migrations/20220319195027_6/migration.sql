/*
  Warnings:

  - You are about to drop the column `Classs` on the `Class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Class]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Class` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Class_Classs_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "Classs",
ADD COLUMN     "Class" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Class_Class_key" ON "Class"("Class");

/*
  Warnings:

  - You are about to drop the column `Class` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `at` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `produtosNameProduct` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `at` on the `produtos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Name]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Name` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_produtosNameProduct_fkey";

-- DropIndex
DROP INDEX "Class_Class_key";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "Class",
DROP COLUMN "at",
DROP COLUMN "produtosNameProduct",
ADD COLUMN     "Name" TEXT NOT NULL,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "at",
ADD COLUMN     "classId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Amount" SET DEFAULT 1,
ADD CONSTRAINT "produtos_pkey" PRIMARY KEY ("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Class_Name_key" ON "Class"("Name");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

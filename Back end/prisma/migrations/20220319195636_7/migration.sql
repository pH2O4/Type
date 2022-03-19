/*
  Warnings:

  - Made the column `produtosNameProduct` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_produtosNameProduct_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "produtosNameProduct" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_produtosNameProduct_fkey" FOREIGN KEY ("produtosNameProduct") REFERENCES "produtos"("NameProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

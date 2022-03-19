-- CreateTable
CREATE TABLE "Usuarios" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Contato" TEXT NOT NULL,
    "Senha" TEXT NOT NULL DEFAULT E'123'
);

-- CreateTable
CREATE TABLE "produtos" (
    "Id" SERIAL NOT NULL,
    "NameProduct" TEXT NOT NULL,
    "Amount" INTEGER NOT NULL,
    "at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "Classs" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL,
    "produtosNameProduct" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Email_key" ON "Usuarios"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_NameProduct_key" ON "produtos"("NameProduct");

-- CreateIndex
CREATE UNIQUE INDEX "Class_Classs_key" ON "Class"("Classs");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_produtosNameProduct_fkey" FOREIGN KEY ("produtosNameProduct") REFERENCES "produtos"("NameProduct") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Usuarios" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Contato" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Email_key" ON "Usuarios"("Email");

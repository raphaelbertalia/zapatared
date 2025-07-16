-- CreateEnum
CREATE TYPE "StatusMembro" AS ENUM ('ativo', 'inativo', 'pendente');

-- CreateEnum
CREATE TYPE "Graduacao" AS ENUM ('CAMISETA', 'PROSPERO', 'MEIO_ESCUDO', 'OFICIAL', 'HONRADO', 'VETERANO');

-- CreateTable
CREATE TABLE "Membro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT NOT NULL,
    "status" "StatusMembro" NOT NULL DEFAULT 'ativo',
    "graduacao" "Graduacao" NOT NULL,
    "funcao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Membro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensalidade" (
    "id" SERIAL NOT NULL,
    "mes" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "membroId" INTEGER NOT NULL,

    CONSTRAINT "Mensalidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membro_cpf_key" ON "Membro"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Mensalidade" ADD CONSTRAINT "Mensalidade_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

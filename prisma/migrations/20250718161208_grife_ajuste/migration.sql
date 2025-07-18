/*
  Warnings:

  - The primary key for the `Comprador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `apelido` on the `Comprador` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Comprador` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Comprador` table. All the data in the column will be lost.
  - Added the required column `compradorNome` to the `Encomenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compradorTelefone` to the `Encomenda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Encomenda" DROP CONSTRAINT "Encomenda_compradorId_fkey";

-- AlterTable
ALTER TABLE "Comprador" DROP CONSTRAINT "Comprador_pkey",
DROP COLUMN "apelido",
DROP COLUMN "nome",
DROP COLUMN "telefone",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comprador_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Comprador_id_seq";

-- AlterTable
ALTER TABLE "Encomenda" ADD COLUMN     "compradorEmail" TEXT,
ADD COLUMN     "compradorEndereco" TEXT,
ADD COLUMN     "compradorNome" TEXT NOT NULL,
ADD COLUMN     "compradorTelefone" TEXT NOT NULL,
ALTER COLUMN "compradorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Encomenda" ADD CONSTRAINT "Encomenda_compradorId_fkey" FOREIGN KEY ("compradorId") REFERENCES "Comprador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

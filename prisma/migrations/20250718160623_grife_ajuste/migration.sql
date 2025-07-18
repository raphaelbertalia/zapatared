/*
  Warnings:

  - The primary key for the `Encomenda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `apelidoCliente` on the `Encomenda` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Encomenda` table. All the data in the column will be lost.
  - You are about to drop the column `dataPedido` on the `Encomenda` table. All the data in the column will be lost.
  - You are about to drop the column `nomeCliente` on the `Encomenda` table. All the data in the column will be lost.
  - You are about to drop the column `produtoId` on the `Encomenda` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Encomenda` table. All the data in the column will be lost.
  - The `status` column on the `Encomenda` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ativo` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `precoCusto` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `precoVenda` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the `EncomendaFornecedor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `compradorId` to the `Encomenda` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `Produto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoProduto" AS ENUM ('CAMISETA_MANGA_CURTA', 'CAMISETA_MANGA_LONGA', 'BONE');

-- CreateEnum
CREATE TYPE "StatusEncomenda" AS ENUM ('AGUARDANDO', 'PEDIDO_REALIZADO', 'RECEBIDO', 'ENTREGUE');

-- DropForeignKey
ALTER TABLE "Encomenda" DROP CONSTRAINT "Encomenda_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "EncomendaFornecedor" DROP CONSTRAINT "EncomendaFornecedor_produtoId_fkey";

-- AlterTable
ALTER TABLE "Encomenda" DROP CONSTRAINT "Encomenda_pkey",
DROP COLUMN "apelidoCliente",
DROP COLUMN "createdAt",
DROP COLUMN "dataPedido",
DROP COLUMN "nomeCliente",
DROP COLUMN "produtoId",
DROP COLUMN "quantidade",
ADD COLUMN     "compradorId" INTEGER NOT NULL,
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusEncomenda" NOT NULL DEFAULT 'AGUARDANDO',
ADD CONSTRAINT "Encomenda_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Encomenda_id_seq";

-- AlterTable
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_pkey",
DROP COLUMN "ativo",
DROP COLUMN "createdAt",
DROP COLUMN "precoCusto",
DROP COLUMN "precoVenda",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoProduto" NOT NULL,
ADD CONSTRAINT "Produto_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Produto_id_seq";

-- DropTable
DROP TABLE "EncomendaFornecedor";

-- CreateTable
CREATE TABLE "VarianteProduto" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "precoFornecedor" DOUBLE PRECISION NOT NULL,
    "precoVenda" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "VarianteProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comprador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "apelido" TEXT,
    "telefone" TEXT,
    "email" TEXT,

    CONSTRAINT "Comprador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemEncomenda" (
    "id" TEXT NOT NULL,
    "encomendaId" TEXT NOT NULL,
    "varianteId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "ItemEncomenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VarianteProduto" ADD CONSTRAINT "VarianteProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encomenda" ADD CONSTRAINT "Encomenda_compradorId_fkey" FOREIGN KEY ("compradorId") REFERENCES "Comprador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemEncomenda" ADD CONSTRAINT "ItemEncomenda_encomendaId_fkey" FOREIGN KEY ("encomendaId") REFERENCES "Encomenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemEncomenda" ADD CONSTRAINT "ItemEncomenda_varianteId_fkey" FOREIGN KEY ("varianteId") REFERENCES "VarianteProduto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

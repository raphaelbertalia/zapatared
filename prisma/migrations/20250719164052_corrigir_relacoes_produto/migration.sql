/*
  Warnings:

  - You are about to drop the column `custo` on the `Produto` table. All the data in the column will be lost.
  - You are about to alter the column `valorVenda` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Changed the type of `tipo` on the `Produto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `valorVenda` on table `Produto` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusCompra" AS ENUM ('EM_ENCOMENDA', 'COMPRA_FEITA', 'CONCLUIDA');

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "custo",
DROP COLUMN "tipo",
ADD COLUMN     "tipo" TEXT NOT NULL,
ALTER COLUMN "valorVenda" SET NOT NULL,
ALTER COLUMN "valorVenda" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "produtoId" TEXT NOT NULL,
    "fornecedorId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "dataCompra" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusCompra" NOT NULL DEFAULT 'EM_ENCOMENDA',

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

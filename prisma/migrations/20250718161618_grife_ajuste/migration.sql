/*
  Warnings:

  - You are about to alter the column `precoFornecedor` on the `VarianteProduto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `precoVenda` on the `VarianteProduto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- DropForeignKey
ALTER TABLE "Encomenda" DROP CONSTRAINT "Encomenda_compradorId_fkey";

-- AlterTable
ALTER TABLE "Encomenda" ALTER COLUMN "compradorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VarianteProduto" ALTER COLUMN "precoFornecedor" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "precoVenda" SET DATA TYPE DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "Encomenda" ADD CONSTRAINT "Encomenda_compradorId_fkey" FOREIGN KEY ("compradorId") REFERENCES "Comprador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `tamanho` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `precoFornecedor` on the `VarianteProduto` table. All the data in the column will be lost.
  - You are about to drop the column `precoVenda` on the `VarianteProduto` table. All the data in the column will be lost.
  - Changed the type of `tipo` on the `Produto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "tamanho",
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoProduto" NOT NULL;

-- AlterTable
ALTER TABLE "VarianteProduto" DROP COLUMN "precoFornecedor",
DROP COLUMN "precoVenda";

/*
  Warnings:

  - Added the required column `subtipo` to the `VarianteProduto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TipoProduto" ADD VALUE 'CAMISETA_REGATA';

-- AlterTable
ALTER TABLE "VarianteProduto" ADD COLUMN     "subtipo" TEXT NOT NULL;

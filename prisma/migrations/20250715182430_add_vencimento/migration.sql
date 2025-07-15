/*
  Warnings:

  - You are about to alter the column `valor` on the `Mensalidade` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.
  - Added the required column `vencimento` to the `Mensalidade` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mensalidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mes" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "vencimento" DATETIME NOT NULL,
    "membroId" INTEGER NOT NULL,
    CONSTRAINT "Mensalidade_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mensalidade" ("id", "membroId", "mes", "pago", "valor") SELECT "id", "membroId", "mes", "pago", "valor" FROM "Mensalidade";
DROP TABLE "Mensalidade";
ALTER TABLE "new_Mensalidade" RENAME TO "Mensalidade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - Added the required column `graduacao` to the `Membro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Membro` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Membro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "cpf" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "graduacao" TEXT NOT NULL,
    "funcao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Membro" ("apelido", "cpf", "email", "id", "nome", "status", "telefone") SELECT "apelido", "cpf", "email", "id", "nome", "status", "telefone" FROM "Membro";
DROP TABLE "Membro";
ALTER TABLE "new_Membro" RENAME TO "Membro";
CREATE UNIQUE INDEX "Membro_cpf_key" ON "Membro"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

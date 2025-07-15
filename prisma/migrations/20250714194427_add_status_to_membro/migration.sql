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
    "status" TEXT NOT NULL DEFAULT 'ativo'
);
INSERT INTO "new_Membro" ("apelido", "cpf", "email", "id", "nome", "telefone") SELECT "apelido", "cpf", "email", "id", "nome", "telefone" FROM "Membro";
DROP TABLE "Membro";
ALTER TABLE "new_Membro" RENAME TO "Membro";
CREATE UNIQUE INDEX "Membro_cpf_key" ON "Membro"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

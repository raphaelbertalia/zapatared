-- CreateTable
CREATE TABLE "Membro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "Mensalidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mes" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "membroId" INTEGER NOT NULL,
    CONSTRAINT "Mensalidade_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

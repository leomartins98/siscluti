/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Aluno_nome_key" ON "Aluno"("nome");

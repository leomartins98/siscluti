/*
  Warnings:

  - You are about to drop the `administrador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `arma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `funcionario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `local` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pagamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_localId_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_localId_fkey";

-- DropForeignKey
ALTER TABLE "agendamento" DROP CONSTRAINT "agendamento_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "agendamento" DROP CONSTRAINT "agendamento_funcId_fkey";

-- DropForeignKey
ALTER TABLE "arma" DROP CONSTRAINT "arma_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "funcionario" DROP CONSTRAINT "funcionario_admId_fkey";

-- DropForeignKey
ALTER TABLE "funcionario" DROP CONSTRAINT "funcionario_localId_fkey";

-- DropForeignKey
ALTER TABLE "local" DROP CONSTRAINT "local_admId_fkey";

-- DropForeignKey
ALTER TABLE "pagamento" DROP CONSTRAINT "pagamento_alunoId_fkey";

-- DropTable
DROP TABLE "administrador";

-- DropTable
DROP TABLE "agendamento";

-- DropTable
DROP TABLE "arma";

-- DropTable
DROP TABLE "funcionario";

-- DropTable
DROP TABLE "local";

-- DropTable
DROP TABLE "pagamento";

-- CreateTable
CREATE TABLE "Administrador" (
    "idAdm" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" TEXT,
    "email" TEXT,
    "senha" TEXT NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("idAdm")
);

-- CreateTable
CREATE TABLE "Local" (
    "idLocal" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "admId" INTEGER NOT NULL,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("idLocal")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "idFunc" SERIAL NOT NULL,
    "localId" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "admId" INTEGER NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("idFunc")
);

-- CreateTable
CREATE TABLE "Arma" (
    "id" SERIAL NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "nome" TEXT,
    "tipo" TEXT,

    CONSTRAINT "Arma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "idAgendamento" SERIAL NOT NULL,
    "funcId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horaAgendamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("idAgendamento")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "idPagamento" SERIAL NOT NULL,
    "tipo" TEXT,
    "alunoId" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("idPagamento")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_cpf_key" ON "Administrador"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Local_admId_key" ON "Local"("admId");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_localId_key" ON "Funcionario"("localId");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_admId_key" ON "Funcionario"("admId");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Arma_alunoId_key" ON "Arma"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_funcId_key" ON "Agendamento"("funcId");

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_alunoId_key" ON "Agendamento"("alunoId");

-- AddForeignKey
ALTER TABLE "Local" ADD CONSTRAINT "Local_admId_fkey" FOREIGN KEY ("admId") REFERENCES "Administrador"("idAdm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_admId_fkey" FOREIGN KEY ("admId") REFERENCES "Administrador"("idAdm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("idLocal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("idLocal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("idLocal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arma" ADD CONSTRAINT "Arma_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_funcId_fkey" FOREIGN KEY ("funcId") REFERENCES "Funcionario"("idFunc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

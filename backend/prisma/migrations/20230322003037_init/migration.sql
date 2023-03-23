-- CreateTable
CREATE TABLE "administrador" (
    "idAdm" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cpf" TEXT,
    "email" TEXT,
    "senha" TEXT NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("idAdm")
);

-- CreateTable
CREATE TABLE "local" (
    "idLocal" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "admId" INTEGER NOT NULL,

    CONSTRAINT "local_pkey" PRIMARY KEY ("idLocal")
);

-- CreateTable
CREATE TABLE "funcionario" (
    "idFunc" SERIAL NOT NULL,
    "localId" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "admId" INTEGER NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("idFunc")
);

-- CreateTable
CREATE TABLE "Professor" (
    "idProf" SERIAL NOT NULL,
    "nome" TEXT,
    "horarioId" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "cpf" TEXT,
    "salario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("idProf")
);

-- CreateTable
CREATE TABLE "Horario" (
    "idHorario" SERIAL NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFinal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("idHorario")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "idAluno" SERIAL NOT NULL,
    "nome" TEXT,
    "nasc" TIMESTAMP(3) NOT NULL,
    "localId" INTEGER NOT NULL,
    "profId" INTEGER NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("idAluno")
);

-- CreateTable
CREATE TABLE "arma" (
    "id" SERIAL NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "nome" TEXT,
    "tipo" TEXT,

    CONSTRAINT "arma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendamento" (
    "idAgendamento" SERIAL NOT NULL,
    "funcId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horaAgendamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("idAgendamento")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "idPagamento" SERIAL NOT NULL,
    "tipo" TEXT,
    "alunoId" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("idPagamento")
);

-- CreateIndex
CREATE UNIQUE INDEX "administrador_cpf_key" ON "administrador"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_key" ON "administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "local_admId_key" ON "local"("admId");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_localId_key" ON "funcionario"("localId");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_admId_key" ON "funcionario"("admId");

-- CreateIndex
CREATE UNIQUE INDEX "funcionario_email_key" ON "funcionario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_horarioId_key" ON "Professor"("horarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_localId_key" ON "Professor"("localId");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_localId_key" ON "Aluno"("localId");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_profId_key" ON "Aluno"("profId");

-- CreateIndex
CREATE UNIQUE INDEX "arma_alunoId_key" ON "arma"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "agendamento_funcId_key" ON "agendamento"("funcId");

-- CreateIndex
CREATE UNIQUE INDEX "agendamento_alunoId_key" ON "agendamento"("alunoId");

-- AddForeignKey
ALTER TABLE "local" ADD CONSTRAINT "local_admId_fkey" FOREIGN KEY ("admId") REFERENCES "administrador"("idAdm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_admId_fkey" FOREIGN KEY ("admId") REFERENCES "administrador"("idAdm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funcionario" ADD CONSTRAINT "funcionario_localId_fkey" FOREIGN KEY ("localId") REFERENCES "local"("idLocal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario"("idHorario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_localId_fkey" FOREIGN KEY ("localId") REFERENCES "local"("idLocal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_localId_fkey" FOREIGN KEY ("localId") REFERENCES "local"("idLocal") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_profId_fkey" FOREIGN KEY ("profId") REFERENCES "Professor"("idProf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_funcId_fkey" FOREIGN KEY ("funcId") REFERENCES "funcionario"("idFunc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE RESTRICT ON UPDATE CASCADE;

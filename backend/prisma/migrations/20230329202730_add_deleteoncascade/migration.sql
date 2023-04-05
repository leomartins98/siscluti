-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_funcId_fkey";

-- DropForeignKey
ALTER TABLE "Arma" DROP CONSTRAINT "Arma_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Pagamento" DROP CONSTRAINT "Pagamento_alunoId_fkey";

-- AddForeignKey
ALTER TABLE "Arma" ADD CONSTRAINT "Arma_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_funcId_fkey" FOREIGN KEY ("funcId") REFERENCES "Funcionario"("idFunc") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("idAluno") ON DELETE CASCADE ON UPDATE CASCADE;

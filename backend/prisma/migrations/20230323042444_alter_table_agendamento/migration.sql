/*
  Warnings:

  - You are about to drop the column `horaAgendamento` on the `Agendamento` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[horaInicioAgendamento]` on the table `Agendamento` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[horaTerminoAgendamento]` on the table `Agendamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `horaInicioAgendamento` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaTerminoAgendamento` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "horaAgendamento",
ADD COLUMN     "horaInicioAgendamento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horaTerminoAgendamento" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_horaInicioAgendamento_key" ON "Agendamento"("horaInicioAgendamento");

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_horaTerminoAgendamento_key" ON "Agendamento"("horaTerminoAgendamento");

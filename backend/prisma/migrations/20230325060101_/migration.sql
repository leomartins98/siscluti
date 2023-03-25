/*
  Warnings:

  - A unique constraint covering the columns `[horaInicio]` on the table `Horario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[horaFinal]` on the table `Horario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Horario_horaInicio_key" ON "Horario"("horaInicio");

-- CreateIndex
CREATE UNIQUE INDEX "Horario_horaFinal_key" ON "Horario"("horaFinal");

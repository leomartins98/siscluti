/*
  Warnings:

  - Added the required column `profId` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "profId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_profId_fkey" FOREIGN KEY ("profId") REFERENCES "Professor"("idProf") ON DELETE RESTRICT ON UPDATE CASCADE;

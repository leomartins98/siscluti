/*
  Warnings:

  - You are about to drop the column `horarioId` on the `Professor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_horarioId_fkey";

-- DropIndex
DROP INDEX "Professor_horarioId_key";

-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "profId" INTEGER;

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "horarioId";

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_profId_fkey" FOREIGN KEY ("profId") REFERENCES "Professor"("idProf") ON DELETE RESTRICT ON UPDATE CASCADE;

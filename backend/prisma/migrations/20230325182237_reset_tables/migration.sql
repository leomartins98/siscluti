/*
  Warnings:

  - You are about to drop the column `profId` on the `Horario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Horario" DROP CONSTRAINT "Horario_profId_fkey";

-- AlterTable
ALTER TABLE "Horario" DROP COLUMN "profId";

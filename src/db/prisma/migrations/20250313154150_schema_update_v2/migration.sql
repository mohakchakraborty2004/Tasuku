/*
  Warnings:

  - Made the column `EndTime` on table `TodoList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TodoList" ALTER COLUMN "EndTime" SET NOT NULL,
ALTER COLUMN "EndTime" SET DATA TYPE TEXT;

/*
  Warnings:

  - Added the required column `recurring` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "recurring" BOOLEAN NOT NULL;

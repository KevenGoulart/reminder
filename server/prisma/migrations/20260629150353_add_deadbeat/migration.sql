/*
  Warnings:

  - You are about to drop the `_ReminderRelatedUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ReminderRelatedUsers" DROP CONSTRAINT "_ReminderRelatedUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReminderRelatedUsers" DROP CONSTRAINT "_ReminderRelatedUsers_B_fkey";

-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "relatedUsers" TEXT[];

-- DropTable
DROP TABLE "_ReminderRelatedUsers";

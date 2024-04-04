/*
  Warnings:

  - You are about to drop the column `contactManager` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "contactManager",
ADD COLUMN     "contactManagement" BOOLEAN NOT NULL DEFAULT false;

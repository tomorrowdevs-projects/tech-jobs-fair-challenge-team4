/*
  Warnings:

  - A unique constraint covering the columns `[telegram]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkedin]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "vatNumber" TEXT;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "contactManager" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "roleManagement" SET DEFAULT false,
ALTER COLUMN "userManagement" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_telegram_key" ON "Contact"("telegram");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_linkedin_key" ON "Contact"("linkedin");

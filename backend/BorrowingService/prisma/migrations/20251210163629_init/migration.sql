/*
  Warnings:

  - You are about to drop the column `memberId` on the `RenewalRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RenewalRequest" DROP COLUMN "memberId",
ADD COLUMN     "reason" TEXT;

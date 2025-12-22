/*
  Warnings:

  - You are about to drop the column `bio` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "bio",
DROP COLUMN "birthDate";

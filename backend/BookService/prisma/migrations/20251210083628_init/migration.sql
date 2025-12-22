/*
  Warnings:

  - You are about to drop the column `nationality` on the `Author` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "nationality",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthDate" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

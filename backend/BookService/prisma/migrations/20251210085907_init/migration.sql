/*
  Warnings:

  - You are about to drop the column `category` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "category",
DROP COLUMN "description",
ADD COLUMN     "Genre" TEXT,
ADD COLUMN     "shelfLocation" TEXT;

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "books";

-- CreateTable
CREATE TABLE "books"."Book" (
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "Genre" TEXT,
    "publisher" TEXT,
    "publishedYear" INTEGER,
    "language" TEXT,
    "shelfLocation" TEXT,
    "authorId" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("isbn")
);

-- CreateTable
CREATE TABLE "books"."Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books"."RequestNewBook" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "isProcessed" BOOLEAN NOT NULL DEFAULT false,
    "isApproved" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestNewBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books"."Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "books"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

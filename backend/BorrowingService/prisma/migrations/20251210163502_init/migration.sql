-- CreateTable
CREATE TABLE "RenewalRequest" (
    "id" SERIAL NOT NULL,
    "borrowRecordId" INTEGER NOT NULL,
    "memberId" TEXT NOT NULL,
    "requestedDays" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RenewalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RenewalRequest_borrowRecordId_key" ON "RenewalRequest"("borrowRecordId");

-- AddForeignKey
ALTER TABLE "RenewalRequest" ADD CONSTRAINT "RenewalRequest_borrowRecordId_fkey" FOREIGN KEY ("borrowRecordId") REFERENCES "BorrowRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

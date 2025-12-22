// Import the Prisma client to interact with the database
const prisma = require("../prisma");

// Define Query resolvers
const Query = {
  // Fetch all borrowed books for a specific member
  GetBorrowedBooks: async (_, { memberId }) => {
    try {
      return await prisma.borrowRecord.findMany({
        where: { memberId },
        include: { fine: true },
      });
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
      throw new Error("Failed to fetch borrowed books.");
    }
  },

  // Fetch a specific borrow record by its ID
  GetBorrowedRecordById: async (_, { id }) => {
    try {
      return await prisma.borrowRecord.findUnique({
        where: { id },
        include: { fine: true },
      });
    } catch (error) {
      console.error("Error fetching borrowed record by ID:", error);
      throw new Error("Failed to fetch borrowed record by ID.");
    }
  },

  // Fetch all issued books
  GetAllIssuedBooks: async () => {
    try {
      return await prisma.borrowRecord.findMany({
        include: { fine: true },
      });
    } catch (error) {
      console.error("Error fetching all issued books:", error);
      throw new Error("Failed to fetch all issued books.");
    }
  },

  // Fetch all renewal requests
  GetAllRenewRequests: async () => {
    try {
      return await prisma.RenewalRequest.findMany({
        include: {
          borrowRecord: {
            select: {
              id: true,
              isbn: true,
              memberId: true,
              borrowDate: true,
              returnDate: true,
              isRenewed: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching renewal requests:", error);
      throw new Error("Failed to fetch renewal requests.");
    }
  },

  // Fetch borrowed books for a specific member with status "BORROWED"
  GetBorrowedBooksById: async (_, { memberId }) => {
    try {
      return await prisma.borrowRecord.findMany({
        where: { memberId, status: "BORROWED" },
        include: { fine: true },
      });
    } catch (error) {
      console.error("Error fetching borrowed books by ID:", error);
      throw new Error("Failed to fetch borrowed books by ID.");
    }
  },

  // Fetch returned books for a specific member with status "RETURNED"
  GetReturnedBooksById: async (_, { memberId }) => {
    try {
      return await prisma.borrowRecord.findMany({
        where: { memberId, status: "RETURNED" },
        include: { fine: true },
      });
    } catch (error) {
      console.error("Error fetching returned books by ID:", error);
      throw new Error("Failed to fetch returned books by ID.");
    }
  },

  // Fetch overdue books for a specific member
  GetOverdueBooksById: async (_, { memberId }) => {
    try {
      const currentDate = Date.now();
      console.log(currentDate);

      return await prisma.borrowRecord.findMany({
        where: {
          memberId,
          status: "BORROWED",
          returnDate: { lt: new Date() },
        },
        include: { fine: true },
      });
    } catch (error) {
      console.error("Error fetching overdue books by ID:", error);
      throw new Error("Failed to fetch overdue books by ID.");
    }
  },

  // Fetch the total count of books borrowed by a specific member
  GetAllBookCountByMemberId: async (_, { memberId }) => {
    try {
      const count = await prisma.borrowRecord.count({
        where: { memberId },
      });
      return count;
    } catch (error) {
      console.error("Error fetching book count by member ID:", error);
      throw new Error("Failed to fetch book count by member ID.");
    }
  },

  // Fetch the total unpaid fines for a specific member
  GetTotalFinesByMemberId: async (_, { memberId }) => {
    try {
      const fines = await prisma.fine.findMany({
        where: { memberId, paid: false },
      });
      const totalFine = fines.reduce(
        (sum, fine) => sum + Number(fine.amount),
        0
      );
      return totalFine;
    } catch (error) {
      console.error("Error fetching total fines by member ID:", error);
      throw new Error("Failed to fetch total fines by member ID.");
    }
  },

  // Fetch the ISBN of a book by its borrow record ID
  GetBookIsbnById: async (_, { id }) => {
    try {
      const record = await prisma.borrowRecord.findUnique({
        where: { id },
        select: { isbn: true },
      });
      return record ? record.isbn : null;
    } catch (error) {
      console.error("Error fetching book ISBN by ID:", error);
      throw new Error("Failed to fetch book ISBN by ID.");
    }
  },

  // Fetch the count of pending renewal requests for a specific member
  GetPendingRenewalRequestsCountByMemberId: async (_, { memberId }) => {
    try {
      const count = await prisma.RenewalRequest.count({
        where: {
          isProcessed: false,
          borrowRecord: {
            memberId: memberId,
          },
        },
      });
      return count;
    } catch (error) {
      console.error(
        "Error fetching pending renewal requests count by member ID:",
        error
      );
      throw new Error(
        "Failed to fetch pending renewal requests count by member ID."
      );
    }
  },

  // Fetch all unpaid fines
  GetAllFines: async () => {
    try {
      return await prisma.fine.findMany({
        where: { paid: false, amount: { gt: 0 } },
      });
    } catch (error) {
      console.error("Error fetching all fines:", error);
      throw new Error("Failed to fetch all fines.");
    }
  },

  // Fetch fine collection statistics for today, this week, and this month
  GetFineCollectionStats: async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const thisWeekStart = new Date(today);
      thisWeekStart.setDate(today.getDate() - today.getDay());

      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      // Fetch paid fines for today
      const todayFines = await prisma.fine.findMany({
        where: {
          paid: true,
          updatedAt: {
            gte: today,
          },
        },
      });

      // Fetch paid fines for this week
      const weekFines = await prisma.fine.findMany({
        where: {
          paid: true,
          updatedAt: {
            gte: thisWeekStart,
          },
        },
      });

      // Fetch paid fines for this month
      const monthFines = await prisma.fine.findMany({
        where: {
          paid: true,
          updatedAt: {
            gte: thisMonthStart,
          },
        },
      });

      const todayTotal = todayFines.reduce(
        (sum, fine) => sum + Number(fine.amount),
        0
      );
      const weekTotal = weekFines.reduce(
        (sum, fine) => sum + Number(fine.amount),
        0
      );
      const monthTotal = monthFines.reduce(
        (sum, fine) => sum + Number(fine.amount),
        0
      );

      return {
        today: todayTotal,
        thisWeek: weekTotal,
        thisMonth: monthTotal,
      };
    } catch (error) {
      console.error("Error fetching fine collection stats:", error);
      throw new Error("Failed to fetch fine collection stats.");
    }
  },
};

// Define Mutation resolvers
const Mutation = {
  // Approve or reject a renewal request
  ApproveRenewRequest: async (_, { requestId, isApproved }) => {
    try {
      const renewalRequest = await prisma.RenewalRequest.findUnique({
        where: { id: requestId },
        include: { borrowRecord: true },
      });

      const newReturnDate = new Date(renewalRequest.borrowRecord.returnDate);
      newReturnDate.setDate(
        newReturnDate.getDate() + renewalRequest.requestedDays
      );

      await prisma.RenewalRequest.update({
        where: { id: requestId },
        data: { isApproved: isApproved, isProcessed: true },
      });

      await prisma.BorrowRecord.update({
        where: { id: renewalRequest.borrowRecordId },
        data: { returnDate: newReturnDate },
      });
      return "Renew request approved successfully.";
    } catch (error) {
      console.error("Error approving renewal request:", error);
      throw new Error("Failed to approve renewal request.");
    }
  },

  // Create a new renewal request for a borrow record
  CreateRenewRequest: async (_, { borrowRecordId, renewalRequest }) => {
    try {
      await prisma.renewalRequest.create({
        data: {
          borrowRecordId,
          reason: renewalRequest.reason,
          requestedDays: renewalRequest.requestedDays,
          isApproved: false,
        },
      });

      await prisma.BorrowRecord.update({
        where: { id: borrowRecordId },
        data: { isRenewed: true },
      });

      return "Renew request created successfully.";
    } catch (error) {
      console.error("Error creating renewal request:", error);
      throw new Error("Failed to create renewal request.");
    }
  },

  // Issue a book to a member
  IssueABook: async (_, { issueBookInput }) => {
    try {
      await prisma.borrowRecord.create({
        data: {
          memberId: issueBookInput.memberId,
          isbn: issueBookInput.isbn,
          borrowDate: new Date(issueBookInput.issueDate),
          returnDate: new Date(issueBookInput.dueDate),
        },
      });
      return "Book issued successfully.";
    } catch (error) {
      console.error("Error issuing book:", error);
      throw new Error("Failed to issue book.");
    }
  },

  // Return a book and optionally create a fine record
  ReturnABook: async (_, { returnBookInput }) => {
    try {
      const updateData = {
        status: returnBookInput.isReturned ? "RETURNED" : "BORROWED",
        returnedDate: returnBookInput.isReturned ? new Date() : null,
      };
      if (returnBookInput.fine.amount > 0) {
        await prisma.fine.create({
          data: {
            borrowRecordId: returnBookInput.borrowRecordId,
            amount: returnBookInput.fine.amount,
            paid: returnBookInput.fine.paid,
            memberId: returnBookInput.fine.memberId,
          },
        });
      }
      await prisma.borrowRecord.update({
        where: { id: returnBookInput.borrowRecordId },
        data: updateData,
      });
      return "Book returned successfully.";
    } catch (error) {
      console.error("Error returning book:", error);
      throw new Error("Failed to return book.");
    }
  },

  // Pay an unpaid fine for a borrow record
  PayFine: async (_, { borrowRecordId }) => {
    try {
      const fineRecord = await prisma.fine.findFirst({
        where: { borrowRecordId, paid: false },
      });
      if (fineRecord) {
        await prisma.fine.update({
          where: { id: fineRecord.id },
          data: { paid: true },
        });
        return "Fine paid successfully.";
      } else {
        return "No unpaid fine found for this borrow record.";
      }
    } catch (error) {
      console.error("Error paying fine:", error);
      throw new Error("Failed to pay fine.");
    }
  },
};

// Export the Query and Mutation resolvers
module.exports = {
  Query,
  Mutation,
};

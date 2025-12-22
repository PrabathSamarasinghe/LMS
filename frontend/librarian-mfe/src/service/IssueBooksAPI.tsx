import { endpoints } from "../config/endPoints";
import axios from "axios";
import IssueQueries from "../GraphQL/Issue.queries";
import { ChangeBookAvailability } from "./BookAPI";
import { GetBookTitleByISBN } from "./BookAPI";
import { FetchNamebyId } from "./UserAPI";
import { IssueBookInput, ReturnBookInput, RenewalRequest } from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const ISSUE_BOOKS_API = endpoints.baseUrl + "borrowings";

export const IssueABook = async (input: IssueBookInput): Promise<boolean> => {
  // Issue a book to a member
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.ISSUE_BOOK,
      variables: { issueBookInput: input },
    });

    // Update book availability
    await ChangeBookAvailability(input.isbn);

    return response.data?.data?.IssueABook || false;
  } catch (error) {
    console.error("Error issuing book:", error);
    return false;
  }
};

export const FetchTotalFinesByMemberId = async (
  memberId: string
): Promise<number> => {
  // Fetch total fines for a member
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.GET_TOTAL_FINES,
      variables: { memberId },
    });
    return response.data?.data?.GetTotalFinesByMemberId || 0;
  } catch (error) {
    console.error("Error fetching total fines:", error);
    return 0;
  }
};

export const FetchBookCountByMemberId = async (
  memberId: string
): Promise<number> => {
  // Fetch total number of books issued to a member
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.GET_BOOK_COUNT,
      variables: { memberId },
    });
    return response.data?.data?.GetAllBookCountByMemberId || 0;
  } catch (error) {
    console.error("Error fetching book count:", error);
    return 0;
  }
};
export const GetAllIssuedBooks = async (): Promise<any[]> => {
  //Fetch all issued books with member names and book titles
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.GET_ALL_ISSUED_BOOKS,
    });

    const books = response.data?.data?.GetAllIssuedBooks ?? [];

    //  Enhance with member names and book titles
    const detailedBooks = await Promise.all(
      books.map(async (book: any) => ({
        id: book.id,
        isbn: book.isbn,
        title: await GetBookTitleByISBN(book.isbn), // Fetch book title
        memberId: book.memberId,
        // Fetch member name
        memberName: await FetchNamebyId(
          parseInt(book.memberId.replace(/^M/, ""), 10) // Remove 'M' prefix and convert to number
        ),
        // Format dates for better readability
        issuedDate: book.borrowDate
          ? new Date(Number(book.borrowDate)).toLocaleDateString()
          : null,
        // Handle possible null returnDate
        dueDate: book.returnDate
          ? new Date(Number(book.returnDate)).toLocaleDateString()
          : null,
        // Format returned date for better readability
        returnedDate: book.returnedDate
          ? new Date(Number(book.returnedDate)).toLocaleDateString()
          : "N/A",
        status: book.status,
        fine: book.fine?.amount ?? 0,
        isPaid: book.fine?.paid ?? false,
      }))
    );

    return detailedBooks;
  } catch (error) {
    console.error("Error fetching all issued books:", error);
    return [];
  }
};

const GetIsbnById = async (id: number): Promise<string> => {
  // Fetch ISBN by borrow record ID
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.GET_ISBN_BY_ID,
      variables: { getBookIsbnByIdId: id },
    });
    return response.data?.data?.GetBookIsbnById || "N/A";
  } catch (error) {
    console.error("Error fetching ISBN by ID:", error);
    return "N/A";
  }
};

export const AcceptReturnBook = async (
  returnBookInput: ReturnBookInput
): Promise<boolean> => {
  // Accept the return of a book
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.ACCEPT_RETURN_BOOK,
      variables: { returnBookInput },
    });

    // Update book availability
    await ChangeBookAvailability(
      // Get ISBN by borrow record ID
      await GetIsbnById(parseInt(returnBookInput.borrowRecordId))
    );
    return response.data?.data?.ReturnABook ? true : false;
  } catch (error) {
    console.error("Error accepting return book:", error);
    return false;
  }
};
export const ApproveRenewalRequest = async (
  requestId: number,
  isApproved: boolean
): Promise<boolean> => {
  // Approve or reject a renewal request
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.APPROVE_RENEWAL_REQUEST,
      variables: { requestId, isApproved },
    });
    return response.data?.data?.ApproveRenewRequest || false;
  } catch (error) {
    console.error("Error approving renewal request:", error);
    return false;
  }
};
export const GetAllRenewalRequests = async (): Promise<RenewalRequest[]> => {
  //Fetch all renewal requests with member names and book titles
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.GET_ALL_RENEWAL_REQUESTS,
    });
    const renewalRequests = response.data?.data?.GetAllRenewRequests || [];

    //  Enhance with member names and book titles
    const detailedRequests = await Promise.all(
      renewalRequests.map(async (request: any) => {
        const isbn = request.borrowRecord.isbn;
        // Calculate requested due date
        const baseDate = new Date(Number(request.borrowRecord.returnDate));
        baseDate.setDate(baseDate.getDate() + request.requestedDays);
        
        return {
          id: request.id,
          borrowRecordId: request.borrowRecordId,
          // Format createdAt date
          createdAt: new Date(Number(request.createdAt)).toLocaleDateString(
            "en-GB"
          ),
          reason: request.reason,
          isApproved: request.isApproved,
          isProcessed: request.isProcessed,
          // Format requested due date
          requestedDueDate: baseDate.toLocaleDateString("en-GB"),
          isbn: isbn,
          title: await GetBookTitleByISBN(isbn), // Fetch book title
          memberId: request.borrowRecord.memberId,
          // Fetch member name
          memberName: await FetchNamebyId(
            parseInt(request.borrowRecord.memberId.replace(/^M/, ""), 10) // Remove 'M' prefix and convert to number
          ),
          // Format borrowDate and returnDate
          borrowDate: new Date(
            Number(request.borrowRecord.borrowDate)
          ).toLocaleDateString("en-GB"),// Format borrowDate
          // Format returnDate
          returnDate: new Date(
            Number(request.borrowRecord.returnDate)
          ).toLocaleDateString("en-GB"),// Format returnDate
        };
      })
    );    
    return detailedRequests;
  } catch (error) {
    console.error("Error fetching all renewal requests:", error);
    return [];
  }
};
export const PayFine = async (borrowRecordId: number): Promise<boolean> => {
  // Pay fine for a borrow record
  try {
    const response = await axios.post(ISSUE_BOOKS_API, {
      query: IssueQueries.PAY_FINE,
      variables: { borrowRecordId },
    });
    return response.data?.data?.PayFine || false;
  } catch (error) {
    console.error("Error paying fine:", error);
    return false;
  }
};
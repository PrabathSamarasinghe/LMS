import { endpoints } from "../config/endPoints";
import axios from "axios";
import BorrowedQueries from "../GraphQL/Borrowed.queries";
import BooksQueries from "../GraphQL/Books.queries";
import { BorrowedBook } from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// API endpoints for borrowing and book operations
const BORROWINGS_API = endpoints.baseUrl + "borrowings";
const BOOKS_API = endpoints.baseUrl + "books";


/**
 * Fetches a book title by its ISBN from the API
 * @param isbn - The ISBN of the book to fetch
 * @returns Promise<string> - The book title or "Unknown Title" if not found or error occurs
 */
export const FetchBookTitleByIsbn = async (isbn: string): Promise<string> => {
  try {
    const response = await axios.post(BOOKS_API, {
      query: BooksQueries.GET_TITLE_BY_ISBN,
      variables: { isbn },
    });
    const book = response.data?.data?.GetBookByISBN;
    return book ? book.title : "Unknown Title";
  } catch (error) {
    console.error("Error fetching book title by ISBN:", error);
    return "Unknown Title";
  }
};

/**
 * Fetches all currently borrowed books for a specific member
 * @param memberId - The ID of the member
 * @returns Promise<BorrowedBook[]> - Array of borrowed books with enhanced details including titles and days remaining
 */
export const FetchBorrowedBooksByMemberId = async (
  memberId: string
): Promise<BorrowedBook[]> => {
  try {
    const response = await axios.post(BORROWINGS_API, {
      query: BorrowedQueries.GET_ALL_BORROWED_BOOKS,
      variables: { memberId },
    });
    const borrowedBooks = response.data?.data?.GetBorrowedBooksById || [];

    // Fetch book titles and calculate days left for each borrowed book
    const borrowedBooksWithTitles = await Promise.all(
      borrowedBooks.map(
        async (record: any): Promise<BorrowedBook> => ({
          id: record.id,
          isbn: record.isbn,
          title: await FetchBookTitleByIsbn(record.isbn),
          memberId: record.memberId,
          borrowDate: new Date(Number(record.borrowDate)).toLocaleDateString(
            "en-GB"
          ),
          returnDate:
            new Date(Number(record.returnDate)).toLocaleDateString("en-GB") ||
            null,
          // Calculate remaining days until due date
          daysLeft:
            new Date(Number(record.returnDate)).getTime() - Date.now() > 0
              ? Math.ceil(
                  (new Date(Number(record.returnDate)).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                )
              : 0,
          status: record.status,
          fine: {
            amount: record.fine?.amount || 0,
            paid: record.fine?.paid || false,
          },
          isRenewed: record.isRenewed || false,
        })
      )
    );
    return borrowedBooksWithTitles;
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return [];
  }
};

/**
 * Fetches all returned books for a specific member
 * @param memberId - The ID of the member
 * @returns Promise<BorrowedBook[]> - Array of returned books with enhanced details including titles and late days
 */
export const FetchReturnedBooksByMemberId = async (
  memberId: string
): Promise<BorrowedBook[]> => {
  try {
    const response = await axios.post(BORROWINGS_API, {
      query: BorrowedQueries.GET_ALL_RETURNED_BOOKS,
      variables: { memberId },
    });
    const returnedBooks = response.data?.data?.GetReturnedBooksById || [];
    // Fetch book titles and calculate late days for each returned book
    const returnedBooksWithTitles = await Promise.all(
      returnedBooks.map(
        async (record: any): Promise<BorrowedBook> => ({
          isbn: record.isbn,
          title: await FetchBookTitleByIsbn(record.isbn),
          memberId: record.memberId,
          borrowDate: new Date(Number(record.borrowDate)).toLocaleDateString(
            "en-GB"
          ),
          returnDate:
            new Date(Number(record.returnDate)).toLocaleDateString("en-GB") ||
            null,
          // Calculate late days by dividing fine amount by daily rate (LKR 50 per day)
          lateDays: (record.fine?.amount || 0) / 50,
          status: record.status,
          fine: {
            amount: record.fine?.amount || 0,
            paid: record.fine?.paid || false,
          },
        })
      )
    );
    return returnedBooksWithTitles;
  } catch (error) {
    console.error("Error fetching returned books:", error);
    return [];
  }
};

/**
 * Creates a renewal request for a borrowed book
 * @param borrowRecordId - The ID of the borrow record to renew
 * @param renewReason - The reason for requesting renewal
 * @param requestedDays - The number of days to extend the loan
 * @returns Promise<void>
 */
export const CreateRenewalRequest = async (
  borrowRecordId: number,
  renewReason: string,
  requestedDays: number
): Promise<void> => {
  try {
    await axios.post(BORROWINGS_API, {
      query: BorrowedQueries.CREATE_RENEWAL_REQUEST,
      variables: {
        borrowRecordId,
        renewalRequest: {
          reason: renewReason,
          requestedDays: requestedDays,
        },
      },
    });
  } catch (error) {
    console.error("Error creating renewal request:", error);
  }
};

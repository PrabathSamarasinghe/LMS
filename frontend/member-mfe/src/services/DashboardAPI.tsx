import { endpoints } from "../config/endPoints";
import axios from "axios";
import DashboardQueries from "../GraphQL/Dashboard.queries";
import { FetchBookTitleByIsbn } from "./BorrowedAPI";
import {
  MemberProfile,
  MemberStats,
  BorrowedBookItem,
  OverdueBookItem,
  RecommendedBook,
  ReturnedBookItem,
} from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// API endpoints for dashboard operations
const USERS_API = endpoints.baseUrl + "users";
const BORROWING_API = endpoints.baseUrl + "borrowings";
const BOOKS_API = endpoints.baseUrl + "books";

/**
 * Fetches the complete profile information for a member
 * @param memberId - The ID of the member to fetch
 * @returns Promise<MemberProfile | null> - The member's profile or null if not found
 */
export const FetchMemberProfile = async (
  memberId: string
): Promise<MemberProfile | null> => {
  try {
    const response = await axios.post(USERS_API, {
      query: DashboardQueries.GET_MEMBER_PROFILE,
      variables: { userId: memberId },
    });

    console.log("Profile response:", response);
    return response.data?.data?.GetProfile || null;
  } catch (error: any) {
    console.error(
      "Error fetching member profile:",
      error.response?.data || error.message
    );
    return null;
  }
};

/**
 * Fetches aggregated statistics for a member's library activity
 * @param memberId - The ID of the member
 * @returns Promise<MemberStats> - Statistics including books borrowed, overdue, and pending renewals
 */
export const FetchMemberStats = async (
  memberId: string
): Promise<MemberStats> => {
  try {
    // Fetch both borrowed books and renewal requests in parallel
    const [borrowedRes, renewalRes] = await Promise.all([
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_BORROWED_BOOKS,
        variables: { memberId },
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_RENEW_REQUESTS,
        variables: { memberId },
      }),
    ]);

    const borrowed = borrowedRes.data?.data?.GetBorrowedBooks || [];
    // Calculate current borrowed and overdue books
    const { booksBorrowed, overdueBooks } = (() => {
      let booksBorrowed = 0;
      let overdueBooks = 0;
      const now = new Date();
      borrowed.forEach((book: any) => {
        const returnDate = new Date(parseInt(book.returnDate));
        // Only count books that haven't been returned
        if (book.returnedDate === null) {
          booksBorrowed += 1;
          // Check if the book is past its due date
          if (returnDate < now) {
            overdueBooks += 1;
          }
        }
      });
      return { booksBorrowed, overdueBooks };
    })();

    const pendingRenewals =
      renewalRes.data?.data?.GetPendingRenewalRequestsCountByMemberId || 0;
    const totalBorrowed = borrowed.length;

    return {
      overdueBooks,
      booksBorrowed,
      renewalsPending: pendingRenewals,
      totalBorrowed,
    };
  } catch (error) {
    console.error("Error fetching member stats:", error);
    return {
      booksBorrowed: 0,
      renewalsPending: 0,
      overdueBooks: 0,
      totalBorrowed: 0,
    };
  }
};

/**
 * Fetches currently active borrowed books with their full details
 * @param memberId - The ID of the member
 * @returns Promise<BorrowedBookItem[]> - Array of currently borrowed books with status
 */
export const FetchCurrentBorrowedBooks = async (
  memberId: string
): Promise<BorrowedBookItem[]> => {
  try {
    const response = await axios.post(BORROWING_API, {
      query: DashboardQueries.GET_BORROWED_BOOKS,
      variables: { memberId },
    });

    const borrowed = response.data?.data?.GetBorrowedBooks || [];

    // Fetch book details for each borrowed book that's currently active
    const withDetails = await Promise.all(
      borrowed
        .filter((b: any) => b.returnedDate === null)
        .map(async (book: any) => {
          try {
            const bookRes = await axios.post(BOOKS_API, {
              query: DashboardQueries.GET_BOOK_DETAILS,
              variables: { isbn: book.isbn },
            });
            const bookDetails = bookRes.data?.data?.GetBookByISBN;

            // Determine status: Active, Overdue, or Due Soon (within 3 days)
            const dueDateObj = Number(book.returnDate);
            const dueDate = new Date(dueDateObj);
            const now = new Date();
            let status = "Active";
            if (dueDate < now) {
              status = "Overdue";
            } else if (
              dueDate.getTime() - now.getTime() <
              3 * 24 * 60 * 60 * 1000
            ) {
              status = "Due Soon";
            }

            return {
              id: book.id,
              title: bookDetails?.title || "Unknown",
              author: bookDetails?.author?.name || "Unknown",
              borrowedDate: new Date(
                Number(book.borrowDate)
              ).toLocaleDateString(),
              dueDate: new Date(Number(book.returnDate)).toLocaleDateString(),
              status,
            };
          } catch {
            // Return basic info if book details fetch fails
            return {
              id: book.id,
              title: "Unknown",
              author: "Unknown",
              borrowedDate: book.borrowDate,
              dueDate: book.returnDate,
              status: "Active",
            };
          }
        })
    );

    return withDetails;
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return [];
  }
};

/**
 * Fetches all overdue books for a member with late day calculations
 * @param memberId - The ID of the member
 * @returns Promise<OverdueBookItem[]> - Array of overdue books with days late
 */
export const FetchOverdueBooks = async (
  memberId: string
): Promise<OverdueBookItem[]> => {
  try {
    const response = await axios.post(BORROWING_API, {
      query: DashboardQueries.GET_OVERDUE_BOOKS,
      variables: { memberId },
    });

    console.log(response);

    const overdue = response.data?.data?.GetOverdueBooksById || [];
    const now = new Date();

    // Fetch titles for each overdue book and calculate days overdue
    return Promise.all(
      overdue.map(async (book: any) => {
        const dueDate = new Date(Number(book.returnDate)).toLocaleDateString();
        // Calculate the number of days past the due date
        const daysOverdue = Math.floor(
          (now.getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          title: (await FetchBookTitleByIsbn(book.isbn)) || "Unknown Book",
          daysOverdue,
          dueDate,
        };
      })
    );
  } catch (error) {
    console.error("Error fetching overdue books:", error);
    return [];
  }
};

/**
 * Fetches recently returned books for a member (limited to 3 most recent)
 * @param memberId - The ID of the member
 * @returns Promise<ReturnedBookItem[]> - Array of up to 3 recently returned books
 */
export const FetchReturnedBooks = async (
  memberId: string
): Promise<ReturnedBookItem[]> => {
  try {
    const response = await axios.post(BORROWING_API, {
      query: DashboardQueries.GET_RETURNED_BOOKS,
      variables: { memberId },
    });

    const returned = response.data?.data?.GetReturnedBooksById || [];

    // Fetch titles and format dates for the 3 most recent returns
    const modifiedReturned = await Promise.all(
      returned.slice(0, 3).map(async (book: any) => ({
        title: await FetchBookTitleByIsbn(book.isbn),
        returnedDate: book.returnedDate
          ? new Date(Number(book.returnedDate)).toLocaleDateString()
          : "N/A",
      }))
    );

    console.log(modifiedReturned);

    return modifiedReturned;
  } catch (error) {
    console.error("Error fetching returned books:", error);
    return [];
  }
};

/**
 * Fetches recommended books for the dashboard based on available genres
 * @returns Promise<RecommendedBook[]> - Array of 3 recommended books, one per genre
 */
export const FetchRecommendedBooks = async (): Promise<RecommendedBook[]> => {
  try {
    const response = await axios.post(BOOKS_API, {
      query: DashboardQueries.GET_ALL_BOOKS,
    });

    const books = response.data?.data?.GetAllBooks || [];

    // Extract unique genres from all books
    const genres = Array.from(new Set(books.map((b: any) => b.Genre)));
    const recommended: RecommendedBook[] = [];

    // Select one random book from each of the first 3 genres
    for (const genre of genres.slice(0, 3)) {
      const genreBooks = books.filter((b: any) => b.Genre === genre);
      if (genreBooks.length > 0) {
        // Pick a random book from this genre
        const randomBook =
          genreBooks[Math.floor(Math.random() * genreBooks.length)];
        recommended.push({
          title: randomBook.title,
          author: randomBook.author?.name || "Unknown",
          genre: randomBook.Genre,
        });
      }
    }

    return recommended;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

import { endpoints } from "../config/endPoints";
import axios from "axios";
import DashboardQueries from "../GraphQL/Dashboard.queries";
import { GetBookTitleByISBN } from "./BookAPI";
import { KPIData, IssuedBook, OverdueBook, RenewalRequest } from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const BOOKS_API = endpoints.baseUrl + "books";
const USERS_API = endpoints.baseUrl + "users";
const BORROWING_API = endpoints.baseUrl + "borrowings";

export const FetchLibrarianDashboardKPI = async (): Promise<KPIData> => {
  //Fetch KPI data for librarian dashboard
  try {
    // Perform all requests in parallel
    const [booksRes, membersRes, issuedRes, renewRes] = await Promise.all([
      axios.post(BOOKS_API, { query: DashboardQueries.GET_ALL_BOOKS }),
      axios.post(USERS_API, {
        query: DashboardQueries.GET_ALL_MEMBERS,
        variables: { type: "member" },
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_RENEW_REQUESTS,
      }),
    ]);

    const books = booksRes.data?.data?.GetAllBooks || [];
    const members = membersRes.data?.data?.GetAllUsers || [];
    const issued = issuedRes.data?.data?.GetAllIssuedBooks || [];
    const renewals = renewRes.data?.data?.GetAllRenewRequests || [];

    const today = new Date();

    // Calculate books issued today
    const issuedToday = issued.filter((book: any) => {
      const borrowDate = new Date(parseInt(book.borrowDate));
      return (
        borrowDate.getDate() === today.getDate() &&
        borrowDate.getMonth() === today.getMonth() &&
        borrowDate.getFullYear() === today.getFullYear()
      );
    }).length;

    // Calculate overdue books
    const overdueBooks = issued.filter((book: any) => {
      if (book.returnedDate !== null) return false;
      const dueDate = new Date(parseInt(book.returnDate));
      return dueDate < new Date();
    }).length;

    // Calculate pending renewals
    const pendingRenewals = renewals.filter((renewal: any) => !renewal.isApproved).length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newMembers = members.filter((member: any) => {
      // Assuming membershipDate is a timestamp string
      const date = new Date(parseInt(member.membershipDate));
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    }).length;

    return {
      totalBooks: books.length,
      totalMembers: members.length,
      issuedToday: issuedToday,
      overdueBooks,
      pendingRenewals,
      newMembers,
    };
  } catch (error) {
    console.error("Error fetching KPI:", error);
    return {
      totalBooks: 0,
      totalMembers: 0,
      issuedToday: 0,
      overdueBooks: 0,
      pendingRenewals: 0,
      newMembers: 0,
    };
  }
};

export const FetchIssuedBooksWithDetails = async (): Promise<IssuedBook[]> => {
  //Fetch issued books along with book details (title, author)
  try {
    const response = await axios.post(BORROWING_API, {
      query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
    });

    const issued = response.data?.data?.GetAllIssuedBooks || [];

    // Fetch book details for each issued book
    const issuedWithDetails = await Promise.all(
      issued.slice(0, 5).map(async (book: any) => {
        try {
          // Fetch book details
          const bookRes = await axios.post(BOOKS_API, {
            query: DashboardQueries.GET_BOOK_DETAILS,
            variables: { isbn: book.isbn },
          });
          const bookDetails = bookRes.data?.data?.GetBookByISBN;

          // Return enriched issued book data
          return {
            ...book,
            title: bookDetails?.title,
            author: bookDetails?.author?.name,
          };
        } catch {
          return book;
        }
      })
    );
    return issuedWithDetails;
  } catch (error) {
    console.error("Error fetching issued books:", error);
    return [];
  }
};

export const FetchOverdueBooks = async (): Promise<OverdueBook[]> => {
  //Fetch books that are overdue
  try {
    const response = await axios.post(BORROWING_API, {
      query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
    });

    // Get all issued books
    const issued = response.data?.data?.GetAllIssuedBooks || [];
    const now = new Date();
    const overdueBooks: OverdueBook[] = [];

    // Check each issued book for overdue status
    for (const book of issued) {
      if (book.returnedDate !== null) continue;

      // Determine if the book is overdue
      const dueDate = new Date(parseInt(book.returnDate));
      if (dueDate < now) {
        const daysOverdue = Math.floor(
          (now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Fetch book details
        try {
          const bookRes = await axios.post(BOOKS_API, {
            query: DashboardQueries.GET_BOOK_DETAILS,
            variables: { isbn: book.isbn },
          });
          const bookDetails = bookRes.data?.data?.GetBookByISBN;

          // Add to overdue list
          overdueBooks.push({
            title: bookDetails?.title || "Unknown",
            daysOverdue,
            dueDate: dueDate.toLocaleDateString(),
            isbn: book.isbn,
            memberId: book.memberId,
          });
        } catch {
          // If book details fetch fails, still add basic info
          overdueBooks.push({
            title: "Unknown",
            daysOverdue,
            dueDate: dueDate.toLocaleDateString(),
            isbn: book.isbn,
            memberId: book.memberId,
          });
        }
      }
    }

    return overdueBooks;
  } catch (error) {
    console.error("Error fetching overdue books:", error);
    return [];
  }
};

export const FetchPendingRenewals = async (): Promise<RenewalRequest[]> => {
  //Fetch renewal requests that are not yet approved
  try {
    const response = await axios.post(BORROWING_API, {
      query: DashboardQueries.GET_ALL_RENEW_REQUESTS,
    });

    const renewals = response.data?.data?.GetAllRenewRequests || [];

    // Filter pending renewals
    const pendingRenewals = renewals.filter(
      (request: any) => !request.isProcessed || !request.isApproved
    );
    return pendingRenewals;
  } catch (error) {
    console.error("Error fetching renewals:", error);
    return [];
  }
};

export const FetchRecentActivities = async () => {
  //Fetch both issued books and renewal requests
  try {
    const [issuedRes, renewRes] = await Promise.all([
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_RENEW_REQUESTS,
      }),
    ]);

    const issued = issuedRes.data?.data?.GetAllIssuedBooks || [];
    const renewals = renewRes.data?.data?.GetAllRenewRequests || [];

    // Enrich issued books with titles
    const updatedIssued = await Promise.all(
      issued.map(async (book: any) => {
        try {
          return { ...book, title: await GetBookTitleByISBN(book.isbn) };
        } catch {
          return book;
        }
      })
    );

    // Combine and sort activities by timestamp
    const activities = [
      ...updatedIssued.map((book: any) => ({
        type: "issue",
        timestamp: new Date(parseInt(book.borrowDate)),
        data: book,
      })),
      ...renewals.map((renewal: any) => ({
        type: "renewal",
        timestamp: new Date(parseInt(renewal.createdAt)),
        data: renewal,
      })),
    ];

    // Sort activities by timestamp descending
    const sortedActivities = activities.sort(
      (currentActivity, nextActivity) =>
      new Date(nextActivity.timestamp).getTime() - new Date(currentActivity.timestamp).getTime()
    );
    return sortedActivities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};

export const FetchPendingActionsCounts = async () => {

  //Fetch counts for pending actions: overdue books and renewal requests
  try {
    const [renewalRequestsRes, finesRes, bookReqestsRes] = await Promise.all([
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_RENEW_REQUESTS,
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_FINES,
      }),
      axios.post(BOOKS_API, {
        query: DashboardQueries.GET_REQUESTED_BOOKS,
      }),
    ]);

    const renewals = renewalRequestsRes.data?.data?.GetAllRenewRequests || [];
    const fines = finesRes.data?.data?.GetAllFines || [];
    const bookRequests = bookReqestsRes.data?.data?.GetRequestedBooks || [];

    const pendingRenewals = renewals.filter(
      (request: any) => !request.isProcessed || !request.isApproved
    ).length;
    const unpaidFines = fines.filter((fine: any) => !fine.isPaid).length;
    const pendingBookRequests = bookRequests.filter(
      (request: any) => !request.isProcessed
    ).length;
    return {
      pendingRenewals,
      unpaidFines,
      pendingBookRequests,
    };
  } catch (error) {
    console.error("Error fetching pending actions counts:", error);
    return {
      pendingRenewals: 0,
      unpaidFines: 0,
      pendingBookRequests: 0,
    };
  }
};

export const FetchChartData = async () => {
  //Fetch data for charts (e.g., monthly issued books)
  try {
    const [booksResponse, membersResponse, issuedResponse] = await Promise.all([
      axios.post(BOOKS_API, { query: DashboardQueries.GET_ALL_BOOKS }),
      axios.post(USERS_API, {
        query: DashboardQueries.GET_ALL_MEMBERS,
        variables: { type: "member" },
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
      }),
    ]);

    const books = booksResponse.data?.data?.GetAllBooks || [];
    const members = membersResponse.data?.data?.GetAllUsers || [];
    const issued = issuedResponse.data?.data?.GetAllIssuedBooks || [];

    // Process all data in parallel using Promise.all
    const [issuedBooksTrend, mostBorrowedBooks, genrePopularity, monthlyNewMembers] = await Promise.all([
      // Weekly issued/returned trend
      Promise.resolve().then(() => {
        const weeklyIssuedCounts = new Map<string, number>();
        const weeklyReturnedCounts = new Map<string, number>();

        issued.forEach((book: any) => {
          const borrowDate = new Date(parseInt(book.borrowDate));
          const weekNumber = Math.ceil(borrowDate.getDate() / 7);
          const weekKey = `Week ${weekNumber}`;

          weeklyIssuedCounts.set(weekKey, (weeklyIssuedCounts.get(weekKey) || 0) + 1);

          if (book.returnedDate) {
            const returnDate = new Date(parseInt(book.returnedDate));
            const returnWeekNumber = Math.ceil(returnDate.getDate() / 7);
            const returnWeekKey = `Week ${returnWeekNumber}`;
            weeklyReturnedCounts.set(returnWeekKey, (weeklyReturnedCounts.get(returnWeekKey) || 0) + 1);
          }
        });

        return Array.from(weeklyIssuedCounts.entries())
          .sort((a, b) => {
            const weekA = parseInt(a[0].match(/\d+/)?.[0] || '0');
            const weekB = parseInt(b[0].match(/\d+/)?.[0] || '0');
            return weekA - weekB;
          })
          .map(([week, count]) => ({
            week,
            issued: count,
            returned: weeklyReturnedCounts.get(week) || 0,
          }));
      }),

      // Most borrowed books
      Promise.resolve().then(() => {
        const bookBorrowCounts = new Map<string, number>();
        issued.forEach((book: any) => {
          bookBorrowCounts.set(book.isbn, (bookBorrowCounts.get(book.isbn) || 0) + 1);
        });

        return books
          .filter((book: any) => bookBorrowCounts.has(book.isbn))
          .map((book: any) => ({
            name: book.title,
            borrows: bookBorrowCounts.get(book.isbn)!,
          }))
          .sort((a, b) => b.borrows - a.borrows)
          .slice(0, 5);
      }),

      // Genre popularity
      Promise.resolve().then(() => {
        const genreCounts = new Map<string, number>();
        books.forEach((book: any) => {
          const genre = book.Genre || "Unknown";
          genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
        });

        const totalBooks = books.length;
        return Array.from(genreCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => ({
            name,
            value: Math.round((count / totalBooks) * 100),
          }));
      }),

      // Monthly new members
      Promise.resolve().then(() => {
        const memberGrowth = new Map<string, number>();
        members.forEach((member: any) => {
          const membershipDate = new Date(parseInt(member.membershipDate));
          const monthYear = `${membershipDate.toLocaleString('default', { month: 'short' })}-${membershipDate.getFullYear()}`;
          memberGrowth.set(monthYear, (memberGrowth.get(monthYear) || 0) + 1);
        });

        return Array.from(memberGrowth.entries()).map(([month, members]) => ({
          month,
          members,
        }));
      }),
    ]);

    return {
      issuedBooksTrend,
      mostBorrowedBooks,
      genrePopularity,
      monthlyNewMembers,
    };

  } catch (error) {
    console.error("Error fetching chart data:", error);
    return {
      issuedBooksTrend: [],
      mostBorrowedBooks: [],
      genrePopularity: [],
      monthlyNewMembers: [],
    };
  }
};
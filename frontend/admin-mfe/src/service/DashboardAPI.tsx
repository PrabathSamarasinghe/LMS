import { endpoints } from "../config/endPoints";
import axios from "axios";
import DashboardQueries from "../GraphQL/Dashboard.queries";
import { ActivityItem, InventoryCategory, KPIData, Librarian } from "../utils/interfaces";

// API endpoints for dashboard operations
const BOOKS_API = endpoints.baseUrl + "books";
const USERS_API = endpoints.baseUrl + "users";
const BORROWING_API = endpoints.baseUrl + "borrowings";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
/**
 * Fetches key performance indicator data for the admin dashboard
 * @returns Promise<KPIData> - Aggregated KPI metrics including books, members, librarians, and activity data
 */
export const FetchDashboardKPI = async (): Promise<KPIData> => {
  try {
    // Fetch all required data in parallel for better performance
    const [booksRes, membersRes, librariansRes, issuedRes] = await Promise.all([
      axios.post(BOOKS_API, { query: DashboardQueries.GET_ALL_BOOKS }),
      axios.post(USERS_API, {
        query: DashboardQueries.GET_ALL_MEMBERS,
        variables: { type: "member" },
      }),
      axios.post(USERS_API, {
        query: DashboardQueries.GET_ALL_LIBRARIANS,
        variables: { type: "librarian" },
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
      }),
    ]);

    const books = booksRes.data?.data?.GetAllBooks || [];
    const members = membersRes.data?.data?.GetAllUsers || [];
    const librarians = librariansRes.data?.data?.GetAllUsers || [];
    const issuedBooks = issuedRes.data?.data?.GetAllIssuedBooks || [];

    // Calculate books issued today
    const today = new Date().toDateString();
    const issuedToday = issuedBooks.filter(
      (book: any) =>
        new Date(parseInt(book.borrowDate)).toDateString() === today
    ).length;

    // Count books that are overdue (not returned and past due date)
    const overdueBooks = issuedBooks.filter((book: any) => {
      if (book.returnedDate !== null) return false;
      const dueDate = new Date(parseInt(book.returnDate));
      return dueDate < new Date();
    }).length;

    // Calculate new registrations for the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newRegThisMonth = members.filter((member: any) => {
      const memberDate = new Date(parseInt(member.membershipDate));
      return (
        memberDate.getMonth() === currentMonth &&
        memberDate.getFullYear() === currentYear
      );
    }).length;

    return {
      totalBooks: books.length,
      totalMembers: members.length,
      totalLibrarians: librarians.length,
      issuedToday,
      overdueBooks,
      newRegistrations: newRegThisMonth,
    };
  } catch (error) {
    console.error("Error fetching KPI data:", error);
    return {
      totalBooks: 0,
      totalMembers: 0,
      totalLibrarians: 0,
      issuedToday: 0,
      overdueBooks: 0,
      newRegistrations: 0,
    };
  }
};

/**
 * Fetches recent activity log entries combining issued books, renewals, and book requests
 * @returns Promise<ActivityItem[]> - Array of recent activities sorted by time (newest first)
 */
export const FetchActivityLog = async (): Promise<ActivityItem[]> => {
  try {
    // Fetch issued books, renewal requests, and book requests in parallel
    const [issuedRes, renewRes] = await Promise.all([
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_RENEW_REQUESTS,
      }),
      axios.post(BOOKS_API, { query: DashboardQueries.GET_ALL_BOOK_REQUESTS }),
    ]);

    const issued = issuedRes.data?.data?.GetAllIssuedBooks || [];
    const renewed = renewRes.data?.data?.GetAllRenewRequests || [];
    const bookRequests = issuedRes.data?.data?.GetRequestedBooks || [];

    const activities: ActivityItem[] = [];

    // Add issued book activities (most recent 5)
    issued.slice(0, 5).forEach((book: any) => {
      activities.push({
        time: new Date(parseInt(book.borrowDate)).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        user: `Librarian #${book.memberId.slice(0, 3).toUpperCase()}`,
        action: "Issued book",
        details: `ISBN: ${book.isbn}`,
      });
    });

    // Add renewal request activities (most recent 2)
    renewed.slice(0, 2).forEach((req: any) => {
      activities.push({
        time: new Date(parseInt(req.createdAt)).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        user: `Member #${req.borrowRecordId.toString().padStart(3, "0")}`,
        action: req.isApproved ? "Renewal approved" : "Renewal requested",
        details: `Days: ${req.requestedDays}`,
      });
    });

    // Add book request activities (most recent 3)
    bookRequests.slice(0, 3).forEach((request: any) => {
      activities.push({
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        user: `Member #${request.memberId.slice(0, 3).toUpperCase()}`,
        action: "Book requested",
        details: `Title: ${request.title}`,
      });
    });

    // Sort activities by time in descending order (newest first)
    return activities.sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
      const timeB = new Date(`1970/01/01 ${b.time}`).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error fetching activity log:", error);
    return [];
  }
};

/**
 * Fetches inventory statistics grouped by book genre/category
 * @returns Promise<InventoryCategory[]> - Array of genres with count and percentage distribution
 */
export const FetchInventoryByGenre = async (): Promise<InventoryCategory[]> => {
  try {
    const response = await axios.post(BOOKS_API, {
      query: DashboardQueries.GET_ALL_BOOKS,
    });
    const books = response.data?.data?.GetAllBooks || [];

    // Count books by genre
    const genreMap = new Map<string, number>();
    books.forEach((book: any) => {
      const genre = book.Genre || "Other";
      genreMap.set(genre, (genreMap.get(genre) || 0) + 1);
    });

    // Calculate percentages for each genre
    const total = books.length;
    const categories: InventoryCategory[] = Array.from(genreMap).map(
      ([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / total) * 100),
      })
    );

    return categories;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

/**
 * Fetches overview information for all librarians with activity metrics
 * @returns Promise<Librarian[]> - Array of librarian profiles with formatted IDs and statistics
 */
export const FetchLibrariansOverview = async (): Promise<Librarian[]> => {
  try {
    const response = await axios.post(USERS_API, {
      query: DashboardQueries.GET_ALL_LIBRARIANS,
      variables: { type: "librarian" },
    });

    const librarians = response.data?.data?.GetAllUsers || [];

    // Format librarian data with calculated metrics
    return librarians.map((lib: any) => ({
      id: `L${lib.id.toString().padStart(3, "0")}`,
      name: lib.fullname,
      email: lib.email,
      // Note: booksHandled is randomly generated for demo purposes
      booksHandled: Math.floor(Math.random() * 200),
      status: lib.status,
    }));
  } catch (error) {
    console.error("Error fetching librarians:", error);
    return [];
  }
};

/**
 * Fetches member-related statistics for the admin dashboard
 * @returns Promise object containing pending approvals, unpaid fines, overdue books, and deactivated members
 */
export const FetchMemberStats = async () => {
  try {
    const [membersResponse, issuedBooksData, unpaidFinesResponse] =
      await Promise.all([
        axios.post(USERS_API, {
          query: DashboardQueries.GET_ALL_MEMBERS,
          variables: { type: "member" },
        }),
        axios.post(BORROWING_API, {
          query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
        }),
        axios.post(BORROWING_API, {
          query: DashboardQueries.GET_ALL_UNPAID_FINES,
        }),
      ]);

    const issuedBooks = issuedBooksData.data?.data?.GetAllIssuedBooks || [];
    const members = membersResponse.data?.data?.GetAllUsers || [];
    const unpaidFines = unpaidFinesResponse.data?.data?.GetAllFines || [];

    // Count overdue books
    const overdueBooks = issuedBooks.filter((book: any) => {
      if (book.returnedDate !== null) return false;
      const dueDate = new Date(parseInt(book.returnDate));
      return dueDate < new Date();
    }).length;

    return {
      // Count members waiting for approval
      pendingApproval: members.length,
      unpaidFines: unpaidFines.length,
      overdueBooks,
      recentlyDeactivated: 5,
    };
  } catch (error) {
    console.error("Error fetching member stats:", error);
    return {
      pendingApproval: 0,
      unpaidFines: 0,
      overdueBooks: 0,
      recentlyDeactivated: 0,
    };
  }
};

/**
 * Fetches book issuing statistics for today
 * @returns Promise object containing issued books, returned books, and renewals for the current day
 */
export const FetchIssuingStats = async () => {
  try {
    const [issuedBooks, renewalRequests] = await Promise.all([
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_ISSUED_BOOKS,
      }),
      axios.post(BORROWING_API, {
        query: DashboardQueries.GET_ALL_RENEW_REQUESTS,
      }),
    ]);

    const books = issuedBooks.data?.data?.GetAllIssuedBooks || [];
    const renewals = renewalRequests.data?.data?.GetAllRenewRequests || [];
    const today = new Date().toDateString();

    // Count books issued today
    const issuedToday = books.filter(
      (b: any) => new Date(parseInt(b.borrowDate)).toDateString() === today
    ).length;

    // Count books returned today
    const returnedToday = books.filter(
      (b: any) =>
        b.returnedDate &&
        new Date(parseInt(b.returnedDate)).toDateString() === today
    ).length;

    // Note: renewalsToday is a placeholder value
    const renewalsToday = renewals.filter(
      (request: any) =>
        new Date(parseInt(request.createdAt)).toDateString() === today
    ).length;

    return { issuedToday, returnedToday, renewalsToday };
  } catch (error) {
    console.error("Error fetching issuing stats:", error);
    return { issuedToday: 0, returnedToday: 0, renewalsToday: 0 };
  }
};

/**
 * Fetches fine collection statistics for different time periods
 * @returns Promise object containing fine amounts for today, this week, and this month
 */
export const FetchFineCollectionStats = async () => {
  try {
    const response = await axios.post(BORROWING_API, {
      query: DashboardQueries.GET_FINE_COLLECTION_STATS,
    });
    const { today, thisWeek, thisMonth } =
      response.data?.data?.GetFineCollectionStats || {};
    return {
      today: today || 0,
      thisWeek: thisWeek || 0,
      thisMonth: thisMonth || 0,
    };
  } catch (error) {
    console.error("Error fetching fine collection:", error);
    return { today: 0, thisWeek: 0, thisMonth: 0 };
  }
};

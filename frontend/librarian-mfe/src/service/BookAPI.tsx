import { endpoints } from "../config/endPoints";
import axios from "axios";
import Queries from "../GraphQL/Book.queries";
import { FetchNamebyId } from "./UserAPI";
import { Book, BookInput, RequestedBook } from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const BOOKS_API = endpoints.baseUrl + "books";

export const FetchAllBooks = async (): Promise<Book[]> => {
  // Fetch all books from the API
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.GET_ALL_BOOKS,
    });

    const books = response.data?.data?.GetAllBooks || [];

    // Map the response to the Book interface
    return books.map(
      (book: any): Book => ({
        isbn: book.isbn,
        title: book.title,
        author: book.author.name,
        authorId: book.author?.id,
        category: book.Genre,
        publisher: book.publisher,
        publishedYear: book.publishedYear,
        language: book.language,
        shelfLocation: book.shelfLocation,
        available: book.available,
      })
    );
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const FetchAllGenres = async (): Promise<string[]> => {
  // Fetch all unique genres from the books
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.GET_ALL_GENRES,
    });
    const books = response.data?.data?.GetAllBooks || [];

    // Extract unique genres
    const genresSet = new Set<string>(
      books.map((book: any) => book.Genre).filter((genre: string) => genre)
    );

    // Convert Set to Array and return
    return Array.from(genresSet);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const AddNewBook = async (bookData: BookInput): Promise<boolean> => {
  // Add a new book to the library
  try {
    // Log the bookData to verify its structure
    const response = await axios.post(BOOKS_API, {
      query: Queries.ADD_NEW_BOOK,
      variables: {
        book: {
          isbn: bookData.isbn,
          title: bookData.title,
          authorId: bookData.authorId,
          Genre: bookData.genre,
          publisher: bookData.publisher,
          publishedYear: bookData.publishedYear,
          language: bookData.language,
          shelfLocation: bookData.shelfLocation,
          available: bookData.available,
        },
      },
    });
    console.log("AddNewBook response:", response);
    return response.status === 200;
  } catch (error) {
    console.error("Error adding new book:", error);
    return false;
  }
};

export const GetAllAuthors = async (): Promise<
  { id: string; name: string }[]
> => {
  // Fetch all authors from the API
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.GET_ALL_AUTHORS,
    });
    const authors = response.data?.data?.GetAuthors || [];
    return authors;
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
};

export const UpdateBook = async (bookData: BookInput): Promise<boolean> => {
  // Update book details
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.UPDATE_BOOK,
      variables: {
        isbn: bookData.isbn,
        book: {
          isbn: bookData.isbn,
          title: bookData.title,
          authorId: bookData.authorId,
          Genre: bookData.genre,
          publisher: bookData.publisher,
          publishedYear: bookData.publishedYear,
          language: bookData.language,
          shelfLocation: bookData.shelfLocation,
          available: bookData.available,
        },
      },
    });
    console.log("UpdateBook response:", response);
    return response.status === 200;
  } catch (error) {
    console.error("Error updating book:", error);
    return false;
  }
};

export const DeleteBook = async (isbn: string): Promise<boolean> => {
  // Delete a book by its ISBN
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.DELETE_BOOK,
      variables: {
        isbn: isbn,
      },
    });
    console.log("DeleteBook response:", response);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting book:", error);
    return false;
  }
};

export const AddAuthor = async (name: string): Promise<boolean> => {
  // Add a new author
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.ADD_AUTHOR,
      variables: {
        name: name,
      },
    });
    console.log("AddAuthor response:", response);
    return response.data?.data?.AddAuthor || "";
  } catch (error) {
    console.error("Error adding author:", error);
    return false;
  }
};

export const ChangeBookAvailability = async (
  isbn: string
): Promise<boolean> => {
  // Toggle book availability
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.CHANGE_BOOK_AVAILABILITY,
      variables: {
        isbn: isbn,
      },
    });
    console.log("ChangeBookAvailability response:", response);
    return response.status === 200;
  } catch (error) {
    console.error("Error changing book availability:", error);
    return false;
  }
};

export const GetRequestedBooks = async (): Promise<RequestedBook[]> => {
  // Fetch all requested books along with member names
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.GET_REQUESTED_BOOKS,
    });
    const requests = response.data?.data?.GetRequestedBooks || [];

    // Enrich requests with member names
    const requestsWithMemberNames = await Promise.all(
      requests.map(async (request: any) => {
        // Remove "M" prefix and convert to number (M003 -> 3)
        const memberId = parseInt(request.memberId.replace(/^M/, ""), 10);
        const memberName = await FetchNamebyId(memberId);

        return {
          ...request,
          memberName: memberName || request.memberId,
        };
      })
    );
    return requestsWithMemberNames;
  } catch (error) {
    console.error("Error fetching requested books:", error);
    return [];
  }
};

export const ProcessBookRequest = async (
  requestId: number,
  isApproved: boolean
): Promise<boolean> => {
  // Process a book request (approve/reject)
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.PROCESS_BOOK_REQUEST,
      variables: {
        requestId: requestId,
        isApproved: isApproved,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const GetBookTitleByISBN = async (isbn: string): Promise<string> => {
  // Fetch book title by its ISBN
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.GET_BOOK_TITLE_BY_ISBN,
      variables: { isbn },
    });
    return response.data?.data?.GetBookByISBN?.title || "N/A";
  } catch (error) {
    console.error("Error fetching book title by ISBN:", error);
    return "N/A";
  }
};

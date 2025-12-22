import { endpoints } from "../config/endPoints";
import axios from "axios";
import Queries from "../GraphQL/Books.queries";
import { Book } from "../utils/interfaces";

const token = sessionStorage.getItem("GTNLibrary") || "";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// API endpoint for books operations
const BOOKS_API = endpoints.baseUrl + "books";

interface NewBookRequest {
 title: string
  author: string
  reason: string
  memberId: string
}

/**
 * Fetches all books from the library
 * @returns Promise<Book[]> - Array of all available books
 */
export const FetchAllBooks = async (): Promise<Book[]> => {
  /* */
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.GET_ALL_BOOKS,
    });
    
    const books = response.data?.data?.GetAllBooks || [];
    
    // Transform the API response into Book objects
    return books.map((book: any): Book => ({
      isbn: book.isbn,
      title: book.title,
      author: book.author.name,
      category: book.Genre,
      publisher: book.publisher,
      publishedYear: book.publishedYear,
      language: book.language,
      shelfLocation: book.shelfLocation,
      available: book.available,
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

/**
 * Submits a request for a new book to be added to the library
 * @param bookData - The new book request details (title, author, reason, memberId)
 * @returns Promise<any> - The API response containing the request status
 * @throws Error if the request fails
 */
export const NewBookRequest = async (bookData: NewBookRequest) => {
  try {
    const response = await axios.post(BOOKS_API, {
      query: Queries.REQUEST_NEW_BOOK,
      variables: { request: bookData },
    });
    return response.data;
  } catch (error) {
    console.error("Error requesting new book:", error);
    throw error;
  }
};

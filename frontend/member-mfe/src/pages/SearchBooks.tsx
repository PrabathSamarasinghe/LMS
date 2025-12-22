import { useEffect, useState } from "react";
import { GridParcel } from "@gtn/utility";
import RequestNewBooks from "../components/RequestNewBooks";
import { FetchAllBooks } from "../services/BookAPIs";
import { Book } from "../utils/interfaces";
import { SearchBookColDefs } from "../utils/ColDefs";

const SearchBooks = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [requestNewBooksClicked, setRequestNewBooksClicked] = useState(false);
  const [rowData, setRowData] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await FetchAllBooks();
        setRowData(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const filterBooks = (books: any[]) => {
    return books.filter((book) => {
      const titleMatch = (book.title || "")
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const authorMatch = (book.author || "")
        .toLowerCase()
        .includes(searchAuthor.toLowerCase());
      const categoryMatch = (book.category || "")
        .toLowerCase()
        .includes(searchCategory.toLowerCase());
      return titleMatch && authorMatch && categoryMatch;
    });
  };

  return (
    <div className="w-full">
      <div className="flex gap-4 w-full mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white flex-1">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <svg
            className="w-4 h-4 text-gray-400 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white flex-1">
          <input
            type="text"
            placeholder="Search by Author"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <svg
            className="w-4 h-4 text-gray-400 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white flex-1">
          <input
            type="text"
            placeholder="Search by Category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <svg
            className="w-4 h-4 text-gray-400 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={() => {
            setSearchTitle("");
            setSearchAuthor("");
            setSearchCategory("");
          }}
        >
          Clear Filters
        </button>

        <button
          className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={() => {
            setRequestNewBooksClicked(!requestNewBooksClicked);
          }}
        >
          Request New Books
        </button>
      </div>
      <GridParcel
        key={`${searchTitle}-${searchAuthor}-${searchCategory}-${rowData.length}`}
        rowData={filterBooks(rowData)}
        colDefs={SearchBookColDefs}
      />

      {requestNewBooksClicked && (
        <RequestNewBooks
          setRequestNewBooksClicked={setRequestNewBooksClicked}
        />
      )}
    </div>
  );
};

export default SearchBooks;

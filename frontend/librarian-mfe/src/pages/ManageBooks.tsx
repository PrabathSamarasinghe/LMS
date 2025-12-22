import { useState, useMemo, useEffect } from "react";
import { GridParcel } from "@gtn/utility";
import { lazy } from "react";
import BookFilter from "../components/ManageBooksComponents/BookFilter";
import { FetchAllBooks } from "../service/BookAPI";
import { DeleteBook } from "../service/BookAPI";
import { Book } from "../utils/interfaces";

const RequestNewBooks = lazy(
  () => import("../components/ManageBooksComponents/RequestNewBooks")
);
const EditBookDetails = lazy(
  () => import("../components/ManageBooksComponents/EditBookDetails")
);
const AddBookDetails = lazy(
  () => import("../components/ManageBooksComponents/AddBookDetails")
);

const ManageBooks = () => {
  const [editBookDetailsClicked, setEditBookDetailsClicked] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [addBookDetailsClicked, setAddBookDetailsClicked] = useState(false);
  const [requestNewBooksClicked, setRequestNewBooksClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [rowData, setRowData] = useState<Book[]>([]);

  const handleDelete = async (book: Book) => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the book with ISBN: ${book.isbn}?`
    );
    if (confirmDelete) {
      const success = await DeleteBook(book.isbn);
      if (success) {
        setRowData((prevData) => prevData.filter((b) => b.isbn !== book.isbn));
        if (selectedBook?.isbn === book.isbn) {
          setSelectedBook(null);
        }
      } else {
        alert("Failed to delete the book. Please try again.");
      }
    }
  };

  const colDefs = [
    { headerName: "ISBN", field: "isbn", sortable: true, filter: true },
    { headerName: "Title", field: "title", sortable: true, filter: true },
    { headerName: "Author", field: "author", sortable: true, filter: true },
    { headerName: "Category", field: "category", sortable: true, filter: true },
    {
      headerName: "Published Year",
      field: "publishedYear",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Publisher",
      field: "publisher",
      sortable: true,
      filter: true,
    },
    { headerName: "Language", field: "language", sortable: true, filter: true },
    { headerName: "Shelf", field: "shelfLocation", sortable: true },
    {
      headerName: "Available",
      field: "available",
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => (params.value ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>),
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => (
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-black transition-colors duration-200 cursor-pointer"
            onClick={() => {
              setSelectedBook(params.data);
              setEditBookDetailsClicked(true);
            }}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            onClick={() => handleDelete(params.data)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filteredBooks = useMemo(() => {
    // Apply search and genre filter
    return rowData.filter((book) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        book.isbn.toLowerCase().includes(searchLower) ||
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      if (genreFilter !== "All" && book.category !== genreFilter) {
        return false;
      }

      return true;
    });
  }, [searchTerm, genreFilter, rowData]);

  useEffect(() => {
    // Fetch all books on component mount
    const fetchBooks = async () => {
      const books = await FetchAllBooks();
      setRowData(books);
    };
    fetchBooks();
  }, []);
  return (
    <div className="w-full bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-gray-800">Manage Books</h1>
        <div className="flex gap-1">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            onClick={() => setAddBookDetailsClicked(true)}
          >
            Add New Book
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            onClick={() => setRequestNewBooksClicked(true)}
          >
            View Book Requests
          </button>
        </div>
      </div>
      <BookFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
      />
      <GridParcel
        colDefs={colDefs}
        rowData={filteredBooks}
        key={`${searchTerm}-${genreFilter}-${rowData.length}`}
      />
      {editBookDetailsClicked && (
        <EditBookDetails
          book={selectedBook}
          setEditBookDetailsClicked={setEditBookDetailsClicked}
        />
      )}
      {addBookDetailsClicked && (
        <AddBookDetails setAddBookDetailsClicked={setAddBookDetailsClicked} />
      )}
      {requestNewBooksClicked && (
        <RequestNewBooks
          setRequestNewBooksClicked={setRequestNewBooksClicked}
        />
      )}
    </div>
  );
};

export default ManageBooks;

import { GridParcel } from "@gtn/utility";
import { useEffect, useState } from "react";
import RenewalCards from "../components/RenewalCards";
import { CreateRenewalRequest } from "../services/BorrowedAPI";
import { FetchBorrowedBooksByMemberId } from "../services/BorrowedAPI";
import { FetchReturnedBooksByMemberId } from "../services/BorrowedAPI";
import useAuth from "../hooks/useAuth";
import { BorrowedBook } from "../utils/interfaces";
import { ReturnedBookscolDefs } from "../utils/ColDefs";
const MyBooks = () => {
  const [isClicked, setIsClicked] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [renewReason, setRenewReason] = useState("");
  const [requestedDays, setRequestedDays] = useState("14");
  const [borrowedBooksData, setBorrowedBooksData] = useState<BorrowedBook[]>(
    []
  );
  const [returnedBooksData, setReturnedBooksData] = useState<BorrowedBook[]>(
    []
  );
  const auth = useAuth();
  const fetchBorrowedBooks = async () => {
    const books = await FetchBorrowedBooksByMemberId(auth.userId);
    setBorrowedBooksData(books);
  };

  const fetchReturnedBooks = async () => {
    const books = await FetchReturnedBooksByMemberId(auth.userId);
    setReturnedBooksData(books);
  };

  useEffect(() => {
    const ExecuteFunctions = async () => await Promise.all([
      fetchReturnedBooks(),
      fetchBorrowedBooks(),
    ]);
    ExecuteFunctions();
  }, [borrowedBooksData.length || returnedBooksData.length, auth.userId]);

  const borrowedBooksColDefs = [
    {
      headerName: "ISBN",
      field: "isbn",
      width: 120,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Title",
      field: "title",
      flex: 1,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Borrowed Date",
      field: "borrowDate",
      width: 140,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Due Date",
      field: "returnDate",
      width: 140,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Days Left",
      field: "daysLeft",
      width: 120,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Fine (LKR)",
      field: "fine.amount",
      width: 130,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "status",
      width: 110,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      field: "actions",
      width: 120,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => (
        <button
          className={`px-3 py-1 ${
            params.data.isRenewed
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          } text-white rounded-lg text-sm font-semibold transition-colors`}
          onClick={() => handleOpenDialog(params.data)}
          disabled={params.data.isRenewed}
        >
          {params.data.isRenewed ? "Renewed" : "Renew"}
        </button>
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenDialog = (book: any) => {
    setSelectedBook(book);
    setRenewReason("");
    setRequestedDays("14");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  const handleSubmitRenewal = async () => {
    if (!renewReason.trim()) {
      alert("Please provide a reason for renewal");
      return;
    }

    console.log("Renewal request submitted:", {
      id: selectedBook?.id,
      book: selectedBook?.title,
      reason: renewReason,
      requestedDays: requestedDays,
    });

    await CreateRenewalRequest(
      parseInt(selectedBook?.id),
      renewReason,
      parseInt(requestedDays)
    );

    alert("Renewal request submitted successfully!");
    handleCloseDialog();
  };

  const filterBooks = (books: Array<{ isbn: string; title: string }>) => {
    return books.filter(
      (book) =>
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center gap-4">
        <div className="flex gap-0 bg-gray-300 rounded-lg overflow-hidden">
          <button
            className={`px-6 py-2 font-semibold text-sm transition-all duration-300 ${
              isClicked
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-700 hover:opacity-90"
            }`}
            onClick={() => setIsClicked(true)}
          >
            Borrowed Books
          </button>
          <button
            className={`px-6 py-2 font-semibold text-sm transition-all duration-300 ${
              !isClicked
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-700 hover:opacity-90"
            }`}
            onClick={() => setIsClicked(false)}
          >
            Returned Books
          </button>
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white">
          <input
            type="text"
            placeholder="Search by ID or Title"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            onChange={(e) => handleChange(e)}
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
      </div>
      {!isClicked && (
        <GridParcel
          key={`returned-${searchTerm}-${returnedBooksData}`}
          rowData={filterBooks(returnedBooksData)}
          colDefs={ReturnedBookscolDefs}
        />
      )}
      {isClicked && (
        <>
          <GridParcel
            key={`borrowed-${searchTerm}-${borrowedBooksData}`}
            rowData={filterBooks(borrowedBooksData)}
            colDefs={borrowedBooksColDefs}
          />
        </>
      )}

      {/* Renewal Request Dialog */}
      <RenewalCards
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        selectedBook={selectedBook}
        requestedDays={requestedDays}
        setRequestedDays={setRequestedDays}
        renewReason={renewReason}
        setRenewReason={setRenewReason}
        handleSubmitRenewal={handleSubmitRenewal}
      />
    </div>
  );
};

export default MyBooks;

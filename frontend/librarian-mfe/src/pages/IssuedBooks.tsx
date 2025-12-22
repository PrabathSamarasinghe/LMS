import { useState, useMemo, useEffect } from "react";
import { GridParcel } from "@gtn/utility";
import { lazy } from "react";
import { GetAllIssuedBooks, PayFine } from "../service/IssueBooksAPI";

import IssuedBooksFilter from "../components/IssuedBooksComponents/IssuedBooksFilter";
const IssueNewBook = lazy(
  () => import("../components/IssuedBooksComponents/IssueNewBook")
);
const RenewalRequests = lazy(
  () => import("../components/IssuedBooksComponents/ReviewRenewRequests")
);
const ApproveReturn = lazy(
  () => import("../components/IssuedBooksComponents/ApproveReturn")
);

const IssuedBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRangeFilter, setDateRangeFilter] = useState("All");

  const [issueNewBookClicked, setIssueNewBookClicked] = useState(false);
  const [reviewRenewRequestsClicked, setReviewRenewRequestsClicked] =
    useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [approveReturnClicked, setApproveReturnClicked] = useState(false);
  const [rowData, setRowData] = useState<any[]>([]);

  const handleApproveReturn = (returnData: any) => {
    console.log("Return approved:", returnData);
    setApproveReturnClicked(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      const books = await GetAllIssuedBooks();      
      setRowData(books);
    };
    if (!approveReturnClicked) {
      fetchIssuedBooks();
    }
    fetchIssuedBooks();
  }, [approveReturnClicked]);

  const columnDefs = [
    { headerName: "ISBN", field: "isbn", sortable: true, filter: true },
    { headerName: "Title", field: "title", sortable: true, filter: true },
    {
      headerName: "Member ID",
      field: "memberId",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Member Name",
      field: "memberName",
      sortable: true,
      filter: true,
    },
    { headerName: "Issued Date", field: "issuedDate", sortable: true },
    { headerName: "Due Date", field: "dueDate", sortable: true },
    { headerName: "Returned Date", field: "returnedDate", sortable: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    { headerName: "Fine (LKR)", field: "fine" },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (props) => (
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={
              props.data.returnedDate && props.data.returnedDate !== "N/A"
            }
            onClick={() => {
              setSelectedBook(props.data);
              setApproveReturnClicked(true);
            }}
          >
            {!props.data.returnedDate || props.data.returnedDate === "N/A"
              ? "Return Book"
              : "Returned"}
          </button>

          {props.data.fine > 0 && (
            <button
              className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 "
              disabled={props.data.isPaid}
              onClick={async () => {
                await PayFine(props.data.id);
                alert("Fine paid successfully");
              }}
            >
              {!props.data.isPaid
                ? "Pay Fine"
                : "Paid"}
            </button>
          )}
        </div>
      ),
    },
  ];

  // Filter logic
  const filteredData = useMemo(() => {
    return rowData.filter((item) => {
      // Search filter (ISBN, Title, Member Name, Member ID)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        item.isbn.toLowerCase().includes(searchLower) ||
        item.title.toLowerCase().includes(searchLower) ||
        item.memberName.toLowerCase().includes(searchLower) ||
        item.memberId.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Status filter
      if (statusFilter !== "All" && item.status !== statusFilter) {
        return false;
      }

      // Date range filter
      if (dateRangeFilter !== "All") {
        const today = new Date();
        const dueDate = new Date(item.dueDate);

        // Overdue filter
        if (dateRangeFilter === "Overdue") {
          return (
            dueDate < today &&
            item.status !== "Returned" &&
            item.status !== "Returned (Late)"
          );
          // Due soon filter
        } else if (dateRangeFilter === "DueSoon") {
          const sevenDaysFromNow = new Date(
            today.getTime() + 7 * 24 * 60 * 60 * 1000 // seven days in milliseconds
          );
          return (
            dueDate <= sevenDaysFromNow && // Due within next 7 days
            dueDate >= today && // Due date is in the future
            item.status !== "Returned" &&
            item.status !== "Returned (Late)"
          );
        }
      }

      return true;
    });
  }, [searchTerm, statusFilter, dateRangeFilter, rowData.length]);

  return (
    <div className="w-full bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Issued Books</h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            onClick={() => setIssueNewBookClicked(true)}
          >
            Issue New Book
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            onClick={() => setReviewRenewRequestsClicked(true)}
          >
            View Renew Requests
          </button>
        </div>
      </div>

      <IssuedBooksFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
      />

      <GridParcel
        colDefs={columnDefs}
        rowData={filteredData}
        key={`${searchTerm}-${statusFilter}-${dateRangeFilter}-${rowData.length}`}
      />

      {issueNewBookClicked && (
        <IssueNewBook setIssueNewBookClicked={setIssueNewBookClicked} />
      )}

      {reviewRenewRequestsClicked && (
        <RenewalRequests
          setReviewRenewRequestsClicked={setReviewRenewRequestsClicked}
        />
      )}

      {approveReturnClicked && selectedBook && (
        <ApproveReturn
          open={approveReturnClicked}
          book={{
            id: selectedBook.id,
            isbn: selectedBook.isbn,
            title: selectedBook.title,
            memberName: selectedBook.memberName,
            memberId: selectedBook.memberId,
            dueDate: selectedBook.dueDate,
            borrowedDate: selectedBook.issuedDate,
            // Calculate days overdue
            daysOverdue: Math.max(
              0,
              Math.floor(
                (new Date(selectedBook.dueDate).getTime() -
                  new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              ) * -1
            ),
          }}
          onClose={() => {
            setApproveReturnClicked(false);
            setSelectedBook(null);
          }}
          onApprove={handleApproveReturn}
        />
      )}
    </div>
  );
};

export default IssuedBooks;

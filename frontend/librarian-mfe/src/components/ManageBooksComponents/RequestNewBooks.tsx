import { useState, useMemo, useEffect } from "react";
import { Alert, DialogTitle, Dialog, DialogContent } from "@mui/material";
import { lazy, Suspense } from "react";
import { GetRequestedBooks } from "../../service/BookAPI";
import { BookRequest } from "../../utils/interfaces";
import { RequestStatus } from "../../utils/enums";

const RequestCard = lazy(
  () => import("./RequestNewBooksComponents/RequestCard")
);
const RequestFilter = lazy(
  () => import("./RequestNewBooksComponents/RequestFilter")
);

const RequestNewBooks = ({
  setRequestNewBooksClicked,
}: {
  setRequestNewBooksClicked?: (value: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [bookRequests, setBookRequests] = useState<BookRequest[]>([]);
  const [isApprovedClicked, setIsApprovedClicked] = useState(false);

  useEffect(() => {
    const fetchBookRequests = async () => {
      const requests = await GetRequestedBooks();      
      
      const MappedRequests = requests.map((request: any) => ({
        id: request.id,
        memberId: request.memberId,
        memberName: request.memberName,
        title: request.title,
        author: request.author,
        isbn: request.isbn ? request.isbn : "N/A",
        requestDate: new Date(Number(request.createdAt)).toLocaleDateString(
          "en-GB"
        ),
        status: (request.isProcessed
          ? request.isApproved
            ? "Approved"
            : "Declined"
          : "Pending") as RequestStatus,
        reason: request.reason,
      }));
      setBookRequests(MappedRequests);
      setIsApprovedClicked(false);
    };
    if (isApprovedClicked) {
      fetchBookRequests();
    } else {
      fetchBookRequests();
    }
  }, [isApprovedClicked]);

  const filteredRequests = useMemo(() => {
    return bookRequests.filter((request) => {
      const searchLower = searchTerm.toLowerCase().trim();
      
      // If search term is provided, check if it matches any field
      if (searchLower !== "") {
        const matchesSearch =
          String(request.memberId).toLowerCase().includes(searchLower) ||
          String(request.memberName).toLowerCase().includes(searchLower) ||
          String(request.isbn).toLowerCase().includes(searchLower) ||
          String(request.title).toLowerCase().includes(searchLower) ||
          String(request.id).toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Apply status filter
      if (statusFilter !== "All" && request.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [searchTerm, statusFilter, bookRequests]);

  return (
    <Dialog open={true} maxWidth="lg" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        Review Book Requests
      </DialogTitle>
      <button
        onClick={() =>
          setRequestNewBooksClicked && setRequestNewBooksClicked(false)
        }
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 duration-200 cursor-pointer transition-colors"
      >
        X
      </button>
      <DialogContent className="pt-1">
        <Suspense
          fallback={
            <div className="text-xs text-gray-500">Loading filters...</div>
          }
        >
          <RequestFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            filteredRequests={filteredRequests}
            bookRequests={bookRequests}
          />
        </Suspense>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredRequests.length === 0 ? (
            <Alert severity="info">No book requests found</Alert>
          ) : (
            <Suspense
              fallback={
                <div className="text-xs text-gray-500">Loading requests...</div>
              }
            >
              {filteredRequests.map((request) => (
                <RequestCard key={request.id} request={request} setIsApprovedClicked={setIsApprovedClicked} />
              ))}
            </Suspense>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestNewBooks;

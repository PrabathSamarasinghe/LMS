import { useState, useMemo, useEffect } from "react";
import { Alert, DialogTitle, Dialog, DialogContent } from "@mui/material";
import { lazy } from "react";
import { GetAllRenewalRequests } from "../../service/IssueBooksAPI";

const RequestCard = lazy(() => import("./RenewRequestComponents/RequestCard"));
const RequestFilter = lazy(() => import("./RenewRequestComponents/RequestFilter"));

const ReviewRenewRequests = ({
  setReviewRenewRequestsClicked,
}: {
  setReviewRenewRequestsClicked?: (value: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [renewalRequests, setRenewalRequests] = useState<any[]>([]);
  const [isApprovedClicked, setIsApprovedClicked] = useState(false);
  useEffect(() => {
    const fetchRenewalRequests = async () => {
      const requests = await GetAllRenewalRequests();

      const MappedRequests = await Promise.all(requests.map(async (request: any) => {
        return {
          id: request.id,
          memberId: request.memberId,
          memberName: request.memberName,
          isbn: request.isbn,
          title: request.title,
          issuedDate: request.borrowDate,
          originalDueDate: request.returnDate,
          requestedDueDate: request.requestedDueDate,
          requestDate: request.createdAt,
          status: (request.isProcessed
            ? request.isApproved
              ? "Approved"
              : "Rejected"
            : "Pending") as "Pending" | "Approved" | "Rejected",
          reason: request.reason,
        };
      }));
      setRenewalRequests(MappedRequests);
    };
    if(isApprovedClicked){
      fetchRenewalRequests();
      setIsApprovedClicked(false);
    } else {
      fetchRenewalRequests();
    }
  }, [isApprovedClicked]);

  const filteredRequests = useMemo(() => {
    return renewalRequests.filter((request) => {
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
  }, [searchTerm, statusFilter, renewalRequests]);

  return (
    <Dialog open={true} maxWidth="lg" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        Review Renewal Requests
      </DialogTitle>
      <button
        onClick={() =>
          setReviewRenewRequestsClicked && setReviewRenewRequestsClicked(false)
        }
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 duration-200 cursor-pointer transition-colors"
      >
        X
      </button>
      <DialogContent className="pt-1">
        <RequestFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filteredRequests={filteredRequests}
          renewalRequests={renewalRequests}
        />

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredRequests.length === 0 ? (
            <Alert severity="info">No renewal requests found</Alert>
          ) : (
            filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                setIsApprovedClicked={setIsApprovedClicked}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewRenewRequests;

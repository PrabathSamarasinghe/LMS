import { useState } from "react";
import { ProcessBookRequest } from "../../../service/BookAPI";
import { BookRequest } from "../../../utils/interfaces";


const RequestCard = ({ request, setIsApprovedClicked }: { request: BookRequest, setIsApprovedClicked: (value: boolean) => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await ProcessBookRequest(Number(request.id), true);
      setIsApprovedClicked(true);
      setIsLoading(false);
    }, 500);
  };

  const handleDecline = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await ProcessBookRequest(Number(request.id), false);
      setIsApprovedClicked(true);
      setIsLoading(false);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 border-green-200";
      case "Declined":
        return "bg-red-50 border-red-200";
      case "Pending":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-700";
      case "Declined":
        return "text-red-700";
      case "Pending":
        return "text-yellow-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className={`p-3 rounded border ${getStatusColor(request.status)}`}>
      {/* Header with Status */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-xs font-bold text-gray-800">{request.title}</h4>
          <p className="text-xs text-gray-600">Request ID: {request.id}</p>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${getStatusTextColor(
            request.status
          )}`}
        >
          {request.status}
        </span>
      </div>

      {/* Member and Book Info */}
      <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
        <div>
          <p className="text-gray-600">
            Member: <span className="font-semibold">{request.memberName}</span>
          </p>
          <p className="text-gray-600">
            ISBN: <span className="font-semibold">{request.isbn}</span>
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            Author: <span className="font-semibold">{request.author}</span>
          </p>
          <p className="text-gray-600">
            Request Date:{" "}
            <span className="font-semibold">{request.requestDate}</span>
          </p>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-2 text-xs">
        <p className="text-gray-600">
          Reason: <span className="italic">{request.reason}</span>
        </p>
      </div>

      {/* Actions - Only show for Pending */}
      {request.status === "Pending" && (
        <div className="flex gap-2">
          <button
            onClick={handleApprove}
            disabled={isLoading}
            className="flex-1 px-2 py-1 bg-green-500 text-white rounded text-xs font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Approve"}
          </button>
          <button
            onClick={handleDecline}
            disabled={isLoading}
            className="flex-1 px-2 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Decline"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;

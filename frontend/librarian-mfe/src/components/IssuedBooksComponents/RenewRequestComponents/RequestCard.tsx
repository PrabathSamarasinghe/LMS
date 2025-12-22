import { ApproveRenewalRequest } from "../../../service/IssueBooksAPI";

const RequestCard = ({ request, setIsApprovedClicked }) => {

  // Helper functions to get status colors
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "text-green-700";
      case "Rejected":
        return "text-red-700";
      case "Pending":
        return "text-yellow-700";
      default:
        return "text-gray-700";
    }
  };
  
  // Helper function to get background and border colors
  const getStatusColor = (status: string) => {
      switch (status) {
        case "Approved":
          return "bg-green-50 border-green-200";
        case "Rejected":
          return "bg-red-50 border-red-200";
        case "Pending":
          return "bg-yellow-50 border-yellow-200";
        default:
          return "bg-gray-50 border-gray-200";
      }
    };

      const handleApprove = (id: string) => {
        console.log("Renewal approved:", id);
        ApproveRenewalRequest(Number(id), true);
        setIsApprovedClicked(true);
        alert("Renewal request approved!");
      };
    
      const handleReject = (id: string) => {
        console.log("Renewal rejected:", id);
        ApproveRenewalRequest(Number(id), false);
        setIsApprovedClicked(true);
        alert("Renewal request rejected!");
      };
    
  
  return (
    <div
      key={request.id}
      className={`p-3 rounded border ${getStatusColor(request.status)}`}
    >
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
            Issued: <span className="font-semibold">{request.issuedDate}</span>
          </p>
          <p className="text-gray-600">
            Request Date:{" "}
            <span className="font-semibold">{request.requestDate}</span>
          </p>
        </div>
      </div>

      {/* Due Dates */}
      <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
        <div className="bg-red-100 bg-opacity-50 p-2 rounded">
          <p className="text-gray-600">Original Due:</p>
          <p className="font-semibold text-red-700">
            {request.originalDueDate}
          </p>
        </div>
        <div className="bg-green-100 bg-opacity-50 p-2 rounded">
          <p className="text-gray-600">Requested Due:</p>
          <p className="font-semibold text-green-700">
            {request.requestedDueDate}
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
            onClick={() => handleApprove(request.id)}
            className="flex-1 px-2 py-1 bg-green-500 text-white rounded text-xs font-medium hover:bg-green-600 transition-colors duration-200 cursor-pointer"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(request.id)}
            className="flex-1 px-2 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors duration-200 cursor-pointer"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestCard;

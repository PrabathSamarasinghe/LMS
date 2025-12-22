import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
} from "@mui/material";
import { AcceptReturnBook } from "../../service/IssueBooksAPI";
import { ApproveReturnProps } from "../../utils/interfaces";
import { fines } from "../../utils/dummy";
import { BookCondition } from "../../utils/enums";

const ApproveReturn = ({
  open,
  book,
  onClose,
  onApprove,
}: ApproveReturnProps) => {
  const [bookCondition, setBookCondition] = useState<BookCondition>(BookCondition.GOOD);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const calculateFine = () => {
    if (!book) return 0;

    let fine = book.daysOverdue > 0 ? book.daysOverdue * fines.perDayFine : 0;

    if (bookCondition === "poor") {
      fine += fines.poorConditionFine;
    } else if (bookCondition === "fair") {
      fine += fines.fairConditionFine;
    }

    return fine;
  };

  const handleApprove = async () => {
    if (!book) return;

    setIsProcessing(true);
    setShowError(false);

    try {
      const returnData = {
        bookId: book.id,
        isbn: book.isbn,
        title: book.title,
        memberName: book.memberName,
        memberId: book.memberId,
        condition: bookCondition,
        daysOverdue: book.daysOverdue,
        fine: calculateFine(),
        returnedDate: new Date().toISOString().split("T")[0],
      };

      await AcceptReturnBook({
        borrowRecordId: returnData.bookId,
        isReturned: true,
        fine: {
          amount: returnData.fine,
          memberId: returnData.memberId,
          paid: false,
        },
      });

      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setIsProcessing(false);
        onApprove(returnData);
        onClose();
      }, 2000);
    } catch (error) {
      setShowSuccess(false);
      setShowError(true);
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setBookCondition(BookCondition.GOOD);
    setShowSuccess(false);
    setShowError(false);
    onClose();
  };

  const fine = calculateFine();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-base font-semibold text-gray-800">
        Approve Book Return
      </DialogTitle>
      <button
        onClick={handleClose}
        disabled={isProcessing}
        className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        X
      </button>
      <DialogContent className="pt-1">
        {showSuccess && (
          <Alert severity="success" className="mb-4">
            Book return approved successfully!
          </Alert>
        )}

        {showError && (
          <Alert severity="error" className="mb-4">
            Failed to approve return. Please try again.
          </Alert>
        )}
        {book && (
          <form className="space-y-1">
            {/* Book Details */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Book Title
              </label>
              <input
                type="text"
                value={book.title}
                disabled
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ISBN
              </label>
              <input
                type="text"
                value={book.isbn}
                disabled
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50"
              />
            </div>

            {/* Member Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Member
              </label>
              <input
                type="text"
                value={book.memberName}
                disabled
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50"
              />
            </div>

            {/* Overdue Info */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Days Overdue
                </label>
                <input
                  type="text"
                  value={book.daysOverdue > 0 ? book.daysOverdue : 0}
                  disabled
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50"
                />
              </div>

              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Book Condition
                </label>
                <select
                  value={bookCondition}
                  onChange={(e) => setBookCondition(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>

            {/* Fine Summary */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Fine Amount
              </label>
              <input
                type="text"
                value={`LKR ${fine}`}
                disabled
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50 font-semibold"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isProcessing}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex-1 px-3 py-1.5 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? "Processing..." : "Approve"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApproveReturn;

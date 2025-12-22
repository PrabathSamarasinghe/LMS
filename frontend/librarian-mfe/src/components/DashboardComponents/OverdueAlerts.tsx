import { Card, CardContent, Alert } from "@mui/material";
import { OverdueAlertsProps } from "../../utils/interfaces";

const OverdueAlerts = ({ books = [] }: OverdueAlertsProps) => {
  const handleContactMember = (memberId: string) => {
    alert(`Contact member ${memberId}`);
  };

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          Overdue Books Alert ({books.length})
        </h2>
        
        {books.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {books.map((book, idx) => (
              <div key={idx} className="bg-gray-100 border border-gray-300 rounded-lg p-3 flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold text-black text-sm">{book.title}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Member: <span className="font-semibold">{book.memberId}</span>
                  </p>
                  <p className="text-xs text-black font-bold mt-1">
                    {book.daysOverdue} day{book.daysOverdue > 1 ? "s" : ""} overdue
                  </p>
                </div>
                <button
                  onClick={() => handleContactMember(book.memberId)}
                  className="ml-2 px-3 py-1 bg-black text-white rounded text-xs font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Alert severity="success">No overdue books. Great job!</Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default OverdueAlerts;

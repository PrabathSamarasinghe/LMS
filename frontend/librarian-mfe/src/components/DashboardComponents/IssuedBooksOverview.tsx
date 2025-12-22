import { Card, CardContent } from "@mui/material";
import { IssuedBooksOverviewProps } from "../../utils/interfaces";

const IssuedBooksOverview = ({ displayBooks = [] }: IssuedBooksOverviewProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Issued Books Overview (Top 5)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Book</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Member</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayBooks.length > 0 ? (
                displayBooks.map((book) => (
                  <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 text-gray-800">{book.title || "Unknown"}</td>
                    <td className="py-3 px-3 text-gray-600">{book.memberId}</td>
                    <td className="py-3 px-3 text-gray-600">{new Date(parseInt(book.returnDate)).toLocaleDateString()}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded text-gray-700 bg-gray-100">
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 px-3 text-center text-gray-500">
                    No issued books
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssuedBooksOverview;

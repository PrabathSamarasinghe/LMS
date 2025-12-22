import { Card, CardContent } from "@mui/material";
import { CurrentBooksProps } from "../../utils/interfaces";

const CurrentBooks = ({ books = [] }: CurrentBooksProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-gray-100 text-gray-700";
      case "Overdue":
        return "bg-gray-300 text-black";
      case "Due Soon":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="bg-white border-0 shadow-sm mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">My Current Books</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Book Title
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Borrowed
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-800 font-semibold">
                      {book.title}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {book.borrowedDate}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{book.dueDate}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                          book.status
                        )}`}
                      >
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No books currently borrowed
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

export default CurrentBooks;

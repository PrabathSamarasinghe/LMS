import { Card, CardContent } from '@mui/material'
import { ReturnedBooksProps } from '../../utils/interfaces'

const ReturnedBooks = ({ books = [] }: ReturnedBooksProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Recently Returned Books</h2>
        <div className="overflow-x-auto text-center">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-4 py-3 font-semibold text-gray-700">Book Title</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Returned Date</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{book.title}</td>
                    <td className="px-4 py-3 text-gray-600">{book.returnedDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-3 text-center text-gray-500">
                    No returned books
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReturnedBooks

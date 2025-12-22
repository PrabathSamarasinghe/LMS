import { Card, CardContent } from '@mui/material'
import { RecommendedBooksProps } from '../../utils/interfaces'


const RecommendedBooks = ({ books = [] }: RecommendedBooksProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Recommended Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-black mb-1">{book.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{book.author}</p>
              <p className="text-xs text-gray-500 mb-3">{book.genre}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecommendedBooks

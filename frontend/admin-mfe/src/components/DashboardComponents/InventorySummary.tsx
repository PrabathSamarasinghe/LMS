import { Card, CardContent } from '@mui/material'
import { InventorySummaryProps } from '../../utils/interfaces'

const InventorySummary = ({ books }: InventorySummaryProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Book Inventory Summary</h2>
        <div className="space-y-4">
          {books.map((book, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">{book.category}</span>
                <span className="text-sm font-bold text-black">{book.count} books</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full transition-all"
                  style={{ width: `${book.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default InventorySummary

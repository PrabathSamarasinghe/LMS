import { Card, CardContent } from '@mui/material'
import { OverdueAlertsProps } from '../../utils/interfaces'


const OverdueAlerts = ({ books = [] }: OverdueAlertsProps) => {
  if (books.length === 0) return null

  return (
    <Card className="bg-white border-0 shadow-sm mb-6">
      <CardContent className="p-4 border-l-4 border-black">
        <h2 className="text-lg font-bold text-black mb-4">Overdue Books Alert</h2>
        <div className="space-y-3">
          {books.map((book, idx) => (
            <div key={idx} className="bg-gray-100 p-3 rounded-lg border border-gray-300">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-black">{book.title}</p>
                  <p className="text-xs text-gray-600">Due: {book.dueDate}</p>
                </div>
                <span className="bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded">{book.daysOverdue} days overdue</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-black text-white px-3 py-1 rounded text-xs font-semibold hover:bg-gray-800 transition-colors">
                  Renew Now
                </button>
                <button className="flex-1 bg-gray-700 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-black transition-colors">
                  Contact Librarian
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default OverdueAlerts

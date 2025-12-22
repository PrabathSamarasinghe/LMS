import { Card, CardContent } from '@mui/material'
import { FineCollectionProps } from '../../utils/interfaces'

const FineCollection = ({ fines, totalThisMonth }: FineCollectionProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Fine Collection Summary</h2>
        <div className="mb-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
          <p className="text-xs text-gray-700 mb-1">Total Fines (This Month)</p>
          <p className="text-3xl font-bold text-black">LKR {totalThisMonth.toLocaleString()}</p>
        </div>
        <div className="space-y-3">
          {fines.map((fine, idx) => (
            <div key={idx} className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-sm text-gray-700 font-semibold">{fine.period}</span>
              <span className="text-sm font-bold text-black">LKR {fine.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default FineCollection

import { Card, CardContent } from '@mui/material'
import { IssuingSummaryProps } from '../../utils/interfaces'

const IssuingSummary = ({ items }: IssuingSummaryProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Book Issuing Summary (Today)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {items.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-300">
              <p className="text-xs text-gray-700 mb-2">{item.label}</p>
              <p className="text-3xl font-bold text-black">{item.count}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default IssuingSummary

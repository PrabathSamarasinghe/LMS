import { Card, CardContent } from '@mui/material'
import { StatCardProps } from '../../utils/interfaces'

const StatCard = ({ title, value, description }: StatCardProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4 border-l-4 border-black">
        <p className="text-xs font-semibold text-gray-700 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-black mb-1">{value}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

export default StatCard

import { Card, CardContent } from '@mui/material'
import { KPICardProps } from '../../utils/interfaces'

const KPICard = ({ title, value, trend }: KPICardProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4 border-l-4 border-black">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-black">{value}</h3>
            {trend && <p className="text-xs text-gray-600 mt-2">{trend}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default KPICard

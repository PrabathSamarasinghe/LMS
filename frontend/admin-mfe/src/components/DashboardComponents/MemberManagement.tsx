import { Card, CardContent } from '@mui/material'
import { MemberManagementProps } from '../../utils/interfaces'
const MemberManagement = ({ items }: MemberManagementProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Member Management Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item, idx) => (
            <div key={idx} className={`${item.bgColor} p-4 rounded-lg border border-gray-300`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-700 mb-1">{item.label}</p>
                  <p className="text-2xl font-bold text-black">{item.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default MemberManagement

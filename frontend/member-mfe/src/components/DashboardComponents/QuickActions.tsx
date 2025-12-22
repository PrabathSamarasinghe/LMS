import { Card, CardContent } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { QuickActionsProps } from '../../utils/interfaces'

const QuickActions = ({ actions }: QuickActionsProps) => {
  const navigate = useNavigate()
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className="bg-black text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors flex flex-col items-center gap-2"
              onClick={() => {
                if (action.url) {
                  navigate(action.url)
                }
              }}
            >
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions

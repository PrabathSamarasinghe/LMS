import { Card, CardContent } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { QuickActionsProps } from '../../utils/interfaces'

const QuickActions = ({ actions, onAction }: QuickActionsProps) => {
  const navigate = useNavigate()
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                onAction?.(action.label)
                if (action.url) navigate(action.url)
              }}
              className={`${action.color} text-white px-4 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex flex-col items-center gap-2`}
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

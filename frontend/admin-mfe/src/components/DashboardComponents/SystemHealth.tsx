import { Card, CardContent } from '@mui/material'
import { SystemHealthProps } from '../../utils/interfaces'

const SystemHealth = ({ configs }: SystemHealthProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">System Health & Configuration</h2>
        <div className="space-y-3">
          {configs.map((config, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-800">{config.label}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${config.statusColor}`}>
                {config.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SystemHealth

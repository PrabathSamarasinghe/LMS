import { Card, CardContent } from '@mui/material'
import { Severity } from '../../utils/enums'
import { AlertsProps } from '../../utils/interfaces'

const Alerts = ({ alerts }: AlertsProps) => {
  // Function to get color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case Severity.HIGH:
        return 'border-l-4 border-gray-600 bg-gray-200'
      case Severity.MEDIUM:
        return 'border-l-4 border-gray-500 bg-gray-100'
      case Severity.LOW:
        return 'border-l-4 border-gray-400 bg-gray-50'
      default:
        return 'border-l-4 border-gray-300 bg-gray-50'
    }
  }

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">System Alerts</h2>
        <div className="space-y-2">
          {alerts.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-4">No alerts at this time</p>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black">{alert.title}</p>
                    <p className="text-xs text-gray-700 mt-1">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Alerts

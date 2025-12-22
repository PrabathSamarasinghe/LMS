// This component renders a system activity log table within a styled card.
// It accepts an array of activity objects as props and displays their details in a tabular format.

 /**
  * ActivityLog Component
  * 
  * @param {Object} props - Component props
  * @param {Array} props.activities - List of activity log entries, each containing time, user, action, and details.
  * 
  * @returns {JSX.Element} A styled card containing a table of system activity logs.
  */
import { Card, CardContent } from '@mui/material'
import { ActivityLogProps } from '../../utils/interfaces'

const ActivityLog = ({ activities }: ActivityLogProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">System Activity Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Time</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">User</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-semibold">{activity.time}</td>
                  <td className="px-4 py-3 text-gray-700">{activity.user}</td>
                  <td className="px-4 py-3 text-gray-700">{activity.action}</td>
                  <td className="px-4 py-3 text-gray-600">{activity.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityLog

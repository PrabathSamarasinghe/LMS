import { Card, CardContent } from '@mui/material'
import { LibrarianOverviewProps } from '../../utils/interfaces'


const LibrarianOverview = ({ librarians }: LibrarianOverviewProps) => {
  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-gray-100 text-gray-700' : 'bg-gray-200 text-gray-800'
  }

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-black mb-4">Librarian & Staff Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Books Handled</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {librarians.map((lib) => (
                <tr key={lib.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 font-semibold">{lib.name}</td>
                  <td className="px-4 py-3 text-gray-700">{lib.email}</td>
                  <td className="px-4 py-3 text-gray-700">{lib.booksHandled}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(lib.status)}`}>
                      {lib.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default LibrarianOverview

import { Card, CardContent } from '@mui/material'
import { WelcomeHeaderProps } from '../../utils/interfaces'


const WelcomeHeader = ({ memberName, memberId, membershipType }: WelcomeHeaderProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm mb-6 border-l-4 border-black">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Welcome, {memberName}</h1>
            <div className="space-y-1">
              <p className="text-gray-700"><span className="font-semibold">Membership ID:</span> {memberId}</p>
              <p className="text-gray-700"><span className="font-semibold">Type:</span> {membershipType}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WelcomeHeader

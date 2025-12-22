import { Card, CardContent } from "@mui/material";
import { PendingActionsProps } from "../../utils/interfaces";
import { pendingActionsDummy } from "../../utils/dummy";

const PendingActions = ({ renewals = [], pendingCounts = { pendingRenewals: 0, unpaidFines: 0, pendingBookRequests: 0 } }: PendingActionsProps) => {

  const pendingActions = [
    { id: "1", title: "Books Need Renewal Approval", count: renewals.filter(renewal => !renewal.isApproved).length, color: "bg-gray-100", icon: "🔄" },
    { id: "2", title: "New Members Need Verification", count: pendingActionsDummy.newMemberVerifications, color: "bg-gray-100", icon: "👤" },
    { id: "3", title: "Books Reserved for Pickup", count: pendingActionsDummy.booksReservedForPickup, color: "bg-gray-200", icon: "📦" },
    { id: "4", title: "Pending Book Requests", count: pendingCounts.pendingBookRequests, color: "bg-gray-100", icon: "📚" },
    { id: "5", title: "Fine Payments Due", count: pendingCounts.unpaidFines, color: "bg-gray-200", icon: "💳" },
    { id: "6", title: "Pending Renewals", count: pendingCounts.pendingRenewals, color: "bg-gray-100", icon: "🔄" },
  ];

  return (
    <Card className="bg-white border-0 shadow-sm h-full">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Pending Actions</h2>
        <div className="space-y-2">
          {pendingActions.map((action) => (
            <div key={action.id} className={`${action.color} p-3 rounded-lg border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <p className="text-xs font-semibold text-gray-700">{action.title}</p>
                </div>
                <span className="bg-black text-white px-2.5 py-1 rounded-full text-xs font-bold">
                  {action.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingActions;

import { Card, CardContent } from "@mui/material";
import { RecentActivitiesProps, Activity } from "../../utils/interfaces";

const RecentActivities = ({ activities = [] }: RecentActivitiesProps) => {
  // Format activity description based on type
  const formatDescription = (activity: Activity) => {
    // Customize descriptions based on activity type
    switch (activity.type) {
      case "issue":
        return `Book '${activity.data.title || "Unknown"}' issued to ${activity.data.memberId}`; // Use title if available
      case "renewal":
        return `Renewal request for ${activity.data.requestedDays} days`; // Simplified description
      case "return":
        return `Book returned by ${activity.data.memberId}`; // Use memberId
      default:
        return "Activity recorded"; // Fallback description
    }
  };

  const getActivityColor = (type: string) => {
    // Return different colors based on activity type
    switch (type) {
      case "return":
        return "border-l-4 border-gray-700 bg-gray-100";
      case "issue":
        return "border-l-4 border-gray-500 bg-gray-100";
      case "registration":
        return "border-l-4 border-black bg-gray-50";
      case "renewal":
        return "border-l-4 border-gray-600 bg-gray-100";
      default:
        return "border-l-4 border-gray-400 bg-gray-50";
    }
  };

  return (
    <Card className="bg-white border-0 shadow-sm mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {activities.length > 0 ? (
            activities.map((activity, idx) => (
              // Activity container with dynamic color
              <div key={idx} className={`p-3 rounded-lg ${getActivityColor(activity.type)} flex items-start gap-3`}> 
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{formatDescription(activity)}</p>
                  <p className="text-xs text-gray-600 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent activities</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;

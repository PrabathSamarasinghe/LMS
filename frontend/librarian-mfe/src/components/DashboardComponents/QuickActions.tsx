import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { actions } from "../../utils/dummy";

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <Card className="bg-white border-0 shadow-sm mb-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={`${action.color} text-white text-xs font-semibold py-2 px-3 rounded transition-colors duration-200 hover:shadow-md`}
              onClick={() => navigate(action.url)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;

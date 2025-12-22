import { Card, CardContent } from "@mui/material";
import { StatsCardProps } from "../../utils/interfaces";

const StatsCard = ({ title, value, trend, color }: StatsCardProps) => {
  const isTrendPositive = trend.startsWith("+");

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-4 border-l-4 border-black">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-black mb-2">{value}</h3>
            <p className={`text-xs font-semibold ${isTrendPositive ? "text-gray-700" : "text-gray-600"}`}>
              {trend} from last month
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

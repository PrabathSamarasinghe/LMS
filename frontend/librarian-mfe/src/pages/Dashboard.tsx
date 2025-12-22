import { lazy, useEffect, useState } from "react";
import {
  FetchLibrarianDashboardKPI,
  FetchIssuedBooksWithDetails,
  FetchOverdueBooks,
  FetchPendingRenewals,
  FetchRecentActivities,
  FetchPendingActionsCounts,
} from "../service/DashboardAPI";

const StatsCard = lazy(
  () => import("../components/DashboardComponents/StatsCard")
);
const IssuedBooksOverview = lazy(
  () => import("../components/DashboardComponents/IssuedBooksOverview")
);
const OverdueAlerts = lazy(
  () => import("../components/DashboardComponents/OverdueAlerts")
);
const Charts = lazy(() => import("../components/DashboardComponents/Charts"));
const PendingActions = lazy(
  () => import("../components/DashboardComponents/PendingActions")
);
const QuickActions = lazy(
  () => import("../components/DashboardComponents/QuickActions")
);
const RecentActivities = lazy(
  () => import("../components/DashboardComponents/RecentActivities")
);

const Dashboard = () => {
  // State for KPI metrics
  const [kpi, setKpi] = useState({
    totalBooks: 0,
    totalMembers: 0,
    issuedToday: 0,
    overdueBooks: 0,
    pendingRenewals: 0,
    newMembers: 0,
  });
  // State for various dashboard data
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [pendingRenewals, setPendingRenewals] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingActionsCounts, setPendingActionsCounts] = useState({
    pendingRenewals: 0,
    unpaidFines: 0,
    pendingBookRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch all dashboard data in parallel
        const [kpiData, issued, overdue, renewals, activities, pendingActions] =
          await Promise.all([
            FetchLibrarianDashboardKPI(),
            FetchIssuedBooksWithDetails(),
            FetchOverdueBooks(),
            FetchPendingRenewals(),
            FetchRecentActivities(),
            FetchPendingActionsCounts(),
          ]);

        // Update state with fetched data
        setKpi(kpiData);
        setIssuedBooks(issued);
        setOverdueBooks(overdue);
        setPendingRenewals(renewals);
        setRecentActivities(activities);
        setPendingActionsCounts(pendingActions);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);
  return (
    <div className="w-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-1">Welcome back, Librarian</p>
      </div>

      {/* Quick Stats / KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <StatsCard
          title="Total Books"
          value={kpi.totalBooks.toString()}
          trend={`+${Math.floor(kpi.totalBooks * 0.01)}`}
          color="bg-blue-50"
        />
        <StatsCard
          title="Total Members"
          value={kpi.totalMembers.toString()}
          trend={`+${Math.floor(kpi.totalMembers * 0.02)}`}
          color="bg-green-50"
        />
        <StatsCard
          title="Books Issued Today"
          value={kpi.issuedToday.toString()}
          trend={`+${Math.floor(kpi.issuedToday * 0.2)}`}
          color="bg-purple-50"
        />
        <StatsCard
          title="Overdue Books"
          value={kpi.overdueBooks.toString()}
          trend={`-${Math.max(1, Math.floor(kpi.overdueBooks * 0.1))}`}
          color="bg-red-50"
        />
        <StatsCard
          title="Pending Renewals"
          value={kpi.pendingRenewals.toString()}
          trend={`+${Math.floor(kpi.pendingRenewals * 0.15)}`}
          color="bg-yellow-50"
        />
        <StatsCard
          title="New Members"
          value={kpi.newMembers.toString()}
          trend={`+${Math.floor(kpi.newMembers * 0.3)}`}
          color="bg-indigo-50"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Issued Books and Overdue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issued Books Overview */}
          <IssuedBooksOverview displayBooks={issuedBooks.slice(0, 5)} />

          {/* Overdue Alerts */}
          <OverdueAlerts books={overdueBooks} />
        </div>

        {/* Right Column - Pending Actions */}
        <div>
          <PendingActions renewals={pendingRenewals} pendingCounts={pendingActionsCounts} />
        </div>
      </div>

      {/* Recent Activities */}
      <RecentActivities activities={recentActivities} />

      {/* Charts Section */}
      <Charts />
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from 'react'
import KPICard from '../components/DashboardComponents/KPICard'
import ActivityLog from '../components/DashboardComponents/ActivityLog'
import InventorySummary from '../components/DashboardComponents/InventorySummary'
import MemberManagement from '../components/DashboardComponents/MemberManagement'
import LibrarianOverview from '../components/DashboardComponents/LibrarianOverview'
import IssuingSummary from '../components/DashboardComponents/IssuingSummary'
import FineCollection from '../components/DashboardComponents/FineCollection'
import Alerts from '../components/DashboardComponents/Alerts'
import QuickActions from '../components/DashboardComponents/QuickActions'
import SystemHealth from '../components/DashboardComponents/SystemHealth'
import {
  FetchDashboardKPI,
  FetchActivityLog,
  FetchInventoryByGenre,
  FetchLibrariansOverview,
  FetchMemberStats,
  FetchIssuingStats,
  FetchFineCollectionStats,
} from '../service/DashboardAPI'
import { alerts, systemConfigs, quickActions } from '../utils/dummy'

const Dashboard = () => {
  // State management
  const [kpiData, setKpiData] = useState([]);
  const [activities, setActivities] = useState([])
  const [inventoryBooks, setInventoryBooks] = useState([])
  const [memberItems, setMemberItems] = useState([])
  const [librarians, setLibrarians] = useState([])
  const [issuingItems, setIssuingItems] = useState([])
  const [fineItems, setFineItems] = useState([])

  // Load all dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [kpi, activityLog, inventory, librarianData, memberStats, issuingStats, fineStats] = 
          await Promise.all([
            FetchDashboardKPI(),
            FetchActivityLog(),
            FetchInventoryByGenre(),
            FetchLibrariansOverview(),
            FetchMemberStats(),
            FetchIssuingStats(),
            FetchFineCollectionStats(),
          ])

        // Update KPI cards
        setKpiData([
          { title: 'Total Books', value: kpi.totalBooks.toString(), trend: 'in library' },
          { title: 'Total Members', value: kpi.totalMembers.toString(), trend: 'active' },
          { title: 'Total Librarians', value: kpi.totalLibrarians.toString(), trend: 'staff' },
          { title: 'Issued Today', value: kpi.issuedToday.toString(), trend: 'this session' },
          { title: 'Overdue Books', value: kpi.overdueBooks.toString(), trend: 'action needed' },
          { title: 'New Registrations', value: kpi.newRegistrations.toString(), trend: 'this month' },
        ])

        // Update activity log
        setActivities(activityLog)

        // Update inventory
        setInventoryBooks(inventory)

        // Update librarians
        setLibrarians(librarianData)

        // Update member items
        setMemberItems([
          { label: 'Pending Approval', count: memberStats.pendingApproval, bgColor: 'bg-gray-100' },
          { label: 'Unpaid Fines', count: memberStats.unpaidFines, bgColor: 'bg-gray-100' },
          { label: 'Overdue Books', count: memberStats.overdueBooks, bgColor: 'bg-gray-200' },
          { label: 'Recently Deactivated', count: memberStats.recentlyDeactivated, bgColor: 'bg-gray-150' },
        ])

        // Update issuing items
        setIssuingItems([
          { label: 'Issued Today', count: issuingStats.issuedToday },
          { label: 'Returned Today', count: issuingStats.returnedToday },
          { label: 'Renewals Today', count: issuingStats.renewalsToday },
        ])

        // Update fine items
        setFineItems([
          { period: 'Today', amount: fineStats.today },
          { period: 'This Week', amount: fineStats.thisWeek },
          { period: 'This Month', amount: fineStats.thisMonth },
        ])
      } catch (error) {
        console.error('Error loading dashboard:', error)
      }
    }

    loadDashboardData()
  }, [])

  return (
    <div className="w-full bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your system overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        {kpiData.map((kpi, idx) => (
          <KPICard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Top Alerts */}
      <div className="mb-6">
        <Alerts alerts={alerts} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Activity & Inventory */}
        <div className="lg:col-span-2 space-y-6">
          <ActivityLog activities={activities} />
          <InventorySummary books={inventoryBooks} />
        </div>

        {/* Right Column - Member & Issuing Overview */}
        <div className="space-y-6">
          <MemberManagement items={memberItems} />
          <IssuingSummary items={issuingItems} />
        </div>
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LibrarianOverview librarians={librarians} />
        <FineCollection fines={fineItems} totalThisMonth={fineItems.find(fine => fine.period === 'This Month')?.amount || 0} />
      </div>

      {/* System Health */}
      <div className="mb-6">
        <SystemHealth configs={systemConfigs} />
      </div>

      {/* Quick Actions */}
      <div>
        <QuickActions actions={quickActions} />
      </div>
    </div>
  )
}

export default Dashboard

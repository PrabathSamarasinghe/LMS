import { Severity } from "./enums";
const alerts = [
  {
    id: "1",
    title: "Books Overdue (30+ Days)",
    severity: Severity.HIGH,
    message: "5 books overdue for more than 30 days",
  },
  {
    id: "2",
    title: "Backup Status",
    severity: Severity.MEDIUM,
    message: "Last backup: 2 hours ago",
  },
  {
    id: "3",
    title: "Duplicate ISBNs Found",
    severity: Severity.HIGH,
    message: "ISBN 978-0061120084 appears twice in inventory",
  },
  {
    id: "4",
    title: "Member Flagged",
    severity: Severity.MEDIUM,
    message: "Member M012 flagged for multiple overdue returns",
  },
];

// Quick Actions
const quickActions = [
  { label: "Add Book", color: "bg-black" },
  { label: "Add Librarian", color: "bg-black", url: "/manage-librarians" },
  { label: "Register Member", color: "bg-black" },
  { label: "Manage Categories", color: "bg-gray-700" },
  { label: "View Transactions", color: "bg-gray-700" },
  { label: "Generate Reports", color: "bg-black", url: "/reports" },
];

// System Health
const systemConfigs = [
  {
    label: "Database Status",
    status: "Healthy",
    statusColor: "bg-gray-100 text-gray-700",
  },
  {
    label: "Backup Status",
    status: "Up to Date",
    statusColor: "bg-gray-100 text-gray-700",
  },
  {
    label: "System Notifications",
    status: "2 Active",
    statusColor: "bg-gray-200 text-gray-800",
  },
  {
    label: "MFE Configuration",
    status: "Configured",
    statusColor: "bg-gray-100 text-gray-700",
  },
];

export { alerts, quickActions, systemConfigs };

import { useEffect, useState } from "react";
import WelcomeHeader from "../components/DashboardComponents/WelcomeHeader";
import StatCard from "../components/DashboardComponents/StatCard";
import OverdueAlerts from "../components/DashboardComponents/OverdueAlerts";
import CurrentBooks from "../components/DashboardComponents/CurrentBooks";
import RecommendedBooks from "../components/DashboardComponents/RecommendedBooks";
import ReturnedBooks from "../components/DashboardComponents/ReturnedBooks";
import QuickActions from "../components/DashboardComponents/QuickActions";
import {
  FetchMemberProfile,
  FetchMemberStats,
  FetchCurrentBorrowedBooks,
  FetchOverdueBooks,
  FetchReturnedBooks,
  FetchRecommendedBooks,
} from "../services/DashboardAPI";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  // State
  const [memberProfile, setMemberProfile] = useState({
    fullname: "Loading...",
    id: 0,
    email: "",
    phone: "",
    address: "",
    type: "student",
    status: "active",
    membershipDate: "",
  });
  const [stats, setStats] = useState([
    { title: "Books Borrowed", value: "0", desc: "Currently" },
    { title: "Renewal Requests", value: "0", desc: "Pending" },
    { title: "Overdue Books", value: "0", desc: "Action needed" },
    { title: "Total Borrowed", value: "0", desc: "All-time" },
  ]);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!auth.userId || !auth.id) {
        console.log("Auth not ready yet, waiting...", auth);
        return;
      }

      try {
        setLoading(true);

        const [profile, statsData, borrowed, overdue, returned, recommended] =
          await Promise.all([
            FetchMemberProfile(auth.id),
            FetchMemberStats(auth.userId),
            FetchCurrentBorrowedBooks(auth.userId),
            FetchOverdueBooks(auth.userId),
            FetchReturnedBooks(auth.userId),
            FetchRecommendedBooks(),
          ]);
           

        if (profile) {
          setMemberProfile(profile);
        }

        setStats([
          {
            title: "Books Borrowed",
            value: statsData.booksBorrowed.toString(),
            desc: "Currently",
          },
          {
            title: "Renewal Requests",
            value: statsData.renewalsPending.toString(),
            desc: "Pending",
          },
          {
            title: "Overdue Books",
            value: statsData.overdueBooks.toString(),
            desc: "Action needed",
          },
          {
            title: "Total Borrowed",
            value: statsData.totalBorrowed.toString(),
            desc: "All-time",
          },
        ]);

        setCurrentBooks(borrowed);
        setOverdueBooks(overdue);
        setReturnedBooks(returned);
        setRecommendedBooks(recommended);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [auth.userId, auth.id]);

  // Quick actions
  const quickActions = [
    { label: "Search Books" , url: "/search-books"},
    { label: "View All Borrowed", url: "/my-books" },
    { label: "Borrowing History", url: "/my-books" },
    { label: "Edit Profile" , url: "/profile"},
    { label: "Contact Librarian" },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen p-6">
      <WelcomeHeader
        memberName={memberProfile.fullname}
        memberId={`M${memberProfile.id.toString().padStart(3, "0")}`}
        membershipType={memberProfile.type}
      />
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            description={stat.desc}
          />
        ))}
      </div>
      <OverdueAlerts books={overdueBooks} />
      <CurrentBooks books={currentBooks} />
      <RecommendedBooks books={recommendedBooks} />
      <ReturnedBooks books={returnedBooks} />
      <QuickActions actions={quickActions} />
    </div>
  );
};

export default Dashboard;

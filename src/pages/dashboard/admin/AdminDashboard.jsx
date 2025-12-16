import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    tickets: 0,
    bookings: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "SeatPao | Admin Dashboard";
    fetch(`${import.meta.env.VITE_API_URL}/dashboard/admin`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-medium">
        Loading admin dashboard...
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard Overview</h2>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users */}
        <div className="p-5 rounded-xl bg-primary/10 border border-primary/20 shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{stats.users}</p>
        </div>

        {/* Tickets */}
        <div className="p-5 rounded-xl bg-accent/10 border border-accent/20 shadow">
          <h3 className="text-lg font-semibold">Total Tickets</h3>
          <p className="text-3xl font-bold mt-2">{stats.tickets}</p>
        </div>

        {/* Bookings */}
        <div className="p-5 rounded-xl bg-info/10 border border-info/20 shadow">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">{stats.bookings}</p>
        </div>

        {/* Revenue */}
        <div className="p-5 rounded-xl bg-success/10 border border-success/20 shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">&#x09F3;{stats.revenue}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 bg-base-200 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
        <p className="opacity-70">More admin analytics coming soon...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;

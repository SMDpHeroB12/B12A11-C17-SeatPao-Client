import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/LoadingSpinner";

const VendorDashboard = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    tickets: 0,
    bookings: 0,
    revenue: 0,
  });

  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "SeatPao | Vendor DashBoard";
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/vendor/stats?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setRecentTickets(data.recent || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center text-xl py-10">
        Loading Vendor Dashboard...
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Vendor Dashboard Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-5 bg-primary/10 rounded-xl border border-primary/20 shadow">
          <h3 className="text-lg font-semibold">My Tickets</h3>
          <p className="text-3xl font-bold mt-2">{stats.tickets}</p>
        </div>

        <div className="p-5 bg-info/10 rounded-xl border border-info/20 shadow">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">{stats.bookings}</p>
        </div>

        <div className="p-5 bg-success/10 rounded-xl border border-success/20 shadow">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-3xl font-bold mt-2">৳{stats.revenue}</p>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Tickets</h3>

        {recentTickets.length === 0 ? (
          <p>No recent tickets found.</p>
        ) : (
          <ul className="space-y-3">
            {recentTickets.map((ticket) => (
              <li
                key={ticket._id}
                className="p-3 bg-base-100 rounded-lg shadow-sm"
              >
                <h4 className="font-semibold">{ticket.route}</h4>
                <p className="text-sm opacity-70">Price: ৳{ticket.price}</p>
                <p className="text-sm opacity-70">Transport: {ticket.type}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;

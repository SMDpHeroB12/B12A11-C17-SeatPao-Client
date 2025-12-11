import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/LoadingSpinner";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const RevenueOverview = () => {
  const { user } = useContext(AuthContext);

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch monthly revenue chart data
  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `${import.meta.env.VITE_API_URL}/vendor/revenue-overview?email=${
        user.email
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.monthly.map((item) => ({
          month:
            months[item._id.month] +
            " " +
            (item._id.year === new Date().getFullYear() ? "" : item._id.year),
          revenue: item.revenue,
          ticketsSold: item.ticketsSold,
        }));

        setChartData(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center text-xl py-10">
        Loading Revenue Overview...
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Revenue Overview</h2>

      {chartData.length === 0 ? (
        <p>No revenue data found.</p>
      ) : (
        <div className="space-y-10">
          {/* Revenue Line Chart */}
          <div className="bg-base-200 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tickets Sold Bar Chart */}
          <div className="bg-base-200 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">
              Tickets Sold Per Month
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar dataKey="ticketsSold" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueOverview;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AdminCharts = ({ stats }) => {
  const revenueData = [{ name: "Revenue", amount: stats.revenue }];

  const compareData = [
    { name: "Tickets", value: stats.tickets },
    { name: "Bookings", value: stats.bookings },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Revenue */}
      <div className="bg-base-100 p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line dataKey="amount" fill="#4f46e5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tickets vs Bookings */}
      <div className="bg-base-100 p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Tickets vs Bookings</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={compareData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminCharts;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RevenueOverview = () => {
  const { user } = useContext(AuthContext);

  const [payments, setPayments] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(
        `${import.meta.env.VITE_API_URL}/payments?vendor=${user.email}`
      ).then((res) => res.json()),

      fetch(`${import.meta.env.VITE_API_URL}/tickets`).then((res) =>
        res.json()
      ),
    ]).then(([paymentData, ticketData]) => {
      setPayments(paymentData);
      setTickets(ticketData.filter((t) => t.vendorEmail === user.email));
      setLoading(false);
    });
  }, [user.email]);

  if (loading) {
    return <p className="text-center py-10">Loading revenue...</p>;
  }

  // ================= CALCULATIONS =================
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const totalTicketsSold = payments.length;
  const totalTicketsAdded = tickets.length;

  const chartData = [
    {
      name: "Revenue",
      value: totalRevenue,
    },
    {
      name: "Tickets Sold",
      value: totalTicketsSold,
    },
    {
      name: "Tickets Added",
      value: totalTicketsAdded,
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Revenue Overview</h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-100 shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Revenue</p>
          <h3 className="text-3xl font-bold">৳ {totalRevenue}</h3>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Tickets Sold</p>
          <h3 className="text-3xl font-bold">{totalTicketsSold}</h3>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Tickets Added</p>
          <h3 className="text-3xl font-bold">{totalTicketsAdded}</h3>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueOverview;

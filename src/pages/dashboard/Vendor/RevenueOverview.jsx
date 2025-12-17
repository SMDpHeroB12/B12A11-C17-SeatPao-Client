import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/LoadingSpinner";
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
    document.title = "SeatPao | Revenue Overview";
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
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-center py-10">Loading Revenue...</p>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  // ================= CALCULATIONS =================
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const totalTicketsSold = payments.length;
  const totalTicketsAdded = tickets.length;

  const RevChartData = [
    {
      name: "Revenue",
      value: totalRevenue,
    },
  ];
  const chartData = [
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
      <div className="grid grid-cols-1 ">
        <div className="bg-base-100 shadow rounded-xl p-2 text-center">
          <p className="text-gray-500">Total Revenue</p>
          <h3 className="text-3xl font-bold">৳ {totalRevenue}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-base-100 shadow rounded-xl p-2 text-center">
          <p className="text-gray-500">Tickets Sold</p>
          <h3 className="text-3xl font-bold">{totalTicketsSold}</h3>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-2 text-center">
          <p className="text-gray-500">Tickets Added</p>
          <h3 className="text-3xl font-bold">{totalTicketsAdded}</h3>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="flex flex-col gap-8">
        <div className="bg-base-100 shadow rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={RevChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00ff7f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
    </div>
  );
};

export default RevenueOverview;

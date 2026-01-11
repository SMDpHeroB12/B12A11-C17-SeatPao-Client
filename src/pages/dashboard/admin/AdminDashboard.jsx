import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import AdminStats from "./AdminStats";
import AdminCharts from "./AdminCharts";
import AdminActivityTable from "./AdminActivityTable";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="py-20 text-center">
        <LoadingSpinner />
        <p className="mt-3 text-lg">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">Admin Dashboard Overview</h2>

      <AdminStats stats={stats} />
      <AdminCharts stats={stats} />
      <AdminActivityTable stats={stats} />
    </div>
  );
};

export default AdminDashboard;

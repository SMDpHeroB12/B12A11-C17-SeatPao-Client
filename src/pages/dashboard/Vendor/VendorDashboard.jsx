import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/LoadingSpinner";
import VendorStats from "./VendorStats";
import VendorCharts from "./VendorCharts";
import VendorRecentTable from "./VendorRecentTable";

const VendorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/vendor/stats?email=${user.email}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner />
        <p className="mt-3 text-lg">Loading Vendor Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">Vendor Dashboard Overview</h2>

      <VendorStats stats={data.stats} />
      <VendorCharts stats={data.stats} />
      <VendorRecentTable tickets={data.recent} />
    </div>
  );
};

export default VendorDashboard;

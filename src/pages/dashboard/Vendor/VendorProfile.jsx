import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const VendorProfile = () => {
  const { user } = useContext(AuthContext);
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    document.title = "SeatPao | Vendor Profile";
    if (!user?.email) return;
    fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setVendor(data || null));
  }, [user?.email]);

  if (!user)
    return <p className="py-10 text-center">Please login as vendor.</p>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Vendor Profile</h2>

      <div className="bg-base-200 p-6 rounded-xl shadow flex gap-6 items-center">
        <img
          src={vendor?.photo || user.photoURL || "/default-user.png"}
          alt="vendor"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-xl font-semibold">
            {vendor?.name || user.displayName || "Vendor"}
          </h3>
          <p className="opacity-70">{vendor?.email || user.email}</p>
          <p className="mt-2">
            <span className="badge badge-primary">
              {vendor?.role || "vendor"}
            </span>
          </p>
          {vendor?.fraudulent && (
            <p className="mt-2 text-sm text-red-600">⚠ Marked Fraud</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;

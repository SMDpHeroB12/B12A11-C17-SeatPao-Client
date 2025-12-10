import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const VendorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data.role);
        setChecking(false);
      });
  }, [user?.email]);

  if (loading || checking) return <div>Checking permission...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (role !== "vendor") {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-red-500">
        ❌ Access Denied — Vendors Only
      </div>
    );
  }

  return children;
};

export default VendorRoute;

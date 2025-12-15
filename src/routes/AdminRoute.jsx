import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setChecking(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data?.role);
        setChecking(false);
      });
  }, [user?.email]);

  if (loading || checking) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="min-h-screen flex justify-center items-center text-xl">
          Checking permission....
        </p>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // NOT ADMIN
  if (role !== "admin") {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
        ❌ Access Denied — Admins Only
      </div>
    );
  }

  // ADMIN → ALLOW ACCESS
  return children;
};

export default AdminRoute;

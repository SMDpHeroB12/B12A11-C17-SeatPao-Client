import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
        .then((res) => {
          setRole(res.data?.role || "user");
        })
        .catch(() => setRole("user"));
    }
  }, [user]);

  return role;
};

export default useUserRole;

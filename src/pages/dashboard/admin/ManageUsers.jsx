import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import default_user from "../../../assets/images/default_user.jpg";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "SeatPao | Manage Users";
    fetchUsers();
  }, []);

  const makeAdmin = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/users/make-admin/${id}`, {
      method: "PATCH",
    }).then(() => {
      toast.success("User promoted to Admin");
      fetchUsers();
    });
  };

  const makeVendor = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/users/make-vendor/${id}`, {
      method: "PATCH",
    }).then(() => {
      toast.success("User promoted to Vendor");
      fetchUsers();
    });
  };

  const markFraud = (id) => {
    if (!confirm("Mark this vendor as fraud? All tickets will be hidden."))
      return;

    fetch(`${import.meta.env.VITE_API_URL}/admin/users/fraud/${id}`, {
      method: "PATCH",
    }).then(() => {
      toast.error("Vendor marked as Fraud");
      fetchUsers();
    });
  };

  const deleteUser = (id) => {
    if (!confirm("Delete this user?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("User deleted");
      fetchUsers();
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-center py-10">Loading Users...</p>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
              <th>Make Vendor</th>
              <th>Fraud</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>

                <td>
                  <img
                    src={user.photoURL || default_user}
                    alt="user"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>

                <td>{user.displayName || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : user.role === "vendor"
                        ? "badge-accent"
                        : user.role === "fraud"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
                    {user.fraud ? "fraud" : user.role}
                  </span>
                </td>

                <td>
                  {user.role !== "admin" && (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      className="btn btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>

                <td>
                  {user.role !== "vendor" && (
                    <button
                      onClick={() => makeVendor(user._id)}
                      className="btn btn-info"
                    >
                      Make Vendor
                    </button>
                  )}
                </td>

                <td>
                  {user.role === "vendor" && !user.fraud && (
                    <button
                      onClick={() => markFraud(user._id)}
                      className="btn btn-warning"
                    >
                      Mark Fraud
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

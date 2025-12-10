import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Users
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Make Admin
  const makeAdmin = (email) => {
    Swal.fire({
      title: "Make Admin?",
      text: "This user will get admin permission.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/users/make-admin/${email}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              toast.success("User is now admin");
              setUsers((prev) =>
                prev.map((u) =>
                  u.email === email ? { ...u, role: "admin" } : u
                )
              );
            }
          });
      }
    });
  };

  // Make Vendor
  const makeVendor = (email) => {
    Swal.fire({
      title: "Make Vendor?",
      text: "This user will become a vendor.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/users/make-vendor/${email}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              toast.success("User role updated to Vendor");
              setUsers((prev) =>
                prev.map((u) =>
                  u.email === email ? { ...u, role: "vendor" } : u
                )
              );
            }
          });
      }
    });
  };

  // Mark Vendor as Fraud
  const markFraud = (email) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: "This vendor will be flagged as fraudulent.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Mark Fraud",
      confirmButtonColor: "#dc2626",
    }).then((res) => {
      if (res.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/users/fraud/${email}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              toast.success("Vendor marked as Fraud");

              setUsers((prev) =>
                prev.map((u) =>
                  u.email === email ? { ...u, role: "fraud" } : u
                )
              );
            }
          });
      }
    });
  };

  // Delete User
  const handleDelete = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#e11d48",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setUsers(users.filter((u) => u.email !== email));
              toast.success("User deleted successfully!");
            }
          });
      }
    });
  };

  if (loading) {
    return <p className="text-center text-xl py-10">Loading Users...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
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
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={user.photoURL || "/default-user.png"}
                      className="w-12 h-12 rounded-full border object-cover"
                    />
                  </td>

                  <td>{user.displayName || "No Name"}</td>
                  <td className="font-medium">{user.email}</td>

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
                      {user.role}
                    </span>
                  </td>

                  {/* Make Admin */}
                  <td>
                    <button
                      disabled={user.role === "admin"}
                      onClick={() => makeAdmin(user.email)}
                      className="btn btn-sm btn-primary"
                    >
                      Make Admin
                    </button>
                  </td>

                  {/* Make Vendor */}
                  <td>
                    <button
                      disabled={user.role === "vendor"}
                      onClick={() => makeVendor(user.email)}
                      className="btn btn-sm btn-accent"
                    >
                      Make Vendor
                    </button>
                  </td>

                  {/* Fraud Button */}
                  <td>
                    {user.role === "vendor" ? (
                      <button
                        onClick={() => markFraud(user.email)}
                        className="btn btn-sm btn-warning"
                      >
                        Mark Fraud
                      </button>
                    ) : (
                      <button className="btn btn-sm" disabled>
                        -
                      </button>
                    )}
                  </td>

                  {/* Delete */}
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

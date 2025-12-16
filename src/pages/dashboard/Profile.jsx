import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [role, setRole] = useState("user");
  const [loadingRole, setLoadingRole] = useState(true);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Logout failed!");
      });
  };

  // Fetch role from backend
  useEffect(() => {
    document.title = "SeatPao | My Profile";
    if (!user?.email) {
      setLoadingRole(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data?.role || "user");
      })
      .catch((err) => {
        console.error("Error fetching user role:", err);
      })
      .finally(() => setLoadingRole(false));
  }, [user?.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const current = auth.currentUser;
    if (!current) {
      toast.error("No authenticated user found.");
      setUpdating(false);
      return;
    }

    try {
      await updateProfile(current, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Profile updated successfully!");
      // Optionally: also update in your backend DB (not shown here)
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Failed to update profile. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return <p className="text-center py-10">Please login to view profile.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6 border border-gray-200 rounded-lg p-2">
        <h2 className="text-2xl font-bold">My Profile</h2>

        <button
          onClick={handleLogout}
          className="btn btn-error btn-sm text-white"
        >
          Logout
        </button>
      </div>

      {loadingRole ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-center py-10">Loading Profile...</p>
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : (
        <div className="bg-base-100 p-5 rounded-lg shadow-sm space-y-6">
          <div className="flex items-center gap-6">
            <img
              src={user?.photoURL || "/default-user.png"}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {user.displayName || "No name set"}
              </h3>
              <p className="text-sm opacity-70">{user.email}</p>
              <p className="mt-2">
                <span className="badge badge-primary">Role: {role}</span>
              </p>
              <p className="text-sm mt-3">
                Account Created:{" "}
                {user.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Photo URL</label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="input input-bordered w-full"
                placeholder="https://..."
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setName(user.displayName || "");
                  setPhoto(user.photoURL || "");
                }}
                disabled={updating}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;

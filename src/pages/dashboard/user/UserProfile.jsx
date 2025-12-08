import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const current = auth.currentUser;

    if (!current) {
      toast.error("No authenticated user found.");
      setLoading(false);
      return;
    }

    try {
      await updateProfile(current, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-base-100 p-5 rounded-lg shadow-sm">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user?.photoURL || "/default-user.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {user?.displayName || "No name set"}
            </h3>
            <p className="text-sm opacity-70">{user?.email}</p>
            <p className="mt-2">
              <span className="badge badge-primary">Role: User</span>
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
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                // reset to current user values
                setName(user?.displayName || "");
                setPhoto(user?.photoURL || "");
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

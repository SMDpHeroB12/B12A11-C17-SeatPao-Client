import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch User Bookings
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  // Cancel Booking
  const handleCancel = (id) => {
    if (!confirm("Cancel this booking?")) return;

    fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Booking cancelled!");
          setBookings(bookings.filter((b) => b._id !== id));
        }
      });
  };

  if (loading) {
    return <p className="text-xl text-center py-10">Loading bookings...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-5 bg-base-200 rounded-xl shadow space-y-2"
            >
              <h3 className="text-lg font-semibold">{b.ticketTitle}</h3>
              <p>Seats: {b.quantity}</p>
              <p>Total: ৳{b.total}</p>
              <p className="badge">{b.paid ? "Paid" : "Pending Payment"}</p>

              <div className="flex gap-3 mt-3">
                {!b.paid && (
                  <Link
                    to={`/payment/${b._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Pay Now
                  </Link>
                )}

                {!b.paid && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="btn btn-sm btn-error"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

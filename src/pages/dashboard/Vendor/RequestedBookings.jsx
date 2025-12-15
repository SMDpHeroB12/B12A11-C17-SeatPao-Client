import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const RequestedBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings, then filter vendor-wise
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/bookings?email=all`)
      .then((res) => res.json())
      .then((data) => {
        const vendorBookings = data.filter(
          (booking) => booking.vendorEmail === user.email
        );
        setBookings(vendorBookings);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load requested bookings");
        setLoading(false);
      });
  }, [user?.email]);

  const handleAccept = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/accept/${id}`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Booking accepted");
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "accepted" } : b))
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept booking");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/reject/${id}`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Booking rejected");
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "rejected" } : b))
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject booking");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading requests...</p>;
  }

  if (!bookings.length) {
    return (
      <p className="text-center py-10 text-gray-500">
        No booking requests yet.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Ticket</th>
              <th>User</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Departure</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.ticketTitle}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.quantity}</td>
                <td>৳{booking.totalPrice}</td>
                <td>
                  {booking.departureDate} {booking.departureTime}
                </td>
                <td>
                  <span
                    className={`badge ${
                      booking.status === "paid"
                        ? "badge-success"
                        : booking.status === "accepted"
                        ? "badge-info"
                        : booking.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(booking._id)}
                        className="btn btn-xs btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(booking._id)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {booking.status !== "pending" && (
                    <span className="text-sm opacity-60">No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user bookings
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load bookings");
        setLoading(false);
      });
  }, [user?.email]);

  // Countdown calculation
  const getCountdown = (date, time) => {
    const departure = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = departure - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Stripe checkout
  const handlePay = async (bookingId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        }
      );

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Payment session failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment error");
    }
  };

  if (loading) {
    return (
      <div>
        <p className="text-center py-10">Loading bookings...</p>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <p className="text-center py-10 text-gray-500">
        You have no bookings yet.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const countdown = getCountdown(
            booking.departureDate,
            booking.departureTime
          );

          const isExpired =
            new Date(`${booking.departureDate}T${booking.departureTime}`) <
            new Date();

          return (
            <div
              key={booking._id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-base-100 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{booking.ticketTitle}</h3>

                <img src={booking.ticketImage || booking.image} alt="" />

                <p className="text-sm opacity-70">
                  {booking.from} → {booking.to}
                </p>

                <p className="text-sm">
                  <strong>Quantity:</strong> {booking.quantity}
                </p>

                <p className="text-sm">
                  <strong>Total:</strong> ৳{booking.totalPrice}
                </p>

                <p className="text-sm">
                  <strong>Departure:</strong> {booking.departureDate}{" "}
                  {booking.departureTime}
                </p>

                {/* STATUS */}
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

                {/* COUNTDOWN */}
                {countdown && booking.status !== "rejected" && (
                  <p className="text-sm text-primary mt-2">⏳ {countdown}</p>
                )}

                {booking.status === "rejected" && (
                  <p className="text-sm text-red-500 mt-2">
                    ❌ Booking rejected by vendor
                  </p>
                )}
              </div>

              {/* PAY NOW */}
              {booking.status === "accepted" && !booking.paid && (
                <button
                  onClick={() => handlePay(booking._id)}
                  disabled={isExpired}
                  className={`btn btn-sm mt-4 ${
                    isExpired ? "btn-disabled" : "btn-primary"
                  }`}
                >
                  {isExpired ? "Expired" : "Pay Now"}
                </button>
              )}

              {booking.status === "paid" && (
                <Link
                  to="/dashboard/transactions"
                  className="btn btn-success btn-sm mt-4"
                >
                  View Transaction
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;

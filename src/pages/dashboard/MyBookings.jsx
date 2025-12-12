import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [ticketsMap, setTicketsMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Load bookings
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then(async (data) => {
        const arr = Array.isArray(data) ? data : [];
        setBookings(arr);

        // fetch related ticket details for each booking (to show image, route, departure)
        const uniqueTicketIds = [
          ...new Set(arr.map((b) => b.ticketId).filter(Boolean)),
        ];

        const map = {};
        await Promise.all(
          uniqueTicketIds.map(async (tid) => {
            try {
              const res = await fetch(
                `${import.meta.env.VITE_API_URL}/tickets/${tid}`
              );
              const t = await res.json();
              map[tid] = t;
            } catch (err) {
              map[tid] = null;
            }
          })
        );

        setTicketsMap(map);
      })
      .catch((err) => {
        console.error("Fetch bookings error:", err);
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Helper: calculate if departure passed
  const isDeparted = (ticket) => {
    if (!ticket) return false;
    let dep = null;
    if (ticket.date && ticket.time)
      dep = new Date(`${ticket.date}T${ticket.time}`);
    else if (ticket.departure) dep = new Date(ticket.departure);
    if (!dep) return false;
    return dep.getTime() <= Date.now();
  };

  // Create Checkout Session and redirect
  const handlePayNow = async (bookingId) => {
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
      if (data.url) {
        // redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Failed to create checkout session");
      }
    } catch (err) {
      console.error("Create session error:", err);
      toast.error("Server error creating checkout session");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (bookings.length === 0) {
    return <p className="text-center py-10">You have no bookings yet.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => {
          const t = ticketsMap[b.ticketId] || {};
          const departed = isDeparted(t);
          const showCountdown = !departed && b.status !== "rejected";
          // compute total (booking already has total)
          const total = b.total || (b.price || 0) * (b.quantity || 0);

          return (
            <div key={b._id} className="p-4 bg-base-200 rounded-xl shadow">
              <div className="flex gap-4">
                <img
                  src={t.image || "/default-ticket.jpg"}
                  alt={b.ticketTitle}
                  className="w-28 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{b.ticketTitle}</h3>
                  <p className="text-sm opacity-70">
                    {t.route || (t.from && t.to ? `${t.from} → ${t.to}` : "")}
                  </p>

                  <p className="text-sm mt-2">
                    Quantity: <span className="font-medium">{b.quantity}</span>
                  </p>

                  <p className="text-sm">
                    Total: <span className="font-medium">৳{total}</span>
                  </p>

                  <p className="text-sm mt-1">
                    Departure:{" "}
                    {t.date
                      ? `${t.date} ${t.time || ""}`
                      : t.departure
                      ? new Date(t.departure).toLocaleString()
                      : "TBD"}
                  </p>

                  <p className="mt-2">
                    Status:{" "}
                    <span
                      className={`badge ${
                        b.status === "paid"
                          ? "badge-success"
                          : b.status === "accepted"
                          ? "badge-primary"
                          : b.status === "rejected"
                          ? "badge-error"
                          : "badge-neutral"
                      }`}
                    >
                      {b.status || (b.paid ? "paid" : "pending")}
                    </span>
                  </p>

                  {/* Countdown */}
                  {showCountdown ? (
                    <Countdown ticket={t} />
                  ) : b.status === "rejected" ? (
                    <p className="text-sm opacity-70 mt-2">Booking rejected.</p>
                  ) : departed ? (
                    <p className="text-sm opacity-70 mt-2">Departure passed.</p>
                  ) : null}

                  {/* Pay Now button */}
                  <div className="mt-3">
                    {b.status === "accepted" && !b.paid ? (
                      <button
                        onClick={() => handlePayNow(b._id)}
                        className="btn btn-primary btn-sm"
                        disabled={departed}
                      >
                        Pay Now
                      </button>
                    ) : b.paid ? (
                      <button className="btn btn-ghost btn-sm" disabled>
                        Paid
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// small countdown component that accepts ticket object
const Countdown = ({ ticket }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!ticket) return;
    let dep = null;
    if (ticket.date && ticket.time)
      dep = new Date(`${ticket.date}T${ticket.time}`);
    else if (ticket.departure) dep = new Date(ticket.departure);
    if (!dep) return;

    const update = () => {
      const diff = dep.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [ticket]);

  if (!timeLeft) return null;
  return (
    <p className="text-sm mt-2">
      Countdown: <span className="font-medium">{timeLeft}</span>
    </p>
  );
};

export default MyBookings;

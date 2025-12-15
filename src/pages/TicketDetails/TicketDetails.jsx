import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import default_ticket from "../../assets/images/default_ticket.jpg";
import LoadingSpinner from "../../components/LoadingSpinner";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // booking modal state
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  // countdown
  const [timeLeft, setTimeLeft] = useState(null);

  // Parse departure datetime from ticket (supports date+time fields)
  const getDepartureDateTime = (t) => {
    if (!t) return null;
    if (t.date && t.time) {
      // assume date is yyyy-mm-dd and time is HH:MM (24h)
      const combined = `${t.date}T${t.time}`;
      const d = new Date(combined);
      if (!isNaN(d)) return d;
    }
    // fallback if there's a datetime field
    if (t.departure) {
      const d = new Date(t.departure);
      if (!isNaN(d)) return d;
    }
    // fallback: if ticket has createdAt + duration etc — not handling
    return null;
  };

  // Load ticket details
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data && Object.keys(data).length ? data : null);
      })
      .catch((err) => {
        console.error("Failed to load ticket:", err);
        setTicket(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Countdown effect
  useEffect(() => {
    if (!ticket) {
      setTimeLeft(null);
      return;
    }
    const dep = getDepartureDateTime(ticket);
    if (!dep) {
      setTimeLeft(null);
      return;
    }

    const update = () => {
      const now = new Date();
      const diff = dep.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("Departed");
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

  const departureDateTime = getDepartureDateTime(ticket);
  const isDeparted = departureDateTime
    ? departureDateTime.getTime() <= new Date().getTime()
    : false;
  const availableSeats = ticket ? ticket.seats ?? ticket.quantity ?? 0 : 0;

  // show booking modal
  const openBooking = () => {
    if (!user) {
      toast.error("Please login to book tickets.");
      return navigate("/login");
    }
    if (isDeparted) {
      toast.error("Departure time has already passed.");
      return;
    }
    if (availableSeats < 1) {
      toast.error("No seats available.");
      return;
    }
    setQuantity(1);
    setShowModal(true);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book tickets.");
      return navigate("/login");
    }
    const q = Number(quantity);
    if (!q || q < 1) {
      toast.error("Minimum 1 seat required.");
      return;
    }
    if (q > availableSeats) {
      toast.error("Cannot book more than available seats.");
      return;
    }
    if (isDeparted) {
      toast.error("Cannot book. Departure already passed.");
      return;
    }

    setBookingLoading(true);

    try {
      const bookingInfo = {
        ticketId: id,
        quantity: q,
        userEmail: user.email,
        userName: user.displayName || "",
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Booking created — pending approval/payment.");
        setShowModal(false);
        // navigate to user's bookings
        navigate("/dashboard/my-bookings");
      } else {
        // server returned error (400 etc)
        toast.error(data.error || "Failed to create booking.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Server error. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        <p>Loading ticket details...</p>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (!ticket?._id) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Ticket not found!
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left */}
        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-2">{ticket.title}</h2>
          <p className="text-lg opacity-80 mb-3">{ticket.route}</p>
          <p className="text-lg opacity-80 mb-3 font-bold rounded-sm w-15 text-center bg-accent">
            {ticket.type}
          </p>

          <p className="font-semibold text-xl">
            Price: <span className="text-primary">৳ {ticket.price}</span>
          </p>

          <p className="mt-2">
            Available Seats:{" "}
            <span className="font-medium">{availableSeats}</span>
          </p>

          <p className="mt-2">
            Departure:
            {departureDateTime ? (
              <>
                {departureDateTime.toLocaleDateString()}{" "}
                {departureDateTime.toLocaleTimeString()}
              </>
            ) : (
              "TBD"
            )}
          </p>

          <p className="mt-2">
            Countdown: <span className="font-medium">{timeLeft ?? "N/A"}</span>
          </p>

          <p className="mt-4 opacity-80">{ticket.description}</p>

          {/* Book Button */}
          <button
            onClick={openBooking}
            className="btn btn-primary w-full mt-5"
            disabled={availableSeats < 1 || isDeparted}
          >
            {availableSeats < 1
              ? "Sold Out"
              : isDeparted
              ? "Departure Passed"
              : "Book Now"}
          </button>
        </div>

        {/* Right: Image if any */}
        <div>
          <img
            src={ticket.image || default_ticket}
            alt="ticket"
            className="rounded-xl shadow-lg w-full h-80 object-contain"
          />
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-3">
              Book — {ticket.title}
            </h3>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={availableSeats}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="input input-bordered w-full"
                  required
                />
                <p className="text-sm opacity-70 mt-1">
                  Max available: {availableSeats}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>

                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                  disabled={bookingLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;

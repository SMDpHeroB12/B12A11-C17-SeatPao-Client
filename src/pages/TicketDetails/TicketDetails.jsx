import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import default_ticket from "../../assets/images/default_ticket.jpg";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Load ticket details
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Handle Booking
  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    if (quantity < 1) {
      return toast.error("Minimum 1 seat required!");
    }

    const bookingInfo = {
      ticketId: id,
      quantity,
      userEmail: user.email,
      userName: user.displayName,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingInfo),
    });
    const data = await res.json();

    if (data.success) {
      toast.success("Booking successful!");
      navigate("/dashboard/my-bookings");
    } else {
      toast.error(data.error || "Failed to book ticket.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading ticket details...
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

          <p className="font-semibold text-xl">
            Price: <span className="text-primary">৳ {ticket.price}</span>
          </p>

          <p className="mt-2">
            Available Seats: <span className="font-medium">{ticket.seats}</span>
          </p>

          <p className="mt-4 opacity-80">{ticket.description}</p>

          {/* Quantity Selector */}
          <div className="mt-6">
            <label className="font-medium mb-1 block">Select Seats</label>
            <input
              type="number"
              min="1"
              max={ticket.seats}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            className="btn btn-primary w-full mt-5"
            disabled={ticket.seats < 1}
          >
            {ticket.seats < 1 ? "Sold Out" : "Book Now"}
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
    </div>
  );
};

export default TicketDetails;

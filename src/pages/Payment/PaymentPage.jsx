import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const PaymentPage = () => {
  const { id } = useParams(); // bookingId
  //   const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bookings/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBooking(data);
      });
  }, [id]);

  const handlePay = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/payments/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id }),
      }
    );
    const data = await res.json();

    if (data.url) {
      window.location.replace(data.url);
    } else {
      toast.error("Payment session failed!");
    }
  };

  if (!booking) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>

      <div className="bg-base-200 p-6 rounded-xl shadow space-y-2">
        <h3 className="text-lg font-semibold">{booking.ticketTitle}</h3>
        <p>Seats: {booking.quantity}</p>
        <p>Total: ৳{booking.total}</p>

        <button onClick={handlePay} className="btn btn-primary w-full mt-4">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

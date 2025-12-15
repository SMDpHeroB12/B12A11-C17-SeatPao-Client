import { useLoaderData } from "react-router-dom";

const PaymentCheckout = () => {
  const booking = useLoaderData();

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: booking._id,
          }),
        }
      );
      const data = await res.json();
      if (data.url) {
        // redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch (err) {
      console.error("Create session error:", err);
      alert("Server error creating checkout session");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

      <p className="mb-2">Ticket: {booking.ticketTitle}</p>
      <p className="mb-2">Seats: {booking.quantity}</p>
      <p>Total Price: ৳{booking.total}</p>

      <button onClick={handlePayment} className="btn btn-primary mt-5">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentCheckout;

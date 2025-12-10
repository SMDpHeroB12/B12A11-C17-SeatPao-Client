import { useLoaderData } from "react-router-dom";
import PaymentForm from "../../components/Payment/PaymentForm";

const Payment = () => {
  const booking = useLoaderData();

  return (
    <div className="max-w-lg mx-auto bg-base-200 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>

      <p className="mb-2">
        Ticket: <strong>{booking.ticketTitle}</strong>
      </p>
      <p className="mb-2">Quantity: {booking.quantity}</p>
      <p className="mb-4 font-medium">Amount: ${booking.total}</p>

      <PaymentForm booking={booking} />
    </div>
  );
};

export default Payment;

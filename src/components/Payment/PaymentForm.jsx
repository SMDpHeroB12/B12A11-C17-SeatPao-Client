import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  // Create PaymentIntent when component loads
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/payments/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: booking._id,
        amount: booking.total,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [booking]);

  // Handle Payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment Successful!");

        // Mark booking as paid
        await fetch(
          `${import.meta.env.VITE_API_URL}/bookings/pay/${booking._id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionId: result.paymentIntent.id,
            }),
          }
        );

        toast.success("Booking updated!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded-md" />

      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="btn btn-primary w-full"
      >
        Pay Now
      </button>
    </form>
  );
};

const PaymentForm = ({ booking }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm booking={booking} />
    </Elements>
  );
};

export default PaymentForm;

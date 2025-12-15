// src/pages/Payment/PaymentSuccess.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      toast.error("Missing session id");
      navigate("/dashboard/my-bookings");
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/payments/confirm`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId }),
          }
        );
        const data = await res.json();
        if (res.ok && data.success) {
          toast.success("Payment confirmed!");
          navigate("/dashboard/transactions");
        } else {
          toast.error(data.error || "Payment confirmation failed");
          navigate("/dashboard/my-bookings");
        }
      } catch (err) {
        console.error("Confirm payment error:", err);
        toast.error("Server error");
        navigate("/dashboard/my-bookings");
      }
    })();
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Confirming payment...</p>
    </div>
  );
};

export default PaymentSuccess;

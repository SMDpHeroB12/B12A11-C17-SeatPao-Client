import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PaymentCancel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error("Payment cancelled");
    navigate("/dashboard/my-bookings");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Payment cancelled. Redirecting...
    </div>
  );
};

export default PaymentCancel;

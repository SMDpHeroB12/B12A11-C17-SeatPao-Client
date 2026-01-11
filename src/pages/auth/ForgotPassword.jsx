import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "Password reset email sent. Please check your Inbox or Spam or Junk section."
      );
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Password reset email has been sent. Please check your Inbox or Spam or Junk section.",
        confirmButtonText: "OK",
      });

      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "SeatPao | Forgot Password";
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="font-medium">Email Address</label>
              <input
                type="email"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </form>

          <p className="text-center mt-4">
            Remember your password?{" "}
            <Link to="/login" className="text-primary font-medium">
              Go back to Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForgotPassword;

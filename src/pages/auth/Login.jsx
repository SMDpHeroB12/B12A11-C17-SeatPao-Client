import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  const from = location.state?.from?.pathname || "/";

  // Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    setResetEmail(email);

    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setError("Invalid email or password.");
    }
  };

  // Forgot Password
  const handleForgotPassword = () => {
    if (!resetEmail) {
      toast.error("Please enter your email first.");
      return;
    }

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // Google Login
  const handleGoogle = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;

        // Save Google user into DB
        await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: "user",
          }),
        });

        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  useEffect(() => {
    document.title = "SeatPao | Log-in";
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setResetEmail(e.target.value)}
                className="input w-full mt-1"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="input w-full mt-1"
                placeholder="Enter password"
                required
              />

              {/* Forgot Password */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-primary text-sm mt-1"
              >
                Forgot Password?
              </button>
            </div>

            {error && <p className="text-red-500 text-center mb-3">{error}</p>}

            <button type="submit" className="btn btn-primary w-full mt-3">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogle}
            className="btn  w-full flex items-center gap-3"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary font-medium">
              Register Now
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

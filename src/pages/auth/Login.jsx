import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");

  // If user was trying to access a private route
  const from = location.state?.from?.pathname || "/";

  // Handle Email Login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);

      toast.success("Login successful!");
      navigate(from, { replace: true }); // Redirect
    } catch (err) {
      console.log(err);
      setError("Invalid email or password.");
    }
  };

  // Handle Google Login

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full mt-1"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full mt-1"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-full mt-3">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full flex items-center gap-3"
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
  );
};

export default Login;

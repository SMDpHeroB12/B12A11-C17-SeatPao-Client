import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../../firebase/firebase.config";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { loginUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  // const [resetEmail, setResetEmail] = useState("");

  const from = location.state?.from?.pathname || "/";

  // ======================
  // NORMAL EMAIL LOGIN
  // ======================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    // setResetEmail(email);

    try {
      await loginUser(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Invalid email or password.");
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // DEMO LOGIN (NO UI CHANGE)
  // ======================
  const handleDemoLogin = async (role) => {
    setError("");
    setLoading(true);

    let email = "";
    let password = "";

    if (role === "admin") {
      email = "mdshishir@gmail.com";
      password = "sisir123";
    }

    if (role === "vendor") {
      email = "emonshikder2020@gmail.com";
      password = "emon123";
    }
    if (role === "user") {
      email = "md.bellal010@gmail.com";
      password = "bellal010MD";
    }

    try {
      await loginUser(email, password);
      toast.success(`Demo ${role} login successful!`);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setError("Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // FORGOT PASSWORD
  // ======================
  // const handleForgotPassword = () => {
  //   if (!resetEmail) {
  //     toast.error("Please enter your email first.");
  //     return;
  //   }

  //   sendPasswordResetEmail(auth, resetEmail)
  //     .then(() => {
  //       toast.success("Password reset email sent!");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.message);
  //     });
  // };

  // ======================
  // GOOGLE LOGIN
  // ======================
  const handleGoogle = () => {
    setLoading(true);

    googleLogin()
      .then(async (result) => {
        const user = result.user;

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
      })
      .finally(() => setLoading(false));
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

              {/* <button
                type="button"
                onClick={handleForgotPassword}
                className="text-primary text-sm mt-1"
              >
                Forgot Password?
              </button> */}
              <Link
                to="/forgot-password"
                className="text-primary text-sm mt-3 inline-block"
              >
                Forgot Password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-center mb-3">{error}</p>}

            <button type="submit" className="btn btn-primary w-full mt-3">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          {/* 🔒 DEMO LOGIN – NO UI CHANGE (Hidden Triggers) */}
          <div className="w-full my-3 flex-col flex justify-between items-center gap-4 ">
            <div>
              <h2>Demo Credentials</h2>
            </div>
            <div className="flex gap-4">
              <button
                className="btn hover:bg-purple-400 border border-gray-200"
                onClick={() => handleDemoLogin("admin")}
                disabled={loading}
              >
                Admin
              </button>
              <button
                className="btn hover:bg-purple-400 border border-gray-200"
                onClick={() => handleDemoLogin("vendor")}
                disabled={loading}
              >
                Vendor
              </button>
              <button
                className="btn hover:bg-purple-400 border border-gray-200"
                onClick={() => handleDemoLogin("user")}
                disabled={loading}
              >
                User
              </button>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="btn w-full flex items-center gap-3"
          >
            <FcGoogle size={22} />{" "}
            {loading ? "Logging in..." : "Continue with Google"}
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

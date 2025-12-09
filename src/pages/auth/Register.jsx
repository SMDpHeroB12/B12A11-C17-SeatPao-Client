import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { registerUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    // Validations
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create Firebase Account
      await registerUser(name, photo, email, password);

      // Save User to MongoDB
      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          photo,
          role: "user",
        }),
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  // Handle Google Sign In

  const handleGoogle = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;

        // Save Google User to Database
        await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            role: "user",
          }),
        });

        toast.success("Login successful!");
        navigate("/");
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
          Create an Account
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full mt-1"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="font-medium">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input input-bordered w-full mt-1"
              placeholder="Your photo link"
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              className="input input-bordered w-full mt-1"
              placeholder="Confirm password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-3">
            Create Account
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
          Already have an account?
          <Link to="/login" className="text-primary font-medium">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { motion } from "motion/react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero min-h-[75vh] bg-base-200 dark:bg-base-300 rounded-xl my-5">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {/* Hero Image */}
        <motion.img
          src="https://i.ibb.co.com/KcS9cjYD/ticket-booking.png"
          alt="Ticket Booking"
          className="max-w-sm rounded-lg shadow-2xl"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Book Your Journey With <span className="text-primary">SeatPao</span>
          </h1>

          <p className="py-5 text-gray-600 dark:text-gray-300 max-w-md">
            Bus, Train, Launch, Flight — সব ধরনের টিকেট এখন এক প্ল্যাটফর্মে।
            সহজ, দ্রুত, নিরাপদ!
          </p>

          <div className="flex gap-3">
            <Link to="/tickets">
              <button className="btn btn-primary">Book Tickets</button>
            </Link>

            <Link to="/register">
              <button className="btn btn-outline">Join Now</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

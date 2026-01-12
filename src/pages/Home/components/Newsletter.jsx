import { motion } from "motion/react";
import { toast } from "react-hot-toast";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    e.target.reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-base-200 rounded-xl my-16 text-center"
    >
      <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p className="mb-6 opacity-80">
        Get latest offers, routes and updates directly in your inbox.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <div className="px-5 sm:px-0">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="input w-full sm:w-80"
          />
        </div>
        <div className="px-5 sm:px-0">
          <button className="btn w-full btn-primary">Subscribe</button>
        </div>
      </form>
    </motion.section>
  );
};

export default Newsletter;

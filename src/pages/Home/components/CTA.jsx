import { Link } from "react-router-dom";
import { motion } from "motion/react";

const CTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-primary text-white rounded-xl text-center my-16"
    >
      <h2 className="text-3xl font-bold mb-4">Ready to Book Your Next Trip?</h2>
      <p className="mb-6 opacity-90 w-80 mx-auto">
        Get the best deals on tickets with SeatPao today.
      </p>
      <Link to="/tickets">
        <button className="btn hover:text-gray-500 btn-outline text-white border-white">
          Explore Tickets
        </button>
      </Link>
    </motion.section>
  );
};

export default CTA;

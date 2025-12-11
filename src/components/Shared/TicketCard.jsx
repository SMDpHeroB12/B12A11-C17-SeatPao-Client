import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TicketCard = ({ ticket }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-5 bg-base-200 rounded-xl shadow hover:shadow-lg duration-300"
    >
      <h3 className="text-xl font-semibold">{ticket.title}</h3>
      <p className="opacity-70">{ticket.route}</p>
      <p className="mt-2 font-bold text-lg">৳ {ticket.price}</p>

      <div className="mt-3 flex justify-between items-center">
        <span className="badge badge-primary">{ticket.type}</span>
        <span className="badge">{ticket.seats} seats</span>
      </div>

      <Link
        to={`/ticket/${ticket._id}`}
        className="btn btn-sm btn-primary w-full mt-4"
      >
        View Details
      </Link>
    </motion.div>
  );
};

export default TicketCard;

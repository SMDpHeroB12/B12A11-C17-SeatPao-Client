import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TicketCard = ({ ticket }) => {
  return (
    <div>
      <motion.div
        key={ticket.id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-base-100 border border-gray-200 rounded-xl shadow hover:shadow-xl transition overflow-hidden"
      >
        {/* Image */}
        <img
          src={ticket.img}
          alt={ticket.title}
          className="w-full h-60 object-cover"
        />

        {/* Content */}
        <div className="p-5 space-y-2">
          <h3 className="text-xl font-semibold">{ticket.title}</h3>

          <p className="text-sm opacity-70">
            Transport Type: <span className="font-medium">{ticket.type}</span>
          </p>

          <p className="text-sm opacity-70">
            Quantity: <span className="font-medium">{ticket.quantity}</span>
          </p>

          <p className="font-bold text-primary text-lg">
            Price: ৳ {ticket.price}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {(Array.isArray(ticket.perks) ? ticket.perks : []).map(
              (perk, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {perk}
                </span>
              )
            )}
          </div>

          {/* <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {ticket.perks}
            </span>
          </div> */}
          {/* Perks */}
          {/* <div className="flex flex-wrap gap-2 mt-3">
            {ticket.perks.map((perk, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {perk}
              </span>
            ))}
          </div> */}

          <div className="mt-4 flex justify-end">
            <Link
              to={`/ticket/${ticket.id}`}
              className="btn btn-primary btn-sm"
            >
              See Details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketCard;

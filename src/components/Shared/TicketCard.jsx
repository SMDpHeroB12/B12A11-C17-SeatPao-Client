import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TicketCard = ({ ticket }) => {
  // safe accessors
  const image = ticket.image || ticket.img || "/default-ticket.jpg";
  const title = ticket.title || "Untitled Ticket";
  const route = ticket.route || `${ticket.from || ""} → ${ticket.to || ""}`;
  const type = ticket.type || "N/A";
  const seats = ticket.seats ?? ticket.quantity ?? 0;
  const price = ticket.price ?? 0;
  const perks = Array.isArray(ticket.perks)
    ? ticket.perks
    : ticket.perks
    ? [ticket.perks]
    : [];
  const departureDate = ticket.date || ticket.departure || null;
  const departureTime = ticket.time || null;

  return (
    <div>
      <motion.div
        key={ticket._id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-base-100 border border-gray-200 rounded-xl shadow hover:shadow-xl transition overflow-hidden"
      >
        {/* Image */}
        <img src={image} alt={title} className="w-full h-60 object-cover" />

        {/* Content */}
        <div className="p-5 space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>

          <p className="text-sm opacity-70">
            <span className="font-medium">Route:</span> {route}
          </p>

          <p className="text-sm opacity-70">
            <span className="font-medium">Transport:</span> {type}
          </p>

          <p className="text-sm opacity-70">
            <span className="font-medium">Departure:</span>{" "}
            {departureDate ? (
              <>
                {departureDate}
                {departureTime ? ` • ${departureTime}` : null}
              </>
            ) : (
              "TBD"
            )}
          </p>

          <p className="text-sm opacity-70">
            <span className="font-medium">Available Seats:</span> {seats}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="font-bold text-primary text-lg">Price: ৳ {price}</p>
            </div>
            <div className="text-right">
              <Link
                to={`/ticket/${ticket._id}`}
                className="btn btn-primary btn-sm"
              >
                See Details
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {perks.length === 0 ? (
              <span className="text-sm opacity-70">No perks listed</span>
            ) : (
              perks.map((perk, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {perk}
                </span>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TicketCard;

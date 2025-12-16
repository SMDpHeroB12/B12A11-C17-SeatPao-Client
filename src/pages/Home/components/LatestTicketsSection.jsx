import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const LatestTicketsSection = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets`)
      .then((res) => res.json())
      .then((data) => {
        const latest = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);

        setTickets(latest);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="my-16">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-10"
      >
        Latest Tickets
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="card bg-base-100 shadow-md"
          >
            <figure>
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-40 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="font-semibold">{ticket.title}</h3>

              <div className="text-sm space-y-1">
                <p>Price: ৳{ticket.price}</p>
                <p>Quantity: {ticket.seats}</p>
                <p>Transport: {ticket.type}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {ticket.perks.length === 0 ? (
                    <span className="text-sm opacity-70">No perks listed</span>
                  ) : (
                    ticket.perks.map((perk, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {perk}
                      </span>
                    ))
                  )}
                </div>
                {/* <p className="truncate">Perks: {ticket.perks?.join(", ")}</p> */}
              </div>

              <Link
                to={`/ticket/${ticket._id}`}
                className="btn btn-primary btn-sm mt-3"
              >
                See Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestTicketsSection;

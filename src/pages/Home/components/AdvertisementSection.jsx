import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdvertisementSection = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets`)
      .then((res) => res.json())
      .then((data) => {
        const advertised = data
          .filter((t) => t.advertised === true)
          .slice(0, 6);

        setTickets(advertised);
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
        className="text-3xl font-bold mb-6 text-center"
      >
        Advertised Tickets
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket._id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={ticket.image}
                alt={ticket.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{ticket.title}</h3>

              <p className="text-sm text-gray-500">
                {ticket.from} → {ticket.to}
              </p>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Price:</strong> ৳{ticket.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {ticket.seats}
                </p>
                <p>
                  <strong>Transport:</strong> {ticket.type}
                </p>
                <p>
                  <strong>Perks:</strong> {ticket.perks?.join(", ")}
                </p>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/ticket/${ticket._id}`}
                  className="btn btn-primary btn-sm"
                >
                  See Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;

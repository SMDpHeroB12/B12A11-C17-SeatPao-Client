import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const AdvertisementSection = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tickets/advertised`)
      .then((res) => res.json())
      .then((data) => setAds(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="w-11/12 mx-auto my-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-10"
      >
        Special Offers
      </motion.h2>

      {ads.length === 0 ? (
        <p className="opacity-70 text-center">
          No advertisements available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ticket) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-base-100 border border-gray-200 rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <div
                key={ticket._id}
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
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdvertisementSection;

import TicketCard from "../../components/Shared/TicketCard";
import { motion } from "motion/react";

const AdvertisedTickets = () => {
  // temporary static data
  const ads = [1, 2, 3, 4, 5, 6];

  return (
    <section className="my-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Featured Tickets
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((item, index) => (
          <TicketCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default AdvertisedTickets;

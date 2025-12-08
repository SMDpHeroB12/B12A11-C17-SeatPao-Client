import { motion } from "motion/react";
import { Link } from "react-router-dom";

const LatestTicketsSection = () => {
  const latest = [
    {
      id: 101,
      title: "Dhaka → Rangpur (AC Bus)",
      price: 1100,
      quantity: 18,
      type: "Bus",
      perks: ["AC", "Snacks"],
      img: "https://i.ibb.co.com/LDfxVzG9/Dhaka-Rangpur.jpg",
    },
    {
      id: 102,
      title: "Dhaka → Sylhet (Intercity Train)",
      price: 750,
      quantity: 40,
      type: "Train",
      perks: ["AC Seat", "Food"],
      img: "https://i.ibb.co.com/ccYwsWDW/Dhaka-Sylhet-Intercity-Train.jpg",
    },
    {
      id: 103,
      title: "Chittagong → Dhaka (Flight)",
      price: 4200,
      quantity: 15,
      type: "Plane",
      perks: ["Fast", "Comfort"],
      img: "https://i.ibb.co.com/yB7L3Wvc/Chattogram-Dhaka-Flight.jpg",
    },
    {
      id: 104,
      title: "Dhaka → Barisal (Launch)",
      price: 500,
      quantity: 50,
      type: "Launch",
      perks: ["Cabin", "Food"],
      img: "https://i.ibb.co.com/Tx3HChTq/Dhaka-Barishal-Launch.jpg",
    },
    {
      id: 105,
      title: "Dhaka → Khulna (AC Bus)",
      price: 900,
      quantity: 30,
      type: "Bus",
      perks: ["AC", "Wifi"],
      img: "https://i.ibb.co.com/zVykJ7yd/Dhaka-Khulna.jpg",
    },
    {
      id: 106,
      title: "Sylhet → Dhaka (Train)",
      price: 520,
      quantity: 33,
      type: "Train",
      perks: ["Non-AC", "Clean"],
      img: "https://i.ibb.co.com/mp3sXXM/Sylhet-Dhaka-Train.jpg",
    },
  ];

  return (
    <section className="my-14">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-10"
      >
        Latest Tickets
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto">
        {latest.map((ticket) => (
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
                Transport Type:{" "}
                <span className="font-medium">{ticket.type}</span>
              </p>

              <p className="text-sm opacity-70">
                Quantity: <span className="font-medium">{ticket.quantity}</span>
              </p>

              <p className="font-bold text-primary text-lg">
                Price: ৳ {ticket.price}
              </p>

              {/* Perks */}
              <div className="flex flex-wrap gap-2 mt-3">
                {ticket.perks.map((perk, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {perk}
                  </span>
                ))}
              </div>

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
        ))}
      </div>
    </section>
  );
};

export default LatestTicketsSection;

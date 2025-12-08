import { motion } from "motion/react";
import { Link } from "react-router-dom";

const AdvertisementSection = () => {
  // Static 6 ads (later comes from backend)
  const ads = [
    {
      id: 1,
      title: "Dhaka → Chittagong (AC Bus)",
      price: 1200,
      quantity: 20,
      type: "Bus",
      perks: ["AC", "Wifi", "Snacks"],
      img: "https://i.ibb.co.com/5WmLDBdY/Dhaka-Chittagong.jpg",
    },
    {
      id: 2,
      title: "Dhaka → Sylhet (Intercity Train)",
      price: 750,
      quantity: 40,
      type: "Train",
      perks: ["AC Seat", "Food", "Safety"],
      img: "https://i.ibb.co.com/ccYwsWDW/Dhaka-Sylhet-Intercity-Train.jpg",
    },
    {
      id: 3,
      title: "Barisal → Dhaka (Launch)",
      price: 450,
      quantity: 60,
      type: "Launch",
      perks: ["Cabin", "AC", "Food"],
      img: "https://i.ibb.co.com/TqhJNTJW/Barishal-Dhaka-Launch.jpg",
    },
    {
      id: 4,
      title: "Dhaka → Cox’s Bazar (Flight)",
      price: 4400,
      quantity: 10,
      type: "Plane",
      perks: ["Fast", "Snacks", "Comfort"],
      img: "https://i.ibb.co.com/SDdcz0VW/Dhaka-Cox-s-Bazar-Flight.jpg",
    },
    {
      id: 5,
      title: "Dhaka → Rajshahi (Train)",
      price: 550,
      quantity: 25,
      type: "Train",
      perks: ["Non-AC", "Safety"],
      img: "https://i.ibb.co.com/TDNdY7Z3/Dhaka-Rajshahi-Train.jpg",
    },
    {
      id: 6,
      title: "Dhaka → Khulna (AC Bus)",
      price: 900,
      quantity: 30,
      type: "Bus",
      perks: ["AC", "Music", "Snacks"],
      img: "https://i.ibb.co.com/zVykJ7yd/Dhaka-Khulna.jpg",
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
        Advertisement Tickets
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto">
        {ads.map((ticket) => (
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

export default AdvertisementSection;

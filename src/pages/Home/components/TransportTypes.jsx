import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";
import { motion } from "motion/react";

const transports = [
  { id: 1, name: "Bus", icon: <FaBus size={28} /> },
  { id: 2, name: "Train", icon: <FaTrain size={28} /> },
  { id: 3, name: "Launch", icon: <FaShip size={28} /> },
  { id: 4, name: "Flight", icon: <FaPlane size={28} /> },
];

const TransportTypes = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Available Transport Types
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-10/12 mx-auto">
        {transports.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-6 bg-base-100 shadow rounded-xl border border-gray-200"
          >
            <div className="text-primary mb-3">{item.icon}</div>
            <p className="font-semibold">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TransportTypes;

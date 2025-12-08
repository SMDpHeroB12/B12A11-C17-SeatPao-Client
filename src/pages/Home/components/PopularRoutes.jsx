import { motion } from "motion/react";
import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";

const PopularRoutes = () => {
  const routes = [
    {
      id: 1,
      from: "Dhaka",
      to: "Chittagong",
      price: 550,
      type: "Bus",
      icon: <FaBus size={22} />,
    },
    {
      id: 2,
      from: "Dhaka",
      to: "Sylhet",
      price: 700,
      type: "Train",
      icon: <FaTrain size={22} />,
    },
    {
      id: 3,
      from: "Barisal",
      to: "Dhaka",
      price: 450,
      type: "Launch",
      icon: <FaShip size={22} />,
    },
    {
      id: 4,
      from: "Dhaka",
      to: "Cox’s Bazar",
      price: 3800,
      type: "Plane",
      icon: <FaPlane size={22} />,
    },
  ];

  return (
    <div className="py-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Popular Routes
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="p-6 bg-base-100 shadow rounded-xl border border-gray-100 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3 text-primary">
              {route.icon}
              <p className="font-semibold">{route.type}</p>
            </div>

            <h3 className="text-lg font-bold">
              {route.from} → {route.to}
            </h3>

            <p className="mt-2 text-sm opacity-80">Starting from</p>
            <p className="text-xl font-bold text-primary">৳ {route.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;

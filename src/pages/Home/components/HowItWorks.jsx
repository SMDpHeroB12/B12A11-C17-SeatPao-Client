import { motion } from "motion/react";
import { FaSearch, FaTicketAlt, FaCreditCard } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch size={26} />,
    title: "Search Tickets",
    desc: "Choose your route, date and transport type easily.",
  },
  {
    id: 2,
    icon: <FaTicketAlt size={26} />,
    title: "Select & Book",
    desc: "Pick your seat and confirm ticket details instantly.",
  },
  {
    id: 3,
    icon: <FaCreditCard size={26} />,
    title: "Secure Payment",
    desc: "Pay safely using trusted and encrypted payment systems.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-base-200 rounded-xl my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        How <span className="text-primary">SeatPao</span> Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 mx-auto">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 p-6 rounded-xl shadow text-center"
          >
            <div className="text-primary mb-4 flex justify-center">
              {step.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-sm opacity-80">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

import { FaTicketAlt, FaShieldAlt, FaHeadset, FaRocket } from "react-icons/fa";
import { motion } from "motion/react";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaTicketAlt size={28} />,
      title: "Easy & Quick Booking",
      desc: "Book bus, train, launch and flights instantly with a seamless experience.",
    },
    {
      id: 2,
      icon: <FaShieldAlt size={28} />,
      title: "Secure Payment",
      desc: "Your payments are protected with top-grade security & encryption.",
    },
    {
      id: 3,
      icon: <FaHeadset size={28} />,
      title: "24/7 Customer Support",
      desc: "Our support team is always ready to assist you in any situation.",
    },
    {
      id: 4,
      icon: <FaRocket size={28} />,
      title: "Fast & Reliable",
      desc: "Get real-time updates and smooth performance across all devices.",
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-4">
        Why Choose <span className="text-primary">SeatPao?</span>
      </h2>
      <p className="text-center opacity-80 mb-10">
        Your trusted travel booking partner — simple, safe & reliable.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 mx-auto">
        {features.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-base-100 border border-gray-200 shadow rounded-xl flex flex-col items-center text-center hover:shadow-xl"
          >
            <div className="text-primary mb-4">{item.icon}</div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="opacity-80 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;

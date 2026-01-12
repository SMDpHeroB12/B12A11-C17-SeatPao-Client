import { motion } from "motion/react";

const testimonials = [
  {
    id: 1,
    name: "Rahim Uddin",
    photo: "https://i.pravatar.cc/100?img=12",
    comment:
      "SeatPao made my travel booking super easy. Loved the smooth experience!",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    photo: "https://i.pravatar.cc/100?img=47",
    comment: "Secure payment and instant confirmation. Highly recommended!",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    photo: "https://i.pravatar.cc/150?img=52",
    comment: "Best platform for bus and train tickets in Bangladesh.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-base-200 rounded-xl my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto">
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 p-6 rounded-xl shadow"
          >
            <p className="text-sm italic opacity-80 mb-4">“{item.comment}”</p>

            <div className="flex items-center gap-3">
              <img
                src={item.photo}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <h4 className="font-bold">{item.name}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const Contact = () => {
  useEffect(() => {
    document.title = "SeatPao | Contact";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const templateParams = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        toast.success("Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send message. Try again.");
      });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="min-h-screen flex justify-center items-center px-4">
          <div className="w-full max-w-md bg-base-100 shadow-xl p-8 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input w-full mt-1"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input w-full mt-1"
                  placeholder="Your email"
                  required
                />
              </div>

              <div>
                <label className="font-medium">Message</label>
                <textarea
                  name="message"
                  className="textarea w-full mt-1"
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;

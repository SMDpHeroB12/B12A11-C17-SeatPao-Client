import { useEffect } from "react";
import Logo from "../../components/Logo/Logo";

const About = () => {
  useEffect(() => {
    document.title = "SeatPao | About";
  }, []);

  return (
    <>
      <div className="min-h-screen max-w-6xl mx-auto mt-10 px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center flex items-center justify-center gap-3">
          About <Logo></Logo>
        </h1>

        <p className="text-gray-600 text-lg mb-4 text-center">
          SeatPao is an online ticket booking platform designed to make event
          discovery and seat booking simple, fast, and reliable.
        </p>

        <div className="grid md:grid-cols-1 gap-6 mt-10">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide a seamless ticket booking experience with transparency
              and ease for users, vendors, and admins.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Why SeatPao?</h3>
            <p className="text-gray-600">
              We focus on performance, simplicity, and security to ensure users
              can book seats without hassle.
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become a trusted platform for booking tickets to events,
              transport, and experiences.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

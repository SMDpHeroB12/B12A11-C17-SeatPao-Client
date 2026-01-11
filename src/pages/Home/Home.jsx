import { useEffect } from "react";
import AdvertisementSection from "./components/AdvertisementSection";
import LatestTicketsSection from "./components/LatestTicketsSection";
import PopularRoutes from "./components/PopularRoutes";
import WhyChooseUs from "./components/WhyChooseUs";
import HeroSection from "./HeroSection";
import CTA from "./components/CTA";
import HowItWorks from "./components/HowItWorks";
import Newsletter from "./components/Newsletter";
import Testimonials from "./components/Testimonials";
import TransportTypes from "./components/TransportTypes";

const Home = () => {
  useEffect(() => {
    document.title = "SeatPao | Home";
  }, []);

  return (
    <div>
      <HeroSection />

      <HowItWorks />

      <PopularRoutes />

      <TransportTypes />

      <WhyChooseUs />

      <LatestTicketsSection />

      <AdvertisementSection />

      <Testimonials />

      <CTA />

      <Newsletter />
    </div>
  );
};

export default Home;

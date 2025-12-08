import AdvertisedTickets from "./AdvertisedTickets";
import PopularRoutes from "./components/PopularRoutes";
import WhyChooseUs from "./components/WhyChooseUs";
import HeroSection from "./HeroSection";
import LatestTickets from "./LatestTickets";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <PopularRoutes />
      <AdvertisedTickets></AdvertisedTickets>
      <LatestTickets></LatestTickets>
      <WhyChooseUs />
    </div>
  );
};

export default Home;

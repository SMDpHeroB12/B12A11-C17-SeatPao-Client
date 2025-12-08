import AdvertisementSection from "./components/AdvertisementSection";
import LatestTicketsSection from "./components/LatestTicketsSection";
import PopularRoutes from "./components/PopularRoutes";
import WhyChooseUs from "./components/WhyChooseUs";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <PopularRoutes />
      <AdvertisementSection></AdvertisementSection>
      <LatestTicketsSection></LatestTicketsSection>
      <WhyChooseUs />
    </div>
  );
};

export default Home;

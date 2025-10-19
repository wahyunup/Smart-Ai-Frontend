import Footer from "../../../shared/components/partials/Footer";
import Navbar from "../../../shared/components/partials/Navbar";
import SectionFeature from "../components/SectionFeature";
import SectionHome from "../components/SectionHome";
import SectionHowItWorks from "../components/SectionHowItWorks";
import SectionWhoWeAre from "../components/SectionWhoWeAre";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-[#E3F9E8] to-[#E6F9EB]">
      <Navbar />
      <SectionHome />
      <SectionFeature/>
      <SectionHowItWorks/>
      <SectionWhoWeAre/>
      <Footer/>
    </div>
  );
};

export default HomePage;

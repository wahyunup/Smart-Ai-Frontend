import Footer from "../../../shared/components/partials/Footer";
import Navbar from "../../../shared/components/partials/Navbar";
import SectionClient from "../components/SectionClient";
import SectionFeature from "../components/SectionFeature";
import SectionHome from "../components/SectionHome";
import SectionHowItWorks from "../components/SectionHowItWorks";
import SectionWhoWeAre from "../components/SectionWhoWeAre";

const HomePage = () => {
  return (
    // <div className="bg-gradient-to-b from-[#E3F9E8] to-[#E6F9EB]">
    <div className="bg-gradient-to-b from-[#E3F9E8] to-[#E6F9EB]">
      <Navbar />
      <SectionHome />
      <div className="flex flex-col gap-30">
        <SectionClient />
        <SectionFeature />
        <SectionHowItWorks />
        <SectionWhoWeAre />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

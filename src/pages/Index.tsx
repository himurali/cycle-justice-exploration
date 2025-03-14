
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import JusticeSlider from "../components/JusticeSlider";
import InequalitySection from "../components/InequalitySection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import { inequalityData } from "../constants/inequalityData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <Hero />
        <JusticeSlider />
        {inequalityData.map((data, i) => (
          <InequalitySection
            key={data.id}
            data={data}
            isReversed={i % 2 !== 0}
            index={i}
          />
        ))}
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

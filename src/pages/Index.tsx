
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import JusticeSlider from "../components/JusticeSlider";
import ImpactSection from "../components/ImpactSection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <Hero />
        <JusticeSlider />
        <ImpactSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

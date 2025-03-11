
import { Bike, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: bikeRef, isVisible: bikeVisible } = useScrollAnimation();
  
  const handleScrollDown = () => {
    const firstSection = document.getElementById('health');
    if (firstSection) {
      const topOffset = firstSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1),transparent_70%)]"></div>
      </div>
      
      <div className="text-center max-w-5xl mx-auto">
        <div className="mb-6 inline-block" ref={bikeRef as React.RefObject<HTMLDivElement>}>
          <div className={`relative transition-opacity-transform ${bikeVisible ? 'animate-float opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 rounded-full bg-justice-blue/20 blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur p-5 rounded-full shadow-lg">
              <Bike size={72} className="text-justice-blue" />
            </div>
          </div>
        </div>

        <h1 
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className={`font-bold transition-opacity-transform mb-6 ${titleVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <span className="block">Cycling Justice</span>
          <span className="block text-justice-blue">Equity on Two Wheels</span>
        </h1>

        <p 
          ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
          className={`text-xl md:text-2xl text-justice-text/80 max-w-3xl mx-auto transition-opacity-transform ${subtitleVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '300ms' }}
        >
          Exploring the dimensions of inequity in urban mobility across India and how car-centric planning creates systemic injustice that bicycles can help solve.
        </p>

        <div className="mt-12 animate-bounce">
          <button 
            onClick={handleScrollDown}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 group"
            aria-label="Scroll to content"
          >
            <ChevronDown className="w-6 h-6 text-justice-blue group-hover:text-justice-dark transition-colors" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none"></div>
    </section>
  );
};

export default Hero;

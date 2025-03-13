
import React, { useState, useEffect } from 'react';
import { Bike, ChevronDown, RotateCw } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const [flipped, setFlipped] = useState(false);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: subtitleRef, isVisible: subtitleVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: bikeRef, isVisible: bikeVisible } = useScrollAnimation();
  
  // Auto flip every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleFlip = () => {
    setFlipped(prev => !prev);
  };
  
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
    <section id="top" className="relative min-h-screen flex flex-col justify-center items-center py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1),transparent_70%)]"></div>
      </div>
      
      <div className="text-center w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-[85vh]">
        {/* Bike Icon */}
        <div className="mb-6 inline-block" ref={bikeRef as React.RefObject<HTMLDivElement>}>
          <div className={`relative transition-opacity-transform ${bikeVisible ? 'animate-float opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 rounded-full bg-justice-blue/20 blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur p-5 rounded-full shadow-lg">
              <Bike size={72} className="text-justice-blue" />
            </div>
          </div>
        </div>

        {/* Full-screen Brento Card */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`relative w-full h-[60vh] mb-8 perspective-1000 ${titleVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '200ms' }}
        >
          <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
            {/* Front Card - Bicycle for Justice */}
            <div className={`absolute w-full h-full backface-hidden ${flipped ? 'invisible' : 'visible'}`}>
              <div className="glass-card w-full h-full flex flex-col items-center justify-center p-6 border-4 border-justice-blue shadow-xl bg-white/95">
                <div className="grid grid-cols-12 gap-4 w-full h-full">
                  {/* Top Row: Three square images */}
                  <div className="col-span-4 md:col-span-3">
                    <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="Cyclist working" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                  <div className="col-span-4 md:col-span-6">
                    <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Urban mobility" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                  <div className="col-span-4 md:col-span-3">
                    <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" alt="Technology" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                  
                  {/* Middle Row: Centered text block */}
                  <div className="col-span-9 col-start-4 md:col-span-8 md:col-start-5 row-span-1 flex items-center justify-center my-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-justice-blue">
                      Bicycle for Justice
                    </h1>
                  </div>
                  
                  {/* Left Column: Tall image spanning two rows */}
                  <div className="col-span-3 md:col-span-4 row-span-2 flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1472396961693-142e6e269027" 
                      alt="Nature and sustainability" 
                      className="w-full h-full object-cover shadow-lg rounded-lg" 
                    />
                  </div>
                  
                  {/* Bottom Row: Two square images side by side */}
                  <div className="col-span-4 md:col-span-4">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Technology connection" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                  <div className="col-span-5 md:col-span-4">
                    <img src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9" alt="Smart mobility" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Back Card - Justice for Bicycle */}
            <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${flipped ? 'visible' : 'invisible'}`}>
              <div className="glass-card w-full h-full flex flex-col items-center justify-center p-6 border-4 border-justice-dark shadow-xl bg-white/95">
                <div className="grid grid-cols-12 gap-4 w-full h-full">
                  {/* Top Row: Three square images */}
                  <div className="col-span-4 md:col-span-3">
                    <img src="https://images.unsplash.com/photo-1566871277326-ba6874a95344" alt="Bicycle commuting" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                  <div className="col-span-4 md:col-span-6">
                    <img src="https://images.unsplash.com/photo-1571333250630-f0230c320b6d" alt="Urban cycling" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                  <div className="col-span-4 md:col-span-3">
                    <img src="https://images.unsplash.com/photo-1571188654248-7a89213915f7" alt="Advocacy" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                  
                  {/* Middle Row: Centered text block */}
                  <div className="col-span-9 col-start-4 md:col-span-8 md:col-start-5 row-span-1 flex items-center justify-center my-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-justice-dark">
                      Justice for Bicycle
                    </h1>
                  </div>
                  
                  {/* Left Column: Tall image spanning two rows */}
                  <div className="col-span-3 md:col-span-4 row-span-2 flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1505705694340-019e1e335916" 
                      alt="Nature path" 
                      className="w-full h-full object-cover shadow-lg rounded-lg" 
                    />
                  </div>
                  
                  {/* Bottom Row: Two square images side by side */}
                  <div className="col-span-4 md:col-span-4">
                    <img src="https://images.unsplash.com/photo-1593765087641-5500485a2e86" alt="Bike commuting" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                  <div className="col-span-5 md:col-span-4">
                    <img src="https://images.unsplash.com/photo-1573175356234-1f093aa116d3" alt="Bicycle infrastructure" className="w-full h-full object-cover shadow-lg rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Toggle Button */}
          <button 
            onClick={handleFlip}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-justice-blue group"
            aria-label="Toggle view"
          >
            <RotateCw className="w-8 h-8 text-justice-blue group-hover:text-justice-dark transition-colors group-hover:rotate-90 transform duration-300" />
          </button>
        </div>

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

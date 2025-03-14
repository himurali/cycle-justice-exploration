
import { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { justiceTypes } from "../constants/justiceData";
import { motion } from "framer-motion";

const JusticeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: sliderRef, isVisible: sliderVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const handleSliderChange = (value: number[]) => {
    setActiveIndex(value[0]);
  };

  const currentJustice = justiceTypes[activeIndex];
  const IconComponent = currentJustice.icon;

  // Animation variants for the tabs
  const tabContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const tabItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 px-4 bg-gradient-to-b from-background to-slate-50/30"
    >
      <div className="max-w-6xl mx-auto">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-3xl mx-auto mb-12 transition-opacity-transform ${titleVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-justice-blue">
            Justice through Cycling
          </h2>
          <p className="text-lg text-justice-text/70">
            Our core themes for transforming cities
          </p>
        </div>

        {/* Main Justice Slider and Card Section */}
        <div 
          ref={sliderRef as React.RefObject<HTMLDivElement>}
          className={`transition-opacity-transform ${sliderVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          {/* Justice Type Tabs */}
          <Tabs
            value={currentJustice.id}
            className="w-full mb-8"
            onValueChange={(value) => {
              const newIndex = justiceTypes.findIndex(j => j.id === value);
              if (newIndex !== -1) setActiveIndex(newIndex);
            }}
          >
            <motion.div
              variants={tabContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <TabsList className="grid w-full grid-cols-5 bg-slate-100/70">
                {justiceTypes.map((justice) => (
                  <motion.div
                    key={justice.id}
                    variants={tabItemVariants}
                    className="w-full"
                  >
                    <TabsTrigger 
                      value={justice.id}
                      className="text-sm md:text-base font-medium w-full py-4 px-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
                      style={{ 
                        color: justice.id === currentJustice.id ? justice.color : 'inherit',
                        borderBottom: justice.id === currentJustice.id ? `3px solid ${justice.color}` : 'none',
                        backgroundColor: justice.id === currentJustice.id ? `${justice.color}15` : 'transparent'
                      }}
                    >
                      <justice.icon className="size-6 md:size-7" />
                      <span className="font-semibold text-base md:text-lg">{justice.title}</span>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>
          </Tabs>

          {/* Main slider control */}
          <div className="mb-12 mt-10">
            <Slider
              value={[activeIndex]}
              max={justiceTypes.length - 1}
              step={1}
              className="w-full"
              onValueChange={handleSliderChange}
              // Remove the unsupported props that were causing TypeScript errors
            />
            
            {/* Add custom styling for the slider track using CSS class instead */}
            <style jsx>{`
              /* Custom styling for the slider track based on the current justice color */
              :global(.slider-${currentJustice.id} [data-radix-slider-range]) {
                background-color: ${currentJustice.color};
              }
              :global(.slider-${currentJustice.id} [data-radix-slider-thumb]) {
                background-color: ${currentJustice.color};
                border-color: ${currentJustice.color};
              }
            `}</style>
          </div>

          {/* Justice Content Carousel */}
          <Carousel 
            className="w-full"
            opts={{
              startIndex: activeIndex,
              loop: false
            }}
          >
            <CarouselContent>
              {justiceTypes.map((justice, index) => (
                <CarouselItem key={justice.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-8 p-1"
                  >
                    {/* City Example Card */}
                    <Card className="overflow-hidden border-2 bg-white/90" style={{ borderColor: justice.color }}>
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={justice.imageUrl}
                          alt={`Example of ${justice.title} in ${justice.cityExample}`}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="bg-white/90 p-4 rounded-lg -mt-20 relative mx-auto max-w-[90%] shadow-lg border border-muted">
                          <h4 className="text-lg font-bold mb-2" style={{ color: justice.color }}>{justice.cityExample}</h4>
                          <p className="text-sm text-justice-text/80">{justice.cityDescription}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Justice Explanation Card */}
                    <Card className="h-full flex flex-col bg-white/90">
                      <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div className="flex flex-col items-center text-center mb-6">
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                            style={{ backgroundColor: justice.color + '20', color: justice.color }}
                          >
                            <IconComponent size={36} />
                          </motion.div>
                          <h3 className="text-2xl font-bold mb-2" style={{ color: justice.color }}>
                            {justice.title}
                          </h3>
                          <p className="text-lg text-justice-text/80">
                            {justice.description}
                          </p>
                        </div>

                        <div className="glass-card p-6 border-t bg-slate-50">
                          <h4 className="font-semibold mb-2">Impact of Cycling</h4>
                          <ul className="space-y-2">
                            {[
                              "Reduces carbon emissions by replacing car trips",
                              "Creates more equitable access to transportation",
                              "Improves public health through physical activity",
                              "Reduces noise pollution and stress in urban areas",
                              "Strengthens local economies through increased foot traffic"
                            ].map((point, i) => (
                              <motion.li 
                                key={i} 
                                className="flex items-start"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                              >
                                <span className="mr-2 mt-1" style={{ color: justice.color }}>✓</span>
                                <span className="text-sm">{point}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static left-0 right-0 translate-y-0" />
              <CarouselNext className="relative static left-0 right-0 translate-y-0" />
            </div>
          </Carousel>

          {/* Justice Type Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {justiceTypes.map((justice, index) => (
              <motion.button
                key={justice.id}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'scale-125' 
                    : 'opacity-50'
                }`}
                style={{ backgroundColor: justice.color }}
                aria-label={`View ${justice.title}`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JusticeSlider;

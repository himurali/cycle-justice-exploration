
import { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css';
import { Card, CardContent } from '@/components/ui/card';
import { Bike, Loader, Calendar } from 'lucide-react';

interface Section {
  title: string;
  description: string;
  image: string;
}

interface StepSection {
  title: string;
  sections: Section[];
}

interface Part {
  title: string;
  description: string;
  sections: {
    [key: string]: StepSection;
  };
}

interface Steps {
  steps: {
    [key: string]: Part;
  };
}

interface CityData {
  id: string;
  name: string;
  country: string;
  image: string;
  stats: {
    cyclingShare: string;
    bikeInfrastructure: string;
    yearStarted: number;
  };
  introduction: {
    text: string;
    image: string;
  };
  sections: Section[];
}

interface CityTemplateProps {
  cityData: CityData;
}

const CityTemplate = memo(({ cityData }: CityTemplateProps) => {
  const splideRefs = useRef<HTMLDivElement[]>([]);
  const splideInstances = useRef<Splide[]>([]);
  const [stepsData, setStepsData] = useState<Steps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Preload image function
  const preloadImage = (src: string) => {
    if (loadedImages.has(src)) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve(src);
      };
      img.onerror = reject;
    });
  };

  useEffect(() => {
    const loadStepsData = async () => {
      try {
        setIsLoading(true);
        const data = await import(`../data/transformation_steps/${cityData.id}.json`);
        setStepsData(data);
        
        // Preload header images
        preloadImage(cityData.image);
        preloadImage(cityData.introduction.image);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading steps data:', error);
        setIsLoading(false);
      }
    };

    loadStepsData();

    // Clean up splide instances when city changes
    return () => {
      splideInstances.current.forEach((splide) => {
        if (splide) {
          splide.destroy();
        }
      });
      splideInstances.current = [];
    };
  }, [cityData.id]);

  useEffect(() => {
    if (stepsData && !isLoading) {
      // Use requestAnimationFrame to initialize Splide after paint
      const rafId = requestAnimationFrame(() => {
        // Clean up existing instances first
        splideInstances.current.forEach((splide) => {
          if (splide) {
            splide.destroy();
          }
        });
        splideInstances.current = [];

        // Initialize new instances with setTimeout to ensure DOM is ready
        const timer = setTimeout(() => {
          // Initialize new instances
          Object.keys(stepsData.steps).forEach((_, partIndex) => {
            const ref = splideRefs.current[partIndex];
            if (ref) {
              const splide = new Splide(ref, {
                type: 'slide',
                perPage: 1,
                gap: '2rem',
                padding: { left: 0, right: 0 },
                arrows: true,
                pagination: true,
                speed: 800,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                lazyLoad: 'nearby',
                classes: {
                  arrow: 'splide__arrow !bg-background/80 !backdrop-blur-sm',
                  page: 'splide__pagination__page !bg-primary/20 !opacity-100',
                },
              });
              
              splide.mount();
              splideInstances.current.push(splide);
            }
          });
        }, 100);
        
        return () => clearTimeout(timer);
      });
      
      return () => cancelAnimationFrame(rafId);
    }
  }, [stepsData, isLoading]);

  const isImageLoaded = (src: string) => loadedImages.has(src);

  return (
    <div className="bg-background">
      {/* Header Stats */}
      <Card className="mb-12 overflow-hidden">
        <div className="relative h-[300px]">
          {!isImageLoaded(cityData.image) && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
          )}
          <img
            src={cityData.image}
            alt={cityData.name}
            className={`w-full h-full object-cover ${!isImageLoaded(cityData.image) ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={() => preloadImage(cityData.image)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{cityData.name}</h2>
            <p className="text-xl">{cityData.country}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Bike className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cycling Share</p>
                <p className="text-2xl font-bold">{cityData.stats.cyclingShare}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Loader className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bike Infrastructure</p>
                <p className="text-2xl font-bold">{cityData.stats.bikeInfrastructure}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Started</p>
                <p className="text-2xl font-bold">{cityData.stats.yearStarted}</p>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Introduction Section */}
      <section className="bg-secondary/10 py-12 px-6 rounded-lg mb-12">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-lg leading-relaxed text-center mb-8"
          >
            {cityData.introduction.text}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-6"
          >
            {!isImageLoaded(cityData.introduction.image) && (
              <div className="h-[400px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
            )}
            <img
              src={cityData.introduction.image}
              alt="Introduction"
              className={`mx-auto rounded-lg shadow-lg max-h-[400px] object-cover w-full ${!isImageLoaded(cityData.introduction.image) ? 'hidden' : 'block'}`}
              onLoad={() => preloadImage(cityData.introduction.image)}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Steps Sections */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        stepsData && Object.entries(stepsData.steps).map(([partKey, part], partIndex) => (
          <section key={partKey} className="mb-16">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-center">{part.title}</h2>
              <p className="text-lg text-muted-foreground text-center mb-12">{part.description}</p>
              
              <div 
                className="splide" 
                ref={el => {
                  if (el) {
                    splideRefs.current[partIndex] = el;
                  }
                }}
              >
                <div className="splide__track">
                  <ul className="splide__list">
                    {Object.entries(part.sections).map(([sectionKey, section]) => (
                      <li key={sectionKey} className="splide__slide">
                        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-6 text-center">{section.title}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {section.sections.map((subSection, index) => (
                                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                  <div className="aspect-video relative">
                                    {!isImageLoaded(subSection.image) && (
                                      <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                                    )}
                                    <img
                                      src={subSection.image}
                                      alt={subSection.title}
                                      className={`absolute inset-0 w-full h-full object-cover ${!isImageLoaded(subSection.image) ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                                      onLoad={() => preloadImage(subSection.image)}
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="p-4">
                                    <h4 className="font-semibold mb-2">{subSection.title}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {subSection.description}
                                    </p>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
});

CityTemplate.displayName = 'CityTemplate';

export default CityTemplate;

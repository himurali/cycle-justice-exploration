
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CityTemplate from '@/components/CityTemplate';
import { Helmet } from 'react-helmet';

// Import needed for @splidejs/splide
import '@splidejs/splide/css';

// Define interface for city data
interface Section {
  title: string;
  description: string;
  image: string;
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

interface CitiesData {
  cities: CityData[];
}

export default function TransformationCities() {
  const [citiesData, setCitiesData] = useState<CitiesData | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCitiesData = async () => {
      try {
        const response = await import('../data/cities.json');
        setCitiesData(response.default);
        setSelectedCity(response.default.cities[0]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading cities data:', error);
        setIsLoading(false);
      }
    };

    loadCitiesData();
  }, []);

  if (isLoading || !citiesData || !selectedCity) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen bg-background pt-24 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Transformation Cities | Bicycle Justice</title>
        <meta name="description" content="Explore how cities around the world are transforming through cycling" />
      </Helmet>
      <NavBar />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cycling Cities</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore how cities around the world transformed their urban landscapes to prioritize people over cars, creating safer, healthier, and more equitable communities through cycling.
            </p>
            
            {/* City Selector */}
            <Card className="p-4 inline-flex flex-wrap gap-2 justify-center shadow-md">
              {citiesData.cities.map((city) => (
                <Button
                  key={city.id}
                  variant={selectedCity.id === city.id ? "default" : "ghost"}
                  className="flex items-center"
                  onClick={() => setSelectedCity(city)}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {city.name}
                </Button>
              ))}
            </Card>
          </motion.div>

          {/* City Content */}
          <CityTemplate cityData={selectedCity} />
        </div>
      </div>
      <Footer />
    </>
  );
}

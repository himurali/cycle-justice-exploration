
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Grid3X3 } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CityTemplate from '@/components/CityTemplate';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
  const [activeTab, setActiveTab] = useState('overview');

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

          {/* View Selector Tabs */}
          <div className="mb-8">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="overview">City Overview</TabsTrigger>
                <TabsTrigger value="justice-framework" className="flex items-center">
                  <Grid3X3 className="mr-2 h-4 w-4" />
                  Justice Framework
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                {/* City Overview Content */}
                <CityTemplate cityData={selectedCity} />
              </TabsContent>
              
              <TabsContent value="justice-framework">
                <Card className="p-6 mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-center">
                    {selectedCity.name}'s Cycling Justice Framework
                  </h2>
                  <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
                    Explore the four-part justice framework that guided {selectedCity.name}'s cycling transformation, each with four implementation steps.
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="part1">
                      <AccordionTrigger className="text-xl font-semibold">
                        Part I: The Demands of Justice
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Understanding {selectedCity.name}'s cycling transformation needs</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 1: Recognition of Rights</h4>
                            <p className="text-sm text-muted-foreground">Establishing cycling as a fundamental right</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 2: Social Movement</h4>
                            <p className="text-sm text-muted-foreground">Building community support for cycling</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 3: Policy Framework</h4>
                            <p className="text-sm text-muted-foreground">Creating legislative support</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 4: Implementation</h4>
                            <p className="text-sm text-muted-foreground">Putting plans into action</p>
                          </Card>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="part2">
                      <AccordionTrigger className="text-xl font-semibold">
                        Part II: Forms of Reasoning
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">{selectedCity.name}'s analytical approach to cycling</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 1: Data Analysis</h4>
                            <p className="text-sm text-muted-foreground">Understanding usage patterns</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 2: Best Practices</h4>
                            <p className="text-sm text-muted-foreground">Learning from other cities</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 3: Cost-Benefit Analysis</h4>
                            <p className="text-sm text-muted-foreground">Measuring value and impact</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 4: Future Planning</h4>
                            <p className="text-sm text-muted-foreground">Preparing for growth</p>
                          </Card>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="part3">
                      <AccordionTrigger className="text-xl font-semibold">
                        Part III: The Materials of Justice
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Physical and social infrastructure for cycling equity in {selectedCity.name}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 1: Infrastructure Elements</h4>
                            <p className="text-sm text-muted-foreground">Building the physical network</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 2: Social Support</h4>
                            <p className="text-sm text-muted-foreground">Creating community programs</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 3: Economic Tools</h4>
                            <p className="text-sm text-muted-foreground">Financing and incentives</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 4: Cultural Integration</h4>
                            <p className="text-sm text-muted-foreground">Making cycling part of the culture</p>
                          </Card>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="part4">
                      <AccordionTrigger className="text-xl font-semibold">
                        Part IV: Public Reasoning and Democracy
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Engaging communities in cycling transformation in {selectedCity.name}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 1: Public Engagement</h4>
                            <p className="text-sm text-muted-foreground">Involving citizens in decisions</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 2: Decision Making</h4>
                            <p className="text-sm text-muted-foreground">Collaborative planning</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 3: Implementation</h4>
                            <p className="text-sm text-muted-foreground">Community leadership</p>
                          </Card>
                          <Card className="p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-bold mb-2">Step 4: Long-term Engagement</h4>
                            <p className="text-sm text-muted-foreground">Sustaining participation</p>
                          </Card>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
                
                {/* Detailed Content through the existing CityTemplate */}
                <CityTemplate cityData={selectedCity} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

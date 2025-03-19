
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Grid3X3, LineChart, Info } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CityTemplate from '@/components/CityTemplate';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { bicycleJusticeImpactTypes } from '@/constants/justiceData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
                
                {/* Bicycle Justice Impact Framework */}
                <div className="mt-16">
                  <h2 className="text-3xl font-bold text-center mb-4">Bicycle Justice Impact Framework</h2>
                  <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                    The four-part process followed by cities that successfully embraced cycling as a form of urban justice
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {bicycleJusticeImpactTypes.map((impact, index) => (
                      <motion.div
                        key={impact.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden h-full transition-all hover:shadow-lg border-l-4" style={{ borderLeftColor: impact.color }}>
                          <div className="aspect-video w-full overflow-hidden">
                            <img 
                              src={impact.imageUrl}
                              alt={impact.title}
                              className="object-cover w-full h-full transform transition-transform hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-2xl font-bold" style={{ color: impact.color }}>
                                {index + 1}. {impact.title}
                              </h3>
                              <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center" 
                                style={{ backgroundColor: `${impact.color}20`, color: impact.color }}
                              >
                                <impact.icon size={24} />
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground text-lg mb-6">
                              {impact.description} in {selectedCity.name}
                            </p>
                            
                            {/* City-specific data with info tooltip */}
                            {impact.cityData && impact.cityData[selectedCity.id as keyof typeof impact.cityData] && (
                              <div className="mb-5 p-3 bg-slate-50 rounded-md flex items-start">
                                <LineChart className="shrink-0 mt-1 mr-2 h-5 w-5 text-muted-foreground" />
                                <p className="text-sm italic">
                                  {impact.cityData[selectedCity.id as keyof typeof impact.cityData]}
                                </p>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 shrink-0">
                                        <Info className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-xs text-xs">Data sourced from city transportation departments and academic research</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {impact.steps.map((step, i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded-md hover:shadow-md transition-shadow">
                                  <h4 className="font-semibold">{step.title}</h4>
                                  <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
                        <p className="mb-4">Understanding the fundamental needs for cycling justice in {selectedCity.name}</p>
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
                        <p className="mb-4">The logical framework for cycling justice in {selectedCity.name}</p>
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

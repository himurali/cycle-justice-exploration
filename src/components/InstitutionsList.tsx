
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaginationControl } from '@/components/ui/pagination-control';

export interface Institution {
  id: string;
  name: string;
  location: string;
  continent: string;
  description: string;
  image: string;
  website: string;
  researchAreas: string[];
  keyProjects: {
    title: string;
    description: string;
  }[];
}

interface InstitutionsListProps {
  institutions: Institution[];
}

export default function InstitutionsList({ institutions }: InstitutionsListProps) {
  const [selectedContinent, setSelectedContinent] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  
  const continents = useMemo(() => {
    const continentSet = new Set<string>();
    institutions.forEach(institution => {
      if (institution.continent) {
        continentSet.add(institution.continent);
      }
    });
    return Array.from(continentSet).sort();
  }, [institutions]);
  
  const filteredInstitutions = useMemo(() => {
    if (selectedContinent === "all") {
      return institutions;
    }
    return institutions.filter(institution => institution.continent === selectedContinent);
  }, [institutions, selectedContinent]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedContinent, itemsPerPage]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInstitutions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="relative mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply" />
        <div className="relative h-48 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Research Institutions
            </h1>
            <p className="text-white/90 text-lg">
              Leading centers studying active mobility and urban transformation
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Continent Filter */}
        <Tabs defaultValue="all" value={selectedContinent} onValueChange={setSelectedContinent}>
          <TabsList>
            <TabsTrigger value="all">All Continents</TabsTrigger>
            {continents.map(continent => (
              <TabsTrigger key={continent} value={continent}>{continent}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Pagination Control */}
        <PaginationControl
          totalItems={filteredInstitutions.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[3, 6, 9, 12, 15]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((institution, index) => (
          <motion.div
            key={institution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border border-border/40">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={institution.image}
                  alt={institution.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h2 className="text-lg font-bold text-white">{institution.name}</h2>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Globe className="w-4 h-4 mr-1" />
                  <span className="truncate">{institution.location}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-6 w-6"
                    onClick={() => window.open(institution.website, '_blank')}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {institution.description}
                </p>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {institution.researchAreas.slice(0, 2).map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {institution.researchAreas.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{institution.researchAreas.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium mb-1">Key Project:</div>
                  <div className="bg-muted p-2 rounded-sm">
                    <div className="font-medium text-xs">{institution.keyProjects[0].title}</div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {institution.keyProjects[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredInstitutions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No institutions found for this continent.</p>
        </div>
      )}
    </>
  );
}

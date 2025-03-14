import React, { useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Share2, Clock, Play, ExternalLink } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import shortFilmsData from "@/constants/shortFilms.json";

// Types for our film data
type FilmTag = string;
type Continent = "Africa" | "Asia" | "Europe" | "North America" | "South America" | "Australia" | "Antarctica";

interface Film {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  tags: FilmTag[];
  continent: Continent;
  videoUrl: string;
}

// Define all continents for filter
const continents: ("All Continents" | Continent)[] = [
  "All Continents",
  "Africa",
  "Asia",
  "Europe", 
  "North America",
  "South America", 
  "Australia", 
  "Antarctica"
];

// Parse the JSON data to ensure it matches our Film type
const films: Film[] = shortFilmsData as Film[];

const ShortFilms = () => {
  // State for filtering and pagination
  const [selectedContinent, setSelectedContinent] = useState<"All Continents" | Continent>("All Continents");
  const [itemsPerPage, setItemsPerPage] = useState<string>("6");
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Filter films by selected continent
  const filteredFilms = selectedContinent === "All Continents" 
    ? films 
    : films.filter(film => film.continent === selectedContinent);
  
  // Calculate pagination
  const totalItems = filteredFilms.length;
  const totalPages = Math.ceil(totalItems / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const endIndex = Math.min(startIndex + parseInt(itemsPerPage), totalItems);
  const currentItems = filteredFilms.slice(startIndex, endIndex);
  
  // Handle continent filter change
  const handleContinentChange = (continent: "All Continents" | Continent) => {
    setSelectedContinent(continent);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Handle opening video URL in new tab
  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle sharing the video
  const handleShareClick = (event: React.MouseEvent, film: Film) => {
    event.stopPropagation(); // Prevent triggering the card click
    
    if (navigator.share) {
      navigator.share({
        title: film.title,
        text: film.description,
        url: film.videoUrl,
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(film.videoUrl)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(err => {
          console.log('Error copying to clipboard:', err);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="pt-20">
        {/* Header Section - moved below the NavBar with padding top to avoid overlap */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-600 py-16 px-4 rounded-b-3xl mb-8">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-baskerville">Short Films</h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Quick insights into cycling justice and urban transformation
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 pb-16">
          {/* Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {continents.map((continent) => (
                <button
                  key={continent}
                  onClick={() => handleContinentChange(continent)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedContinent === continent
                      ? "bg-gray-200 text-gray-800"
                      : "bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {continent}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 self-end md:self-auto">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Items per page:</span>
                <Select
                  value={itemsPerPage}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="w-16 h-9">
                    <SelectValue placeholder="6" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-sm text-gray-500">
                {totalItems > 0 ? `${startIndex + 1}-${endIndex} of ${totalItems}` : "0 items"}
              </div>
            </div>
          </div>

          {/* Films Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentItems.map((film) => (
              <Card 
                key={film.id} 
                className="overflow-hidden hover:shadow-md transition-shadow duration-300 group cursor-pointer"
                onClick={() => handleVideoClick(film.videoUrl)}
              >
                <div className="relative">
                  <img 
                    src={film.thumbnail} 
                    alt={film.title}
                    className="w-full h-48 object-cover group-hover:brightness-75 transition-all"
                  />
                  <div className="absolute top-2 right-2 bg-gray-200/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {film.duration}
                  </div>
                  
                  {/* Play icon overlay that appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="rounded-full bg-black/50 p-3">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{film.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-gray-600"
                      onClick={(e) => handleShareClick(e, film)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{film.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {film.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Globe className="h-4 w-4 mr-1" />
                      {film.continent}
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ShortFilms;

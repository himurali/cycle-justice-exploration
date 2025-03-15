
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { StoryMeta, getStoriesByCategory } from '@/lib/markdown';

// Types
type Continent = "Africa" | "Asia" | "Europe" | "North America" | "South America" | "Australia" | "Antarctica";

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

const AdvocateStories = () => {
  // State for filtering and pagination
  const [selectedContinent, setSelectedContinent] = useState<"All Continents" | Continent>("All Continents");
  const [itemsPerPage, setItemsPerPage] = useState<string>("6");
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Get advocacy stories from markdown files
  const advocacyStories = getStoriesByCategory('advocacy');
  
  // Filter stories by selected continent
  const filteredStories = selectedContinent === "All Continents" 
    ? advocacyStories 
    : advocacyStories.filter(story => story.continent === selectedContinent);
  
  // Calculate pagination
  const totalItems = filteredStories.length;
  const totalPages = Math.ceil(totalItems / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const endIndex = Math.min(startIndex + parseInt(itemsPerPage), totalItems);
  const currentItems = filteredStories.slice(startIndex, endIndex);
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="section pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-baskerville font-medium mb-4">Advocate Stories</h1>
              <p className="text-lg text-justice-text/80 max-w-3xl mx-auto">
                Stories of individuals advocating for safer streets and urban justice.
              </p>
            </div>
            
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
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="text-sm text-gray-500">
                  {totalItems > 0 ? `${startIndex + 1}-${endIndex} of ${totalItems}` : "0 items"}
                </div>
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {currentItems.map((story) => (
                <div key={story.slug} className="relative">
                  <StoryCard
                    image={story.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
                    headline={story.title}
                    subhead={`Published: ${story.date}`}
                    description={story.excerpt}
                    primaryButtonLabel="Read Story"
                    secondaryButtonLabel="Advocacy"
                    slug={story.slug}
                    author={story.author}
                  />
                  {/* Continent badge */}
                  {story.continent && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-sm">
                      <Globe className="h-3 w-3 mr-1 text-gray-600" />
                      <span className="text-gray-800">{story.continent}</span>
                    </div>
                  )}
                </div>
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdvocateStories;

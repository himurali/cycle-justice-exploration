
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Globe, Search, Tag as TagIcon } from "lucide-react";
import { StoryMeta, getStoriesByCategory, getAllTags } from '@/lib/markdown';

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  // Get advocacy stories from markdown files
  const advocacyStories = getStoriesByCategory('advocacy');
  
  // Load all available tags
  useEffect(() => {
    setAllTags(getAllTags());
  }, []);
  
  // Handle tag selection
  const handleTagClick = (tag: string) => {
    if (!activeTags.includes(tag)) {
      setActiveTags([...activeTags, tag]);
      setCurrentPage(1); // Reset to first page when filter changes
    }
  };
  
  // Remove a tag from filter
  const removeTag = (tag: string) => {
    setActiveTags(activeTags.filter(t => t !== tag));
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  // Clear all active tag filters
  const clearAllTags = () => {
    setActiveTags([]);
    setCurrentPage(1);
  };
  
  // Filter stories by selected continent and active tags
  const filteredStories = advocacyStories.filter(story => {
    // Filter by continent
    const matchesContinent = selectedContinent === "All Continents" || 
                            story.continent === selectedContinent;
    
    // Filter by tags
    const matchesTags = activeTags.length === 0 || 
                        (story.tags && activeTags.every(tag => story.tags?.includes(tag)));
    
    // Filter by search term (in title, excerpt, or author)
    const matchesSearch = searchTerm === "" ||
                         story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (story.author && story.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (story.tags && story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchesContinent && matchesTags && matchesSearch;
  });
  
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
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
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
            
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search stories, authors, or tags..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-9 pr-4 w-full"
                />
              </div>
              
              {/* Continent filters */}
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
              
              {/* Active tags */}
              {activeTags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500 flex items-center">
                    <TagIcon className="h-3.5 w-3.5 mr-1" />
                    Active tags:
                  </span>
                  
                  {activeTags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="flex items-center gap-1 bg-gray-100"
                    >
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-gray-900" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                  
                  <button 
                    onClick={clearAllTags}
                    className="text-xs text-gray-500 hover:text-gray-900 underline ml-2"
                  >
                    Clear all
                  </button>
                </div>
              )}
              
              {/* Items per page */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {totalItems} {totalItems === 1 ? 'story' : 'stories'} found
                </p>
                
                <div className="flex items-center gap-4">
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
            </div>
            
            {/* Story Grid */}
            {currentItems.length > 0 ? (
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
                      tags={story.tags}
                      onTagClick={handleTagClick}
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
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                <TagIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No stories found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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

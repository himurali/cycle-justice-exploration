
import React, { useState, useEffect } from "react";
import { Search, ArrowDown, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import ResearchCard from "@/components/ResearchCard";
import { getAllResearchPapers, getUniqueResearchTags, ResearchPaper, ResearchTag } from "@/lib/research";

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<ResearchTag[]>([]);
  const [allPapers, setAllPapers] = useState<ResearchPaper[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>([]);
  const [sortOrder, setSortOrder] = useState<"title" | "year">("year");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  const allTags = getUniqueResearchTags();
  
  useEffect(() => {
    const papers = getAllResearchPapers();
    setAllPapers(papers);
    setFilteredPapers(papers);
  }, []);

  useEffect(() => {
    let results = [...allPapers];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(paper => 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply tag filters
    if (activeTags.length > 0) {
      results = results.filter(paper => 
        activeTags.some(tag => paper.tags.includes(tag))
      );
    }
    
    // Apply sorting
    results = results.sort((a, b) => {
      if (sortOrder === "year") {
        return sortDirection === "asc" ? a.year - b.year : b.year - a.year;
      } else {
        return sortDirection === "asc" 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
    });
    
    setFilteredPapers(results);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, activeTags, sortOrder, sortDirection, allPapers]);

  const toggleTag = (tag: ResearchTag) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const toggleSort = (field: "title" | "year") => {
    if (sortOrder === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortOrder(field);
      setSortDirection("asc");
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPapers = filteredPapers.slice(startIndex, startIndex + itemsPerPage);
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="mx-auto py-0 px-4 max-w-7xl">
      {/* Header with gradient */}
      <div className="w-full py-12 mb-8 bg-gradient-to-r from-gray-900 to-gray-400 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Research Papers</h1>
        <p className="text-lg text-gray-200">
          Key academic papers on cycling and urban mobility
        </p>
      </div>
      
      {/* Search and filters area */}
      <div className="mx-auto max-w-5xl">
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search papers..."
            className="pl-10 border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Sorting and items per page */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleSort("year")}
              className="border-gray-300 text-gray-700"
            >
              Year {sortOrder === "year" && (
                sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toggleSort("title")}
              className="border-gray-300 text-gray-700"
            >
              Title {sortOrder === "title" && (
                sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Items per page:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
            >
              <SelectTrigger className="w-20 border-gray-300">
                <SelectValue placeholder="6" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="12">12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeTags.includes(tag)
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              } transition-colors`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Found {filteredPapers.length} papers
          {currentPage > 1 && filteredPapers.length > itemsPerPage && 
            ` • ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredPapers.length)} of ${filteredPapers.length}`
          }
        </p>
      </div>
      
      {/* Papers grid */}
      {paginatedPapers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {paginatedPapers.map((paper) => (
            <ResearchCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No papers match your search criteria</p>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mb-8">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => goToPage(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
          
          <div className="ml-4 text-sm text-gray-500 flex items-center">
            1-{totalPages} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default Research;


import React, { useState, useEffect } from "react";
import { Search, ArrowUpDown } from "lucide-react";
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
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header with gradient */}
      <div className="w-full py-12 mb-8 text-center rounded-lg bg-gradient-to-r from-gray-900 to-gray-500">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Vision Docs</h1>
        <p className="text-lg text-gray-200">
          Exploring equity, access, and sustainability in urban mobility
        </p>
      </div>
      
      {/* Research Categories */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <Button asChild variant="outline">
          <Link to="/vision-docs">All Research</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/equity">Equity & Justice</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/infrastructure">Infrastructure</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/health">Health</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/policy">Policy</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/climate">Climate</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/vision-docs/economics">Economics</Link>
        </Button>
      </div>
      
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search papers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={activeTags.includes(tag) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTag(tag)}
            className="text-xs"
          >
            {tag}
          </Button>
        ))}
      </div>
      
      {/* Sorting and items per page */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toggleSort("year")}
            className="gap-2"
          >
            Year
            <ArrowUpDown size={16} className={sortOrder === "year" ? "opacity-100" : "opacity-50"} />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toggleSort("title")}
            className="gap-2"
          >
            Title
            <ArrowUpDown size={16} className={sortOrder === "title" ? "opacity-100" : "opacity-50"} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Items per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(parseInt(value))}
          >
            <SelectTrigger className="w-20">
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
      
      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        Found {filteredPapers.length} papers
        {currentPage > 1 && filteredPapers.length > itemsPerPage && 
          ` • Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredPapers.length)} of ${filteredPapers.length}`
        }
      </p>
      
      {/* Papers grid */}
      {paginatedPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
        <Pagination className="my-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNumber: number;
              
              // Logic to handle showing pages around current page
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={pageNumber === currentPage}
                    onClick={() => goToPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => goToPage(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Research;

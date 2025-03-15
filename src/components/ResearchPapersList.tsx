
import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllResearchPapers, getUniqueResearchTags, ResearchPaper, ResearchTag } from '@/lib/research';

interface ResearchPapersListProps {
  papers?: ResearchPaper[];
}

export default function ResearchPapersList({ papers: initialPapers }: ResearchPapersListProps) {
  const allPapers = initialPapers || getAllResearchPapers();
  const allTags = getUniqueResearchTags();
  
  const [papers, setPapers] = useState<ResearchPaper[]>(allPapers);
  const [activeTagFilter, setActiveTagFilter] = useState<ResearchTag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'title'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  // Filter and sort papers when dependencies change
  useEffect(() => {
    let filtered = [...allPapers];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(paper => 
        paper.title.toLowerCase().includes(query) ||
        paper.abstract.toLowerCase().includes(query) ||
        paper.authors.some(author => author.toLowerCase().includes(query)) ||
        paper.journal.toLowerCase().includes(query) ||
        paper.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply tag filter
    if (activeTagFilter) {
      filtered = filtered.filter(paper => paper.tags.includes(activeTagFilter));
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'year') {
        return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
      } else {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
    });
    
    setPapers(filtered);
    setPage(1); // Reset to first page when filters change
  }, [allPapers, searchQuery, activeTagFilter, sortBy, sortOrder]);
  
  // Calculate pagination
  const totalPages = Math.ceil(papers.length / itemsPerPage);
  const paginatedPapers = papers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-8 rounded-lg text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Research Papers</h1>
        <p className="text-gray-200 max-w-3xl">
          Exploring equity, access, and sustainability in urban mobility
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            placeholder="Search papers by title, author, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex gap-2 items-center">
          <span className="whitespace-nowrap">Sort by:</span>
          <Button
            variant={sortBy === 'year' ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSortBy('year');
              setSortOrder(sortBy === 'year' && sortOrder === 'desc' ? 'asc' : 'desc');
            }}
            className="flex items-center gap-1"
          >
            Year
            {sortBy === 'year' && (
              <span className="text-xs">
                {sortOrder === 'desc' ? '↓' : '↑'}
              </span>
            )}
          </Button>
          <Button
            variant={sortBy === 'title' ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSortBy('title');
              setSortOrder(sortBy === 'title' && sortOrder === 'desc' ? 'asc' : 'desc');
            }}
            className="flex items-center gap-1"
          >
            Title
            {sortBy === 'title' && (
              <span className="text-xs">
                {sortOrder === 'desc' ? '↓' : '↑'}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      {/* Tag filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-500">Filter by tags:</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={activeTagFilter === tag ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => setActiveTagFilter(activeTagFilter === tag ? null : tag)}
            >
              {tag.replace('-', ' ')}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing {paginatedPapers.length} of {papers.length} papers
      </div>
      
      {/* Papers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedPapers.map((paper) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{paper.title}</h2>
              <a 
                href={paper.url} 
                target="_blank" 
                rel="noreferrer" 
                className="text-primary hover:text-primary/80"
              >
                <ExternalLink size={18} />
              </a>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <span>{paper.authors.join(', ')}</span>
              <span className="mx-2">•</span>
              <span>{paper.year}</span>
            </div>
            
            <p className="text-sm text-gray-600 italic mb-3">{paper.journal}</p>
            
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">{paper.abstract}</p>
            
            <div className="flex flex-wrap gap-1.5">
              {paper.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <span className="text-sm text-gray-500">Items per page:</span>
            <Select 
              value={String(itemsPerPage)} 
              onValueChange={value => setItemsPerPage(Number(value))}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="12">12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <div className="flex items-center mx-2">
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

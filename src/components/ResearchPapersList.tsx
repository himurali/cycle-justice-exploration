
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Users, ExternalLink, Search, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaginationControl } from '@/components/ui/pagination-control';
import { ResearchPaper, getUniqueResearchTags } from '@/lib/research';

interface ResearchPapersListProps {
  papers: ResearchPaper[];
}

export default function ResearchPapersList({ papers }: ResearchPapersListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'year' | 'title'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Get unique tags from all papers
  const allTags = useMemo(() => {
    const tags = getUniqueResearchTags();
    return Array.from(tags).sort();
  }, []);

  // Filter and sort papers
  const filteredAndSortedPapers = useMemo(() => {
    return papers
      .filter(paper => {
        const matchesSearch = searchQuery.toLowerCase() === '' ||
          paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          paper.journal.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTags = selectedTags.length === 0 ||
          selectedTags.every(tag => paper.tags.includes(tag));

        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        if (sortBy === 'year') {
          return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
        } else {
          return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
      });
  }, [papers, searchQuery, selectedTags, sortBy, sortOrder]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, sortBy, sortOrder, itemsPerPage]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPapers = filteredAndSortedPapers.slice(indexOfFirstItem, indexOfLastItem);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleSort = (field: 'year' | 'title') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <>
      <div className="relative mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply" />
        <div className="relative h-48 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Research Papers
            </h1>
            <p className="text-white/90 text-lg">
              Key academic papers on cycling and urban mobility
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {/* Search and Sort Controls */}
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground h-4 w-4" />
              <Input
                placeholder="Search papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => toggleSort('year')}
                className={sortBy === 'year' ? 'border-primary' : ''}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Year {sortBy === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button
                variant="outline"
                onClick={() => toggleSort('title')}
                className={sortBy === 'title' ? 'border-primary' : ''}
              >
                <SortAsc className="mr-2 h-4 w-4" />
                Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>

          {/* Pagination Control - Moved to top */}
          {filteredAndSortedPapers.length > 0 && (
            <PaginationControl
              totalItems={filteredAndSortedPapers.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
              itemsPerPageOptions={[4, 6, 8, 10, 20]}
            />
          )}
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className="cursor-pointer hover:opacity-80"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-foreground">
        Found {filteredAndSortedPapers.length} papers
      </div>

      {/* Papers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPapers.map((paper, index) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden bg-card hover:shadow-xl transition-all duration-300 border border-border/40">
              <div className="p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2 line-clamp-2 text-foreground">{paper.title}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-foreground">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1.5" />
                        <span className="line-clamp-1">{paper.authors.join(', ')}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {paper.year}
                      </div>
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1.5" />
                        {paper.journal}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(paper.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-foreground line-clamp-3">
                    {paper.abstract}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:opacity-80 text-xs"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {currentPapers.length === 0 && (
          <div className="col-span-full text-center py-12 text-foreground">
            No papers found matching your criteria
          </div>
        )}
      </div>
    </>
  );
}

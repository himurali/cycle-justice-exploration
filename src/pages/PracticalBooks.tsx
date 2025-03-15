import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { BookOpen, Globe, ExternalLink } from 'lucide-react';
import { getPracticalBooks, getBooksByRegion, BookItem } from '@/lib/books';

const PracticalBooks = () => {
  const [books] = useState<BookItem[]>(getPracticalBooks());
  const [region, setRegion] = useState<string>('All Continents');
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  
  const filteredBooks = region === 'All Continents' 
    ? books 
    : books.filter(book => book.region === region);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero section with gradient background */}
        <section className="bg-gradient-to-r from-green-900 to-green-700 py-16 md:py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-baskerville font-bold mb-6">
              Practical Books
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-200 mb-12">
              Hands-on guides for cycling advocacy and urban design
            </p>
          </div>
        </section>
        
        {/* Filter section */}
        <section className="py-8 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Tabs defaultValue="All Continents" className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger 
                    value="All Continents" 
                    onClick={() => setRegion('All Continents')}
                    className={region === 'All Continents' ? 'bg-white shadow' : ''}
                  >
                    All Continents
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Asia" 
                    onClick={() => setRegion('Asia')}
                    className={region === 'Asia' ? 'bg-white shadow' : ''}
                  >
                    Asia
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Europe" 
                    onClick={() => setRegion('Europe')}
                    className={region === 'Europe' ? 'bg-white shadow' : ''}
                  >
                    Europe
                  </TabsTrigger>
                  <TabsTrigger 
                    value="North America" 
                    onClick={() => setRegion('North America')}
                    className={region === 'North America' ? 'bg-white shadow' : ''}
                  >
                    North America
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <Select defaultValue="6" onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="6" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
                
                <span className="text-sm text-gray-500">1-{filteredBooks.length} of {filteredBooks.length}</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Books grid section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.slice(0, itemsPerPage).map((book) => (
                <div key={book.id} className="flex flex-col h-full">
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1 font-baskerville leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-sm">By {book.author}</p>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {book.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {book.tags?.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Globe className="h-4 w-4 mr-1" />
                      <span>{book.region || 'Global'}</span>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-sm gap-1">
                      Read more
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                {filteredBooks.length > itemsPerPage && (
                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </section>
        
        {/* Other book categories navigation */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-baskerville font-semibold text-center mb-8">Explore Other Book Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link to="/essential-books" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-baskerville text-xl mb-2">Essential Reading</h3>
                <p className="text-gray-700">Foundational books on cycling advocacy, urban transformation, and mobility justice.</p>
              </Link>
              <Link to="/academic-books" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-baskerville text-xl mb-2">Academic Works</h3>
                <p className="text-gray-700">Research-based books examining cycling policy, infrastructure development, and social equity.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PracticalBooks;

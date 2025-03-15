import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPracticalBooks, BookItem } from '@/lib/books';

const PracticalBooks = () => {
  const [books] = useState<BookItem[]>(getPracticalBooks());

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-baskerville font-bold text-center mb-6 text-justice-text">
              Practical Guides
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-justice-text/80 mb-12">
              Hands-on manuals and guides for city planners, activists, and everyday cyclists. These books provide 
              actionable advice for implementing cycling infrastructure, building advocacy campaigns, and developing cycling skills.
            </p>
          </div>
        </section>
        
        {/* Books section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-12">
              <BookMarked className="h-8 w-8 text-justice-blue mr-4" />
              <h2 className="text-3xl font-baskerville font-semibold text-justice-text">Practical Guides</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <Card key={book.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 h-48 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="font-baskerville text-xl">{book.title}</CardTitle>
                    <CardDescription>
                      <span className="font-medium">{book.author}</span> • {book.publishYear}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-justice-text/80 mb-4">{book.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Reviews:</h4>
                      {book.reviews && book.reviews.map((review, idx) => (
                        <div key={idx} className="mb-3 border-l-2 border-justice-blue pl-3">
                          <div className="flex items-center mb-1">
                            <span className="font-medium">{review.author}</span>
                            <div className="ml-2 flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm italic">"{review.text}"</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {book.tags?.map(tag => (
                        <span key={tag} className="text-xs bg-justice-blue/10 text-justice-blue px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 text-sm text-justice-text/60">
                    {book.publisher} • {book.pages} pages
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Other book categories navigation */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-baskerville font-semibold text-center mb-8">Explore Other Book Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link to="/essential-books" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-baskerville text-xl mb-2">Essential Reading</h3>
                <p className="text-justice-text/70">Foundational books on cycling advocacy, urban transformation, and mobility justice.</p>
              </Link>
              <Link to="/academic-books" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-baskerville text-xl mb-2">Academic Works</h3>
                <p className="text-justice-text/70">Research-based books examining cycling policy, infrastructure development, and social equity.</p>
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

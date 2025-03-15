import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { BookOpen } from 'lucide-react';
import { getAcademicBooks, BookItem } from '@/lib/books';
import BookCard from '@/components/BookCard';

const AcademicBooks = () => {
  const [books] = useState<BookItem[]>(getAcademicBooks());

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-baskerville font-bold text-center mb-4 text-justice-text">
              Academic Works
            </h1>
            <p className="text-lg text-center max-w-3xl mx-auto text-justice-text/80 mb-8">
              Scholarly books examining cycling policy, infrastructure development, and social equity. 
              These research-based works offer data-driven perspectives and theoretical frameworks 
              for understanding urban mobility.
            </p>
          </div>
        </section>
        
        {/* Books section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <BookOpen className="h-7 w-7 text-justice-blue mr-3" />
              <h2 className="text-2xl font-baskerville font-semibold text-justice-text">Academic Works</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Other book categories navigation */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-baskerville font-semibold text-center mb-6">Explore Other Book Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link to="/essential-books" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-baskerville text-lg mb-1">Essential Reading</h3>
                <p className="text-sm text-justice-text/70">Foundational books on cycling advocacy, urban transformation, and mobility justice.</p>
              </Link>
              <Link to="/practical-books" className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-baskerville text-lg mb-1">Practical Guides</h3>
                <p className="text-sm text-justice-text/70">Hands-on manuals for city planners, activists, and everyday cyclists.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AcademicBooks;

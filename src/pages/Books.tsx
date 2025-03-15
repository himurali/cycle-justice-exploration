
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { BookOpen, GraduationCap, BookMarked } from 'lucide-react';

const Books = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-baskerville font-bold text-center mb-6 text-justice-text">
              Cycling Justice Books
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-justice-text/80 mb-12">
              Explore our curated collection of books on cycling advocacy, policy, urban planning, and social justice.
            </p>
          </div>
        </section>
        
        {/* Book Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link to="/essential-books" className="block p-8 bg-gray-50 rounded-lg hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-justice-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <BookOpen className="h-12 w-12 text-justice-blue mb-4" />
                  <h2 className="text-2xl font-baskerville font-semibold mb-3">Essential Reading</h2>
                  <p className="text-justice-text/80">
                    These foundational books provide compelling perspectives on cycling advocacy, urban transformation, and mobility justice.
                  </p>
                  <div className="mt-6 inline-flex items-center font-medium text-justice-blue">
                    Explore Essential Reading
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
              
              <Link to="/academic-books" className="block p-8 bg-gray-50 rounded-lg hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-justice-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <GraduationCap className="h-12 w-12 text-justice-blue mb-4" />
                  <h2 className="text-2xl font-baskerville font-semibold mb-3">Academic Works</h2>
                  <p className="text-justice-text/80">
                    Research-based books examining cycling policy, infrastructure development, social equity, and urban transformation.
                  </p>
                  <div className="mt-6 inline-flex items-center font-medium text-justice-blue">
                    Explore Academic Works
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
              
              <Link to="/practical-books" className="block p-8 bg-gray-50 rounded-lg hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-justice-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <BookMarked className="h-12 w-12 text-justice-blue mb-4" />
                  <h2 className="text-2xl font-baskerville font-semibold mb-3">Practical Guides</h2>
                  <p className="text-justice-text/80">
                    Hands-on manuals and guides for city planners, activists, and everyday cyclists with actionable advice.
                  </p>
                  <div className="mt-6 inline-flex items-center font-medium text-justice-blue">
                    Explore Practical Guides
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;

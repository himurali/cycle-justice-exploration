
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BookText, GraduationCap, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  category: 'essential' | 'academic' | 'practical';
  coverImage: string;
  publishYear: number;
  publisher?: string;
  pages?: number;
  tags?: string[];
}

const booksData: BookItem[] = [
  // Essential Reading
  {
    id: "bike-nation",
    title: "Bike Nation: How Cycling Can Save the World",
    author: "Peter Walker",
    description: "A passionate and persuasive case for the benefits of cycling to create more livable cities and healthier citizens. Walker shows how getting more people on bikes could transform our health, economy, and environment.",
    category: "essential",
    coverImage: "/placeholder.svg",
    publishYear: 2017,
    publisher: "Yellow Jersey Press",
    pages: 256,
    tags: ["urban planning", "advocacy", "health"]
  },
  {
    id: "street-fight",
    title: "Street Fight: Handbook for an Urban Revolution",
    author: "Janette Sadik-Khan",
    description: "Former NYC Transportation Commissioner shares how she transformed New York City's streets, challenging the status quo to create more people-friendly spaces including better bike infrastructure.",
    category: "essential",
    coverImage: "/placeholder.svg",
    publishYear: 2016,
    publisher: "Viking",
    pages: 368,
    tags: ["urban planning", "policy", "infrastructure"]
  },
  {
    id: "mobility-justice",
    title: "Mobility Justice: The Politics of Movement in an Age of Extremes",
    author: "Mimi Sheller",
    description: "An exploration of how power and inequality inform the governance and control of movement. The book argues for a new understanding of mobility rights and equity.",
    category: "essential",
    coverImage: "/placeholder.svg",
    publishYear: 2018,
    publisher: "Verso",
    pages: 288,
    tags: ["justice", "equity", "policy"]
  },
  
  // Academic Works
  {
    id: "cycling-cities",
    title: "Cycling Cities: The European Experience",
    author: "Ruth Oldenziel et al.",
    description: "Comparative historical analysis of cycling policy and culture across multiple European cities, showing how different approaches led to different outcomes for urban cycling.",
    category: "academic",
    coverImage: "/placeholder.svg",
    publishYear: 2016,
    publisher: "Foundation for the History of Technology",
    pages: 256,
    tags: ["research", "urban planning", "Europe"]
  },
  {
    id: "cycling-futures",
    title: "Cycling Futures: From Research into Practice",
    author: "Jennifer Bonham and Marilyn Johnson",
    description: "Collection of academic research on cycling policy, infrastructure, and promotion, with a focus on translating research findings into practical implementations.",
    category: "academic",
    coverImage: "/placeholder.svg",
    publishYear: 2015,
    publisher: "Routledge",
    pages: 324,
    tags: ["research", "policy", "implementation"]
  },
  {
    id: "bicycle-justice",
    title: "Bicycle Justice and Urban Transformation: Biking for All?",
    author: "Aaron Golub et al.",
    description: "Academic examination of cycling through the lens of social and environmental justice, addressing issues of access, equity, and inclusion in bicycle planning.",
    category: "academic",
    coverImage: "/placeholder.svg",
    publishYear: 2016,
    publisher: "Routledge",
    pages: 272,
    tags: ["equity", "justice", "inclusion"]
  },
  
  // Practical Guides
  {
    id: "urban-cycling",
    title: "Urban Cycling: How to Get to Work, Save Money, and Use Your Bike for City Living",
    author: "Madi Carlson",
    description: "Practical guide for everyday urban cyclists, offering tips on commuting, shopping, and navigating city streets safely and confidently.",
    category: "practical",
    coverImage: "/placeholder.svg",
    publishYear: 2015,
    publisher: "Mountaineers Books",
    pages: 224,
    tags: ["commuting", "skills", "urban"]
  },
  {
    id: "cycling-advocacy",
    title: "Building the Cycling City: The Dutch Blueprint for Urban Vitality",
    author: "Melissa and Chris Bruntlett",
    description: "Explores the evolution of Dutch cycling infrastructure and culture, and provides practical lessons for transforming car-centric cities worldwide.",
    category: "practical",
    coverImage: "/placeholder.svg",
    publishYear: 2018,
    publisher: "Island Press",
    pages: 224,
    tags: ["advocacy", "infrastructure", "Netherlands"]
  },
  {
    id: "bike-repair",
    title: "Zinn & the Art of Road Bike Maintenance",
    author: "Lennard Zinn",
    description: "Comprehensive guide to bicycle maintenance and repair, with step-by-step instructions for everything from basic maintenance to complex repairs.",
    category: "practical",
    coverImage: "/placeholder.svg",
    publishYear: 2016,
    publisher: "VeloPress",
    pages: 488,
    tags: ["maintenance", "repair", "skills"]
  }
];

const Books = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const hash = location.hash.replace('#', '');
    if (['essential-reading', 'academic-works', 'practical-guides'].includes(hash)) {
      return hash;
    }
    return 'essential-reading';
  });

  const scrollToSection = (sectionId: string) => {
    setActiveCategory(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.history.pushState(null, '', `#${sectionId}`);
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  const getFilteredBooks = (category: string) => {
    switch (category) {
      case 'essential-reading':
        return booksData.filter(book => book.category === 'essential');
      case 'academic-works':
        return booksData.filter(book => book.category === 'academic');
      case 'practical-guides':
        return booksData.filter(book => book.category === 'practical');
      default:
        return booksData;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'essential-reading':
        return <BookOpen className="h-6 w-6 text-justice-blue" />;
      case 'academic-works':
        return <GraduationCap className="h-6 w-6 text-justice-blue" />;
      case 'practical-guides':
        return <BookMarked className="h-6 w-6 text-justice-blue" />;
      default:
        return <BookText className="h-6 w-6 text-justice-blue" />;
    }
  };

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
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection('essential-reading')}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-colors",
                  activeCategory === 'essential-reading' 
                    ? "bg-justice-blue text-white" 
                    : "bg-white text-justice-text border border-gray-200 hover:bg-gray-100"
                )}
              >
                Essential Reading
              </button>
              <button
                onClick={() => scrollToSection('academic-works')}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-colors",
                  activeCategory === 'academic-works' 
                    ? "bg-justice-blue text-white" 
                    : "bg-white text-justice-text border border-gray-200 hover:bg-gray-100"
                )}
              >
                Academic Works
              </button>
              <button
                onClick={() => scrollToSection('practical-guides')}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-colors",
                  activeCategory === 'practical-guides' 
                    ? "bg-justice-blue text-white" 
                    : "bg-white text-justice-text border border-gray-200 hover:bg-gray-100"
                )}
              >
                Practical Guides
              </button>
            </div>
          </div>
        </section>
        
        {/* Essential Reading Section */}
        <section id="essential-reading" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-12">
              <BookOpen className="h-8 w-8 text-justice-blue mr-4" />
              <h2 className="text-3xl font-baskerville font-semibold text-justice-text">Essential Reading</h2>
            </div>
            <p className="text-lg text-justice-text/80 max-w-4xl mb-12">
              These foundational books provide compelling perspectives on cycling advocacy, urban transformation, and mobility justice. 
              Essential for anyone interested in how cycling can create more equitable, sustainable cities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredBooks('essential-reading').map((book) => (
                <Card key={book.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-baskerville text-xl">{book.title}</CardTitle>
                    <CardDescription>
                      <span className="font-medium">{book.author}</span> • {book.publishYear}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-justice-text/80">{book.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
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
        
        {/* Academic Works Section */}
        <section id="academic-works" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-12">
              <GraduationCap className="h-8 w-8 text-justice-blue mr-4" />
              <h2 className="text-3xl font-baskerville font-semibold text-justice-text">Academic Works</h2>
            </div>
            <p className="text-lg text-justice-text/80 max-w-4xl mb-12">
              Research-based books examining cycling policy, infrastructure development, social equity, and urban transformation 
              through an academic lens. These works provide evidence-based insights for policy makers and advocates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredBooks('academic-works').map((book) => (
                <Card key={book.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-baskerville text-xl">{book.title}</CardTitle>
                    <CardDescription>
                      <span className="font-medium">{book.author}</span> • {book.publishYear}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-justice-text/80">{book.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
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
        
        {/* Practical Guides Section */}
        <section id="practical-guides" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-12">
              <BookMarked className="h-8 w-8 text-justice-blue mr-4" />
              <h2 className="text-3xl font-baskerville font-semibold text-justice-text">Practical Guides</h2>
            </div>
            <p className="text-lg text-justice-text/80 max-w-4xl mb-12">
              Hands-on manuals and guides for city planners, activists, and everyday cyclists. These books provide 
              actionable advice for implementing cycling infrastructure, building advocacy campaigns, and developing cycling skills.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredBooks('practical-guides').map((book) => (
                <Card key={book.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-baskerville text-xl">{book.title}</CardTitle>
                    <CardDescription>
                      <span className="font-medium">{book.author}</span> • {book.publishYear}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-justice-text/80">{book.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;

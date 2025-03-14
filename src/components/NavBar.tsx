
import { useState, useEffect } from 'react';
import { Bike } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  // New menu items
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'stories', label: 'Stories' },
    { id: 'videos', label: 'Videos' },
    { id: 'inequities', label: 'Inequities' },
    { id: 'books', label: 'Books' },
    { id: 'research', label: 'Research' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a 
              href="#top" 
              className="flex items-center group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Bike 
                className="text-justice-blue mr-2 transition-transform duration-300 group-hover:scale-110" 
                size={28} 
              />
              <span className="font-medium text-xl">Cycle Justice</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.slice(0, -1).map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-medium text-justice-text/80 hover:text-justice-blue transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('research')}
              className="font-medium px-4 py-2 rounded-full bg-justice-blue text-white hover:bg-justice-blue/90 transition-colors"
            >
              Research
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group p-2 rounded-md inline-flex items-center justify-center"
              aria-expanded="false"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-justice-dark transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`block h-0.5 w-full bg-justice-dark transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block h-0.5 w-full bg-justice-dark transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass-card mx-4 divide-y divide-gray-100">
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left px-5 py-3 font-medium text-justice-text/80 hover:text-justice-blue hover:bg-justice-blue/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

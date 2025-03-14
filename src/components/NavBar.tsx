
import { useState, useEffect } from 'react';
import { Bike, Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
    setActiveDropdown(null);
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  const navigationItems = [
    { 
      id: 'home', 
      label: 'Home',
      href: '#home',
      hasSubmenu: false
    },
    { 
      id: 'transformation', 
      label: 'Transformation',
      href: '#transformation',
      hasSubmenu: true,
      submenu: [
        { label: 'Cities', href: '#cities' },
        { label: 'Policy Changes', href: '#policy-changes' }
      ]
    },
    { 
      id: 'stories', 
      label: 'Stories',
      href: '#stories',
      hasSubmenu: true,
      submenu: [
        { label: 'Advocate Stories', href: '#advocate-stories' },
        { label: 'City Transformations', href: '#city-transformations' },
        { label: 'Community Champions', href: '#community-champions' }
      ]
    },
    { 
      id: 'videos', 
      label: 'Videos',
      href: '#videos',
      hasSubmenu: true,
      submenu: [
        { label: 'Documentaries', href: '#documentaries' },
        { label: 'Short Films', href: '#short-films' },
        { label: 'Interviews', href: '#interviews' }
      ]
    },
    { 
      id: 'inequities', 
      label: 'Inequities',
      href: '#inequities',
      hasSubmenu: true,
      submenu: [
        { label: 'Multi-dimensional Inequities', href: '#multi-dimensional-inequities' }
      ]
    },
    { 
      id: 'books', 
      label: 'Books',
      href: '#books',
      hasSubmenu: true,
      submenu: [
        { label: 'Essential Reading', href: '#essential-reading' }
      ]
    },
    { 
      id: 'research', 
      label: 'Research',
      href: '#research',
      hasSubmenu: true,
      submenu: [
        { label: 'Studies', href: '#studies' },
        { label: 'Reports', href: '#reports' },
        { label: 'Academic Papers', href: '#papers' }
      ]
    }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        {/* Logo */}
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
          <span className="font-baskerville font-medium text-xl md:text-2xl">Cycle Justice</span>
        </a>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="md:hidden ml-3 text-gray-700 hover:text-justice-blue focus:outline-none focus:ring-2 focus:ring-justice-blue rounded-lg inline-flex items-center justify-center"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {!isMobileMenuOpen ? (
            <Menu className="w-6 h-6" />
          ) : (
            <X className="w-6 h-6" />
          )}
        </button>

        {/* Desktop & Mobile menu container */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`} id="mobile-menu">
          <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            {navigationItems.map((item) => (
              <li key={item.id} className="relative">
                {item.hasSubmenu ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.id)}
                      className="text-justice-text hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-justice-blue md:p-0 font-baskerville font-medium flex items-center justify-between w-full md:w-auto"
                    >
                      {item.label}
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      className={`${
                        activeDropdown === item.id ? 'block' : 'hidden'
                      } bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44 md:absolute md:left-0`}
                    >
                      <ul className="py-1">
                        {item.submenu?.map((subItem, idx) => (
                          <li key={idx}>
                            <a
                              href={subItem.href}
                              className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 font-baskerville"
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(subItem.href.substring(1));
                              }}
                            >
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={`${
                      item.id === 'home' 
                        ? 'bg-justice-blue md:bg-transparent text-white md:text-justice-blue' 
                        : 'text-justice-text hover:text-justice-blue'
                    } block pl-3 pr-4 py-2 md:p-0 rounded focus:outline-none font-baskerville font-medium`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

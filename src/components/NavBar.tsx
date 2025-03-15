import { useState, useEffect, useRef } from 'react';
import { Bike } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

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

  const toggleDropdown = (id: string) => {
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
      hasSubmenu: false,
      isPageLink: true,
      pagePath: '/'
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
      href: '/stories',
      hasSubmenu: true,
      isPageLink: true,
      submenu: [
        { label: 'Advocate Stories', href: '/advocate-stories', isPageLink: true },
        { label: 'City Transformations', href: '/city-transformations', isPageLink: true },
        { label: 'Community Champions', href: '/community-champions', isPageLink: true }
      ]
    },
    { 
      id: 'videos', 
      label: 'Videos',
      href: '#videos',
      hasSubmenu: true,
      submenu: [
        { label: 'Documentaries', href: '/documentaries', isPageLink: true },
        { label: 'Short Films', href: '/short-films', isPageLink: true },
        { label: 'Interviews', href: '/interviews', isPageLink: true }
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

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="md:hidden ml-3 text-gray-700 hover:text-justice-blue focus:outline-none focus:ring-2 focus:ring-justice-blue rounded-lg inline-flex items-center justify-center"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
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

        <div className="hidden md:flex md:w-auto" id="desktop-menu">
          <ul className="flex flex-row space-x-8 mt-0 text-base font-medium">
            {navigationItems.map((item) => (
              <li key={item.id} className="relative">
                {item.hasSubmenu ? (
                  <div 
                    className="relative" 
                    ref={el => dropdownRefs.current[item.id] = el}
                  >
                    <button 
                      onClick={() => toggleDropdown(item.id)}
                      className="text-justice-text hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:hover:text-justice-blue md:p-0 font-baskerville font-medium flex items-center justify-between w-full md:w-auto text-base"
                      aria-expanded={activeDropdown === item.id}
                    >
                      {item.label}
                      <svg className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''}`} 
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div 
                      className={`absolute z-10 bg-white rounded shadow-lg py-2 mt-1 w-48 transition-all duration-200 ${
                        activeDropdown === item.id ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                    >
                      <ul>
                        {item.submenu?.map((subItem, idx) => (
                          <li key={idx}>
                            {subItem.isPageLink ? (
                              <Link
                                to={subItem.href}
                                className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 font-baskerville text-base"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                {subItem.label}
                              </Link>
                            ) : (
                              <a
                                href={subItem.href}
                                className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 font-baskerville text-base"
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToSection(subItem.href.substring(1));
                                }}
                              >
                                {subItem.label}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  item.isPageLink ? (
                    <Link
                      to={item.pagePath || '/'}
                      className={`${
                        item.id === 'home' 
                          ? 'bg-justice-blue md:bg-transparent text-white md:text-justice-blue' 
                          : 'text-justice-text hover:text-justice-blue'
                      } block pl-3 pr-4 py-2 md:p-0 rounded focus:outline-none font-baskerville font-medium text-base`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={`${
                        item.id === 'home' 
                          ? 'bg-justice-blue md:bg-transparent text-white md:text-justice-blue' 
                          : 'text-justice-text hover:text-justice-blue'
                      } block pl-3 pr-4 py-2 md:p-0 rounded focus:outline-none font-baskerville font-medium text-base`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  )
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div 
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        } bg-white shadow-lg overflow-hidden`}
      >
        <div className="max-h-[80vh] overflow-y-auto divide-y divide-gray-100 px-4 py-3">
          {navigationItems.map((item) => (
            <div key={item.id} className="py-2">
              {item.hasSubmenu ? (
                <div className="py-2">
                  <div className="font-baskerville font-medium text-2xl mb-2">{item.label}</div>
                  <div className="ml-4 border-l-2 border-justice-blue pl-3 space-y-2">
                    {item.submenu?.map((subItem, idx) => (
                      subItem.isPageLink ? (
                        <Link
                          key={idx}
                          to={subItem.href}
                          className="font-baskerville block py-2 text-xl text-justice-text/80 hover:text-justice-blue transition-colors"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ) : (
                        <a
                          key={idx}
                          href={subItem.href}
                          className="font-baskerville block py-2 text-xl text-justice-text/80 hover:text-justice-blue transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(subItem.href.substring(1));
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {subItem.label}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              ) : (
                item.isPageLink ? (
                  <Link
                    to={item.pagePath || '/'}
                    className={`font-baskerville block py-3 text-2xl font-medium ${
                      item.id === 'research' ? 'text-justice-blue' : 'text-justice-text/80'
                    } hover:text-justice-blue hover:bg-justice-blue/5 transition-colors`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`font-baskerville block py-3 text-2xl font-medium ${
                      item.id === 'research' ? 'text-justice-blue' : 'text-justice-text/80'
                    } hover:text-justice-blue hover:bg-justice-blue/5 transition-colors`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

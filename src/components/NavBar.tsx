
import { useState, useEffect } from 'react';
import { Bike, ChevronDown } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  // Updated navigation structure with submenus to match the image
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
              <span className="font-baskerville font-medium text-xl md:text-2xl">Cycle Justice</span>
            </a>
          </div>

          {/* Desktop Navigation Menu - With improved alignment */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navigationItems.map(item => (
                  <NavigationMenuItem key={item.id} className="relative">
                    {item.hasSubmenu ? (
                      <>
                        <NavigationMenuTrigger
                          className="font-baskerville text-base md:text-lg font-medium text-justice-text/80 hover:text-justice-blue transition-colors bg-transparent hover:bg-transparent focus:bg-transparent px-4 py-2"
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="absolute">
                          <ul className="grid gap-3 p-4 min-w-[220px] bg-white">
                            {item.submenu?.map((subItem, idx) => (
                              <li key={idx}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={subItem.href}
                                    className="font-baskerville block select-none space-y-1 rounded-md p-3 text-base hover:bg-justice-blue/10 transition-colors hover:text-justice-blue"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      scrollToSection(subItem.href.substring(1));
                                    }}
                                  >
                                    <div className="text-sm md:text-base font-medium">{subItem.label}</div>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.id);
                        }}
                        className={cn(
                          "font-baskerville inline-flex items-center justify-center rounded-md text-base md:text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2",
                          item.id === 'research' 
                            ? "bg-justice-blue text-white hover:bg-justice-blue/90" 
                            : "font-medium text-justice-text/80 hover:text-justice-blue"
                        )}
                      >
                        {item.label}
                      </a>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
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

      {/* Mobile Menu - Better organized with clear visual hierarchy */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-[80vh] opacity-100 py-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white mx-4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto divide-y divide-gray-100">
          {navigationItems.map((item) => (
            <div key={item.id} className="py-2">
              {/* Main menu item */}
              {item.hasSubmenu ? (
                <div className="px-4 py-2">
                  <div className="font-baskerville font-medium text-xl mb-2">{item.label}</div>
                  {/* Submenu items with indentation */}
                  <div className="ml-4 border-l-2 border-justice-blue pl-3 space-y-2">
                    {item.submenu?.map((subItem, idx) => (
                      <a
                        key={idx}
                        href={subItem.href}
                        className="font-baskerville block py-2 text-lg text-justice-text/80 hover:text-justice-blue transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(subItem.href.substring(1));
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={item.href}
                  className={`font-baskerville block px-5 py-3 text-xl font-medium ${
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
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

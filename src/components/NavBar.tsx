
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

  // Navigation structure with submenus
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
        { label: 'Our Vision', href: '#vision' },
        { label: 'Justice Framework', href: '#framework' },
        { label: 'Policy Recommendations', href: '#policy' }
      ]
    },
    { 
      id: 'stories', 
      label: 'Stories',
      href: '#stories',
      hasSubmenu: true,
      submenu: [
        { label: 'Community Stories', href: '#community-stories' },
        { label: 'Personal Narratives', href: '#narratives' }
      ]
    },
    { 
      id: 'videos', 
      label: 'Videos',
      href: '#videos',
      hasSubmenu: false
    },
    { 
      id: 'inequities', 
      label: 'Inequities',
      href: '#inequities',
      hasSubmenu: true,
      submenu: [
        { label: 'Racial Disparities', href: '#racial' },
        { label: 'Economic Barriers', href: '#economic' },
        { label: 'Infrastructure Gaps', href: '#infrastructure' }
      ]
    },
    { 
      id: 'books', 
      label: 'Books',
      href: '#books',
      hasSubmenu: false
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

  // For mobile navigation, flatten the structure
  const getMobileMenuItems = () => {
    const items = [];
    
    navigationItems.forEach(item => {
      items.push(item);
      if (item.hasSubmenu && item.submenu) {
        item.submenu.forEach(subItem => {
          items.push({
            id: `${item.id}-${subItem.label.toLowerCase().replace(/\s+/g, '-')}`,
            label: `→ ${subItem.label}`,
            href: subItem.href,
            hasSubmenu: false
          });
        });
      }
    });
    
    return items;
  };

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

          {/* Desktop Navigation Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map(item => (
                  <NavigationMenuItem key={item.id}>
                    {item.hasSubmenu ? (
                      <>
                        <NavigationMenuTrigger
                          className="font-medium text-justice-text/80 hover:text-justice-blue transition-colors bg-transparent hover:bg-transparent focus:bg-transparent"
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 w-[220px]">
                            {item.submenu?.map((subItem, idx) => (
                              <li key={idx}>
                                <NavigationMenuLink asChild>
                                  <a
                                    href={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 hover:bg-justice-blue/10 transition-colors hover:text-justice-blue"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      scrollToSection(subItem.href.substring(1));
                                    }}
                                  >
                                    <div className="text-sm font-medium">{subItem.label}</div>
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
                          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2",
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

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass-card mx-4 max-h-[80vh] overflow-y-auto divide-y divide-gray-100">
          {getMobileMenuItems().map(item => (
            <button 
              key={item.id}
              onClick={() => {
                scrollToSection(item.href?.substring(1) || item.id);
              }}
              className={`block w-full text-left px-5 py-3 font-medium 
                ${item.label.startsWith('→') ? 'pl-8 text-sm text-justice-text/70' : 'text-justice-text/80'}
                ${item.id === 'research' && !item.label.startsWith('→') ? 'text-justice-blue' : ''}
                hover:text-justice-blue hover:bg-justice-blue/5 transition-colors`}
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

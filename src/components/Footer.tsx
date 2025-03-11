
import { Bike, Heart, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-justice-dark text-white/80 pb-8 pt-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Bike className="text-justice-blue mr-2" size={24} />
              <span className="font-medium text-lg text-white">Cycle Justice</span>
            </div>
            <p className="text-white/60 mb-4">
              Advocating for equitable, sustainable transportation through cycling in India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-justice-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-justice-blue transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-justice-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              {['Health', 'Environmental', 'Intergenerational', 'Economic', 'Political', 'Social'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-white/60 hover:text-justice-blue transition-colors"
                  >
                    {item} Inequities
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Research</a></li>
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Policy Proposals</a></li>
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Advocacy Toolkit</a></li>
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">News</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Join Our Mailing List</a></li>
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Volunteer</a></li>
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Donate</a></li>
              <li><a href="#" className="text-white/60 hover:text-justice-blue transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Cycle Justice. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500" />
            <span>for a more equitable world</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

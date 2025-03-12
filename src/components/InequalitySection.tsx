
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { InequalityData } from "../constants/inequalityData";

interface InequalitySectionProps {
  data: InequalityData;
  isReversed?: boolean;
  index: number;
}

const InequalitySection = ({ data, isReversed = false, index }: InequalitySectionProps) => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: imagesRef, isVisible: imagesVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const IconComponent = data.icon;
  
  return (
    <section
      id={data.id}
      className={`section py-28 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Brento Card Style Header */}
        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className={`relative mb-20 transition-opacity-transform ${cardVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="flex justify-center items-center mb-8">
            <div 
              className="w-20 h-20 flex items-center justify-center rounded-2xl shadow-lg"
              style={{ backgroundColor: data.color, color: 'white' }}
            >
              <IconComponent size={40} />
            </div>
          </div>
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: data.color }}>
              Justice for {data.id.charAt(0).toUpperCase() + data.id.slice(1)}
            </h2>
            <p className="text-xl md:text-2xl text-justice-text/80 leading-relaxed">
              {data.bicycleSolution}
            </p>
          </div>
        </div>

        {/* Images Grid */}
        <div 
          ref={imagesRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 transition-opacity-transform ${imagesVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '400ms' }}
        >
          {[data.imageUrl, `public/lovable-uploads/b64de820-01d9-4b96-8751-d2cfdbd782b4.png`, "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=2089&auto=format&fit=crop"].map((img, i) => (
            <div key={i} className="overflow-hidden rounded-2xl shadow-lg h-64">
              <img 
                src={img} 
                alt={`Justice for ${data.id} - image ${i+1}`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Stats and Description */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-opacity-transform ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '600ms' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {data.stats.map((stat, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <h3 className="text-lg font-normal text-justice-text/70">{stat.label}</h3>
                  <p className="text-3xl font-bold mt-1" style={{ color: data.color }}>
                    {stat.value}
                  </p>
                  {stat.context && (
                    <p className="text-sm text-justice-text/60 mt-1">{stat.context}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="glass-card p-6">
              <p className="mb-4">{data.description}</p>
              <p className="italic text-justice-text/70">{data.subtitle}</p>
            </div>
          </div>
          
          <div className="relative">
            <div
              ref={solutionRef as React.RefObject<HTMLDivElement>}
              className={`transition-opacity-transform ${solutionVisible ? 'animate-solution-reveal' : 'opacity-0'}`}
              style={{ animationDelay: '800ms' }}
            >
              <div className="glass-card p-8 border-2" style={{ borderColor: data.color }}>
                <div className="bicycle-icon animate-float mb-6 flex justify-center">
                  <svg width="80" height="45" viewBox="0 0 80 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="32" r="12" stroke={data.color} strokeWidth="2.5"/>
                    <circle cx="63" cy="32" r="12" stroke={data.color} strokeWidth="2.5"/>
                    <path d="M16 32L34 12H50" stroke={data.color} strokeWidth="2.5"/>
                    <path d="M26 32L44 32" stroke={data.color} strokeWidth="2.5"/>
                    <path d="M44 32L34 12" stroke={data.color} strokeWidth="2.5"/>
                    <path d="M44 32L63 32" stroke={data.color} strokeWidth="2.5"/>
                    <path d="M56 12V18" stroke={data.color} strokeWidth="2.5"/>
                    <path d="M50 12L60 12" stroke={data.color} strokeWidth="2.5"/>
                    <path d="M63 32L56 12" stroke={data.color} strokeWidth="2.5"/>
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: data.color }}>
                  Bicycle Justice Delivers
                </h3>
                
                <ul className="space-y-3">
                  {data.bicycleSolution.split('. ').filter(s => s.length > 0).map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1 text-green-500">✓</span>
                      <span>{point}.</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InequalitySection;

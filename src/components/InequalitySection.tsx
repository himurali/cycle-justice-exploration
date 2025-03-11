
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { InequalityData } from "../constants/inequalityData";

interface InequalitySectionProps {
  data: InequalityData;
  isReversed?: boolean;
  index: number;
}

const InequalitySection = ({ data, isReversed = false, index }: InequalitySectionProps) => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const IconComponent = data.icon;
  
  return (
    <section
      id={data.id}
      className={`section border-t border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:grid-flow-dense' : ''}`}>
        <div 
          className={`transition-opacity-transform ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="inline-flex highlight-chip">
            <IconComponent size={14} style={{ color: data.color }} className="mr-1" />
            <span>Issue {index + 1}</span>
          </div>
          <h2 className="mb-3 text-justice-dark">
            {data.title}
          </h2>
          <p className="text-xl text-justice-text/70 mb-6">{data.subtitle}</p>
          <p className="mb-8">{data.description}</p>
          
          <div 
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 sm:grid-cols-3 gap-6 transition-opacity-transform ${statsVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '400ms' }}
          >
            {data.stats.map((stat, i) => (
              <div key={i} className="glass-card p-4">
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
        </div>
        
        <div 
          ref={imageRef as React.RefObject<HTMLDivElement>}
          className={`transition-opacity-transform ${imageVisible ? isReversed ? 'animate-fade-in-left' : 'animate-fade-in-right' : 'opacity-0'}`}
          style={{ animationDelay: '300ms' }}
        >
          <div className="relative">
            <div className="absolute inset-0 -m-2 rounded-2xl bg-gradient-to-tr from-white to-transparent opacity-80 blur-xl"></div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <img 
                src={data.imageUrl} 
                alt={data.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent mix-blend-multiply"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium opacity-90">The impact on {data.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InequalitySection;

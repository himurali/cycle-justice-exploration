
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Bike, ArrowRight } from "lucide-react";

const CallToAction = () => {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="action" className="section bg-justice-dark text-white" ref={ctaRef as React.RefObject<HTMLElement>}>
      <div className={`transition-opacity-transform ${ctaVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex highlight-chip bg-white/10 text-white">
            <Bike size={14} className="mr-1" />
            <span>Take Action</span>
          </div>
          <h2 className="mb-6">Join the Movement for Cycling Justice</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Together, we can transform our cities into more equitable, sustainable, and livable spaces by prioritizing cycling infrastructure and policies.
          </p>
        </div>

        <div 
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className={`grid md:grid-cols-3 gap-6 transition-opacity-transform ${cardVisible ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '200ms' }}
        >
          {[
            {
              title: "Advocate",
              description: "Contact your local representatives and demand better cycling infrastructure and policies.",
              button: "Contact Officials",
              color: "#0EA5E9"
            },
            {
              title: "Educate",
              description: "Share information about cycling benefits and how it promotes equity and justice.",
              button: "Share Resources",
              color: "#10B981"
            },
            {
              title: "Participate",
              description: "Join or organize local cycling events, community rides, and advocacy groups.",
              button: "Find Events",
              color: "#8B5CF6"
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="glass-card bg-white/5 backdrop-blur hover:bg-white/10 transition-colors duration-300 p-8 rounded-xl border border-white/10 flex flex-col"
              style={{ animationDelay: `${300 + (i * 100)}ms` }}
            >
              <h3 className="text-2xl font-medium mb-3" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-white/70 mb-6 flex-grow">{item.description}</p>
              <button 
                className="group inline-flex items-center font-medium transition-colors"
                style={{ color: item.color }}
              >
                {item.button}
                <ArrowRight 
                  size={18} 
                  className="ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

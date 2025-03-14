
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InequalitySection from "./InequalitySection";
import { inequalityData } from "../constants/inequalityData";
import { motion } from "framer-motion";
import { 
  Heart, 
  Leaf, 
  Scale, 
  Building, 
  User, 
  Globe 
} from "lucide-react";

// Map justice areas to icons and colors
const justiceIcons = {
  "health": { icon: User, color: "#ea384c" },
  "environment": { icon: Leaf, color: "#0EA5E9" },
  "intergenerational": { icon: Globe, color: "#D946EF" },
  "economic": { icon: Scale, color: "#F97316" },
  "political": { icon: Building, color: "#8B5CF6" },
  "social": { icon: Heart, color: "#9b87f5" }
};

const ImpactSection = () => {
  const [activeTab, setActiveTab] = useState("health");
  
  const tabContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const tabItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-slate-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-justice-blue">
            Bicycle Justice Impact
          </h2>
          <p className="text-lg text-justice-text/70">
            Explore how bicycles drive positive change across different domains
          </p>
        </div>

        <Tabs 
          defaultValue="health" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-12"
        >
          <motion.div
            variants={tabContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-slate-100/70 rounded-lg p-1 mb-8">
              {Object.entries(justiceIcons).map(([key, { icon: Icon, color }]) => (
                <motion.div
                  key={key}
                  variants={tabItemVariants}
                  className="w-full"
                >
                  <TabsTrigger 
                    value={key}
                    className="text-sm md:text-base font-medium w-full py-6 px-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                    style={{ 
                      color: key === activeTab ? 'white' : color,
                      backgroundColor: key === activeTab ? color : 'transparent',
                      borderBottom: key === activeTab ? `3px solid ${color}` : 'none',
                    }}
                  >
                    <Icon className="size-6 md:size-7" />
                    <span className="font-semibold text-base">{`${key.charAt(0).toUpperCase()}${key.slice(1)}`}</span>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </motion.div>

          {/* Content for each tab */}
          {Object.keys(justiceIcons).map((key) => (
            <TabsContent key={key} value={key} className="mt-6">
              {inequalityData
                .filter(data => data.id === key)
                .map((data, i) => (
                  <InequalitySection
                    key={data.id}
                    data={data}
                    isReversed={i % 2 !== 0}
                    index={i}
                  />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ImpactSection;


import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InequalitySection from "./InequalitySection";
import { motion } from "framer-motion";
import { 
  Heart, 
  Leaf, 
  Scale, 
  Building, 
  User, 
  Globe,
  LucideIcon
} from "lucide-react";
import inequalityDataJson from "../data/inequalityData.json";
import { useIsMobile } from "../hooks/use-mobile";

interface InequalityDataType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: string;
  stats: {
    label: string;
    value: string;
    context?: string;
  }[];
  imageUrl: string;
  bicycleSolution: string;
}

// Map icon names to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  "Heart": Heart,
  "Leaf": Leaf,
  "Scale": Scale,
  "Building": Building,
  "User": User,
  "Globe": Globe,
};

const ImpactSection = () => {
  const [activeTab, setActiveTab] = useState("health");
  const [inequalityData, setInequalityData] = useState<InequalityDataType[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Set the inequality data from the JSON file
    setInequalityData(inequalityDataJson as InequalityDataType[]);
  }, []);

  // Map justice areas to icons and colors
  const justiceIcons = inequalityData.reduce((acc, item) => {
    return {
      ...acc,
      [item.id]: { 
        icon: iconMap[item.iconName], 
        color: item.color 
      }
    };
  }, {} as Record<string, { icon: LucideIcon, color: string }>);
  
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

  // If data hasn't loaded yet, show a loading state
  if (inequalityData.length === 0) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-background to-slate-50/30">
        <div className="max-w-6xl mx-auto text-center">
          <p>Loading impact data...</p>
        </div>
      </section>
    );
  }

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
            {isMobile ? (
              <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <TabsList className="w-max flex bg-slate-100/70 rounded-lg p-1">
                  {Object.entries(justiceIcons).map(([key, { icon: Icon, color }]) => (
                    <motion.div
                      key={key}
                      variants={tabItemVariants}
                    >
                      <TabsTrigger 
                        value={key}
                        className="text-sm font-medium min-w-[100px] py-4 px-3 flex flex-col items-center justify-center gap-2 transition-all duration-300"
                        style={{ 
                          color: key === activeTab ? 'white' : color,
                          backgroundColor: key === activeTab ? color : 'transparent',
                          borderBottom: key === activeTab ? `3px solid ${color}` : 'none',
                        }}
                      >
                        <Icon className="size-6" />
                        <span className="font-semibold text-base">{`${key.charAt(0).toUpperCase()}${key.slice(1)}`}</span>
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </TabsList>
              </div>
            ) : (
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
            )}
          </motion.div>

          {/* Content for each tab */}
          {Object.keys(justiceIcons).map((key) => (
            <TabsContent key={key} value={key} className="mt-6">
              {inequalityData
                .filter(data => data.id === key)
                .map((data, i) => {
                  // Convert the data to match the component's expected props
                  const processedData = {
                    ...data,
                    icon: iconMap[data.iconName]
                  };
                  
                  return (
                    <InequalitySection
                      key={data.id}
                      data={processedData}
                      isReversed={i % 2 !== 0}
                      index={i}
                    />
                  );
                })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ImpactSection;

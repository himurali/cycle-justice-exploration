
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface Section {
  title: string;
  description: string;
  image: string;
}

interface StepData {
  title: string;
  sections: Section[];
  cityId: string;
  stepId: string;
  part: string;
  section: string;
  partTitle: string;
  partDescription: string;
}

interface StepContentProps {
  stepData: StepData;
}

export default function StepContent({ stepData }: StepContentProps) {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">{stepData.partTitle}</h1>
        <p className="text-lg text-muted-foreground mb-8">{stepData.partDescription}</p>
        <h2 className="text-2xl font-bold mb-6">{stepData.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stepData.sections.map((section, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={section.image}
                  alt={section.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

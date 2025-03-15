
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import StoryCategorySection from '@/components/StoryCategorySection';

const Stories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="section pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-baskerville font-medium mb-4">Justice Stories</h1>
              <p className="text-lg text-justice-text/80 max-w-3xl mx-auto">
                Explore stories of advocacy, transformation and community champions making streets safer for everyone.
              </p>
            </div>
            
            <StoryCategorySection 
              category="advocacy"
              title="Advocate Stories" 
              description="Stories of individuals advocating for safer streets and urban justice."
            />
            
            <StoryCategorySection 
              category="transformation"
              title="Transformation Stories" 
              description="Stories of cities and neighborhoods that have transformed to prioritize safer streets."
            />
            
            <StoryCategorySection 
              category="community"
              title="Community Champions" 
              description="Stories of community leaders and organizations championing for safer streets."
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stories;

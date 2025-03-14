
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import storiesData from '@/constants/stories.json';

const CommunityChampions = () => {
  const { communityChampions } = storiesData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="section pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-baskerville font-medium mb-4">Community Champions</h1>
              <p className="text-lg text-justice-text/80 max-w-3xl mx-auto">
                Stories of community leaders and organizations championing for safer streets.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {communityChampions.map(story => (
                <StoryCard
                  key={story.id}
                  image={story.image}
                  headline={story.headline}
                  subhead={story.subhead}
                  description={story.description}
                  primaryButtonLabel={story.primaryButtonLabel}
                  secondaryButtonLabel={story.secondaryButtonLabel}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityChampions;

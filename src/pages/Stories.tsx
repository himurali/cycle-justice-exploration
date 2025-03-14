
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import storiesData from '@/constants/stories.json';

// Get stories data from the JSON file
const { advocateStories, transformationStories, communityChampions } = storiesData;

const Stories = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('advocate-stories');
  
  // Set the active tab based on the URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/advocate-stories') {
      setActiveTab('advocate-stories');
    } else if (path === '/city-transformations') {
      setActiveTab('transformation-stories');
    } else if (path === '/community-champions') {
      setActiveTab('community-champions');
    }
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="section pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-baskerville font-medium mb-4">Justice Stories</h1>
              <p className="text-lg text-justice-text/80 max-w-3xl mx-auto">
                Explore stories of advocacy, transformation and community champions making streets safer for everyone.
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full md:w-fit mx-auto grid-cols-1 md:grid-cols-3 mb-10">
                <TabsTrigger value="advocate-stories" className="px-8">Advocate Stories</TabsTrigger>
                <TabsTrigger value="transformation-stories" className="px-8">Transformation Stories</TabsTrigger>
                <TabsTrigger value="community-champions" className="px-8">Community Champions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="advocate-stories">
                <h2 className="text-2xl font-baskerville mb-6">Advocate Stories</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {advocateStories.map(story => (
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
              </TabsContent>
              
              <TabsContent value="transformation-stories">
                <h2 className="text-2xl font-baskerville mb-6">Transformation Stories</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {transformationStories.map(story => (
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
              </TabsContent>
              
              <TabsContent value="community-champions">
                <h2 className="text-2xl font-baskerville mb-6">Community Champions</h2>
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stories;

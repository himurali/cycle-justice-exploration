
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for the three types of stories
const advocateStories = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    headline: 'Jane's Journey for Urban Justice',
    subhead: 'Advocate for Safe Streets',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'Read More',
    secondaryButtonLabel: 'Share'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    headline: 'Mark's Mission for Mobility',
    subhead: 'Champion for Accessible Transport',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'View Story',
    secondaryButtonLabel: 'Contact'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    headline: 'Sarah's Stand for Safer Cycling',
    subhead: 'Advocate for Bike Infrastructure',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'Read Story',
    secondaryButtonLabel: 'Follow'
  }
];

const transformationStories = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
    headline: 'Portland's Path to Progress',
    subhead: 'Urban Transformation Success',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'Explore Case',
    secondaryButtonLabel: 'Key Facts'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    headline: 'Amsterdam's Amazing Revolution',
    subhead: 'How a City Transformed for Cyclists',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'See Changes',
    secondaryButtonLabel: 'Timeline'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    headline: 'Bogotá's Bold Beginning',
    subhead: 'A South American Success Story',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'View Changes',
    secondaryButtonLabel: 'Stats'
  }
];

const communityChampions = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    headline: 'Community Cycling Coalition',
    subhead: 'Building Grassroots Support',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'Meet Team',
    secondaryButtonLabel: 'Join'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    headline: 'Neighborhood Network',
    subhead: 'Connecting Local Advocates',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'View Projects',
    secondaryButtonLabel: 'Events'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c',
    headline: 'Safety Street Squad',
    subhead: 'Volunteers Making a Difference',
    description: 'Magnis porttitor penatibus facilisis feugiat hendrerit. Feugiat semper tincidunt mattis lacinia sed velit egestas.',
    primaryButtonLabel: 'Learn More',
    secondaryButtonLabel: 'Volunteer'
  }
];

const Stories = () => {
  const [activeTab, setActiveTab] = useState('advocate-stories');
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="section pt-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-baskerville font-medium mb-4">Justice Stories</h1>
              <p className="text-lg text-justice-text/80 max-w-3xl mx-auto">
                Explore stories of advocacy, transformation and community champions making streets safer for everyone.
              </p>
            </div>
            
            <Tabs defaultValue="advocate-stories" onValueChange={setActiveTab} className="w-full">
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

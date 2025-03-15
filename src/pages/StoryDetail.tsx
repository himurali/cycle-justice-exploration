
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getStoryBySlug } from '@/lib/markdown';
import advocateStories from '@/constants/advocateStories.json';

const StoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  console.log("Current slug from URL:", slug);
  
  // First try to get story from markdown content
  let story = getStoryBySlug(slug || '');
  
  // If not found, try to find in advocate stories
  if (!story && slug) {
    // Log to help debug
    console.log("Looking for story with slug:", slug);
    console.log("Available advocate stories:", advocateStories.map(s => s.slug));
    
    const advocateStory = advocateStories.find(s => s.slug === slug);
    
    if (advocateStory) {
      console.log("Found advocate story:", advocateStory);
      
      // Create a formatted content string without the frontmatter syntax visible
      const storyContent = `
![${advocateStory.headline}](${advocateStory.image})

## The Story

${advocateStory.description}

## Join Our Movement

Want to share your story? Join our community and be part of the change!
`;
      
      story = {
        title: advocateStory.headline,
        date: new Date().toLocaleDateString(),
        image: advocateStory.image,
        content: storyContent,
        excerpt: advocateStory.description,
        category: 'advocacy',
        slug: advocateStory.slug,
        author: "Street Justice Advocate"
      };
    } else {
      console.log("No advocate story found with slug:", slug);
    }
  }

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-baskerville mb-4">Story Not Found</h1>
            <p className="mb-8">The story you're looking for doesn't exist or has been moved.</p>
            <Button 
              onClick={() => navigate('/stories')}
              className="rounded-full bg-justice-dark hover:bg-black text-white"
            >
              Return to Stories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <Button 
            variant="ghost" 
            className="mb-6 gap-2 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="prose prose-lg max-w-none">
            {story.image && !story.content.includes(story.image) && (
              <div className="aspect-video w-full overflow-hidden rounded-xl mb-10">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-baskerville font-medium mb-4">{story.title}</h1>
              <div className="flex flex-wrap gap-3 text-justice-text/70">
                <p>Published: {story.date}</p>
                {story.author && <p>• Author: {story.author}</p>}
                {story.category && <p>• Category: {story.category}</p>}
              </div>
            </div>
            
            <div className="prose-headings:font-baskerville prose-headings:font-medium prose-p:text-justice-text/80 prose-a:text-justice-blue">
              <div>
                <ReactMarkdown>
                  {story.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StoryDetail;

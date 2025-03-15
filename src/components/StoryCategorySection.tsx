
import React from 'react';
import { Link } from 'react-router-dom';
import { StoryMeta, StoryCategory, getStoriesByCategory } from '@/lib/markdown';
import StoryCard from './StoryCard';

interface StoryCategorySectionProps {
  category: StoryCategory;
  title: string;
  description: string;
}

const StoryCategorySection: React.FC<StoryCategorySectionProps> = ({
  category,
  title,
  description
}) => {
  const stories = getStoriesByCategory(category);

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-baskerville mb-3">{title}</h2>
        <p className="text-justice-text/80">{description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard
            key={story.slug}
            image={story.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
            headline={story.title}
            subhead={`Published: ${story.date}`}
            description={story.excerpt}
            primaryButtonLabel="Read Story"
            secondaryButtonLabel={category.charAt(0).toUpperCase() + category.slice(1)}
            slug={story.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryCategorySection;

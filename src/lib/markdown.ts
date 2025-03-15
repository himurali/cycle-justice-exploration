
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type StoryCategory = 'advocacy' | 'transformation' | 'community';

export interface StoryMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  category: StoryCategory;
  content: string;
  author?: string;
  continent?: string; // Added continent field
}

// Import stories directly from the content/stories directory
const getStoriesFromDirectory = (): StoryMeta[] => {
  const categories: StoryCategory[] = ['advocacy', 'transformation', 'community'];
  const stories: StoryMeta[] = [];

  // Iterate through each category directory
  categories.forEach(category => {
    try {
      // List all files in the category directory
      const categoryPath = path.join('src/content/stories', category);
      const files = fs.readdirSync(categoryPath);
      
      // Process each markdown file
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const filePath = path.join(categoryPath, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContent);
          
          // Extract slug from filename (remove date prefix and extension)
          const slug = file.replace(/^\d{2}-\d{2}-\d{4}-/, '').replace(/\.md$/, '');
          
          stories.push({
            slug,
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            image: data.image || '',
            category: category as StoryCategory,
            content: content,
            author: data.author || ''
          });
        }
      });
    } catch (error) {
      console.error(`Error reading ${category} directory:`, error);
    }
  });

  return stories;
};

// For client-side usage with imported markdown files
export const getStories = (): StoryMeta[] => {
  try {
    // Define our static paths to the markdown files
    const advocacyContext = import.meta.glob('/src/content/stories/advocacy/*.md', { as: 'raw', eager: true });
    const transformationContext = import.meta.glob('/src/content/stories/transformation/*.md', { as: 'raw', eager: true });
    const communityContext = import.meta.glob('/src/content/stories/community/*.md', { as: 'raw', eager: true });
    
    const stories: StoryMeta[] = [];
    
    // Process files from each context
    [
      { files: advocacyContext, category: 'advocacy' as StoryCategory },
      { files: transformationContext, category: 'transformation' as StoryCategory },
      { files: communityContext, category: 'community' as StoryCategory }
    ].forEach(({ files, category }) => {
      // Process each file in the category
      Object.entries(files).forEach(([path, content]) => {
        if (typeof content === 'string') {
          // Extract the filename from the path
          const filename = path.split('/').pop() || '';
          
          // Extract the slug from the filename (remove date prefix and extension)
          const slug = filename.replace(/^\d{2}-\d{2}-\d{4}-/, '').replace(/\.md$/, '');
          
          // Parse the frontmatter and content
          try {
            const { data, content: markdownContent } = matter(content);
            
            stories.push({
              slug,
              title: data.title || '',
              date: data.date || '',
              excerpt: data.excerpt || '',
              image: data.image || '',
              category,
              content: markdownContent,
              author: data.author || '',
              continent: data.continent || undefined // Add continent from frontmatter
            });
          } catch (error) {
            console.error(`Error parsing markdown for ${path}:`, error);
          }
        }
      });
    });
    
    return stories;
  } catch (error) {
    console.error("Error loading markdown files:", error);
    return [];
  }
};

export const getStoryBySlug = (slug: string): StoryMeta | undefined => {
  const stories = getStories();
  return stories.find(story => story.slug.toLowerCase() === slug.toLowerCase());
};

export const getStoriesByCategory = (category: StoryCategory): StoryMeta[] => {
  const stories = getStories();
  return stories
    .filter(story => story.category === category)
    .sort((a, b) => {
      // Parse the date strings (assuming yyyy-MM-dd or dd-MM-yyyy format)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      // Sort in descending order (newest first)
      return dateB.getTime() - dateA.getTime();
    });
};

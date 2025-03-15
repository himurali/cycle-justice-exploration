
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
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            image: data.image,
            category: category as StoryCategory,
            content: content,
            author: data.author
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
  // In a browser environment, we need to use the imported markdown files
  // This is a workaround for the fact that we can't use fs in the browser
  
  // Import all markdown files from the content/stories directory
  const markdownFiles = import.meta.glob('../content/stories/**/*.md', { eager: true });
  const stories: StoryMeta[] = [];

  for (const path in markdownFiles) {
    const file = markdownFiles[path];
    // Extract the category from the path
    const pathParts = path.split('/');
    const category = pathParts[pathParts.length - 2] as StoryCategory;
    
    // Extract the slug from the filename (remove date prefix and extension)
    const filename = pathParts[pathParts.length - 1];
    const slug = filename.replace(/^\d{2}-\d{2}-\d{4}-/, '').replace(/\.md$/, '');
    
    // Use gray-matter to parse the frontmatter
    const { data, content } = matter(file.default);
    
    stories.push({
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image,
      category,
      content,
      author: data.author
    });
  }

  return stories;
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

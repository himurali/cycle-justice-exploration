
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
  continent?: string;
}

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
          
          try {
            // Use a simpler approach for browser environment
            const { data, content: markdownContent } = parseFrontmatter(content);
            
            stories.push({
              slug,
              title: data.title || '',
              date: data.date || '',
              excerpt: data.excerpt || '',
              image: data.image || '',
              category,
              content: markdownContent,
              author: data.author || '',
              continent: data.continent || undefined
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

// A simple frontmatter parser for browser environments
function parseFrontmatter(content: string): { data: Record<string, string>; content: string } {
  const lines = content.split('\n');
  const data: Record<string, string> = {};
  
  let inFrontmatter = false;
  let contentStartIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
        continue;
      } else {
        inFrontmatter = false;
        contentStartIndex = i + 1;
        break;
      }
    }
    
    if (inFrontmatter) {
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        // Remove quotes if present
        data[key.trim()] = value.trim().replace(/^["'](.*)["']$/, '$1');
      }
    }
  }
  
  return {
    data,
    content: lines.slice(contentStartIndex).join('\n')
  };
}

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

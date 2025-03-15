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
  tags?: string[];
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
              continent: data.continent || undefined,
              tags: data.tags ? parseTagsArray(data.tags) : []
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

// Parse tags from frontmatter - could be a string or array
function parseTagsArray(tagsData: any): string[] {
  if (Array.isArray(tagsData)) {
    return tagsData;
  } else if (typeof tagsData === 'string') {
    // Handle case where tags might be a JSON string
    try {
      const parsed = JSON.parse(tagsData.replace(/'/g, '"'));
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // If it's not valid JSON, split by commas
      return tagsData.split(',').map(tag => tag.trim());
    }
  }
  return [];
}

// A simple frontmatter parser for browser environments
function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const lines = content.split('\n');
  const data: Record<string, any> = {};
  
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
      // Handle special case for tags array
      if (line.startsWith('tags:')) {
        const match = line.match(/^tags:\s*(.+)$/);
        if (match) {
          try {
            // Try to parse as JSON (with either single or double quotes)
            const tagsText = match[1].replace(/'/g, '"');
            data.tags = JSON.parse(tagsText);
          } catch {
            // If not valid JSON, store as string to be processed later
            data.tags = match[1];
          }
        }
      } else {
        const match = line.match(/^([^:]+):\s*(.+)$/);
        if (match) {
          const [, key, value] = match;
          // Remove quotes if present
          data[key.trim()] = value.trim().replace(/^["'](.*)["']$/, '$1');
        }
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

// Get all unique tags from stories
export const getAllTags = (): string[] => {
  const stories = getStories();
  const tagSet = new Set<string>();
  
  stories.forEach(story => {
    if (story.tags && Array.isArray(story.tags)) {
      story.tags.forEach(tag => tagSet.add(tag));
    }
  });
  
  return Array.from(tagSet).sort();
};

// Get stories by tag
export const getStoriesByTag = (tag: string): StoryMeta[] => {
  const stories = getStories();
  return stories.filter(story => 
    story.tags && Array.isArray(story.tags) && story.tags.includes(tag)
  );
};

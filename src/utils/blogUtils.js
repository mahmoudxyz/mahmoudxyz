import frontMatter from 'front-matter';

const getPosts = async () => {
  const posts = [];
  const files = import.meta.glob('/src/content/posts/*.md', { 
    eager: true,
    as: 'raw'
  });

  for (const file in files) {
    const content = files[file];
    const fileName = file.split('/').pop();
    const slug = fileName.replace('.md', '');

    try {
      // Parse front matter and content
      const { attributes, body } = frontMatter(content);
      
      // Validate required frontmatter fields
      if (!attributes.title || !attributes.date) {
        console.warn(`Missing required frontmatter in ${fileName}`);
        continue;
      }

      posts.push({
        slug,
        title: attributes.title,
        description: attributes.description || '',
        date: new Date(attributes.date),
        categories: attributes.categories || [],
        content: body.trim(),
        readingTime: calculateReadingTime(body)
      });
    } catch (error) {
      console.error(`Error parsing ${fileName}:`, error);
    }
  }

  // Sort by date descending
  return posts.sort((a, b) => b.date - a.date);
};

const getPost = async (slug) => {
  try {
    const files = import.meta.glob('/src/content/posts/*.md', { 
      eager: true,
      as: 'raw'
    });
    const filePath = Object.keys(files).find(path => path.includes(slug));
    
    if (!filePath) return null;
    
    const content = files[filePath];
    const { attributes, body } = frontMatter(content);

    // Validate required frontmatter
    if (!attributes.title || !attributes.date) {
      throw new Error('Missing required frontmatter fields');
    }
    
    return {
      slug,
      title: attributes.title,
      description: attributes.description || '',
      date: new Date(attributes.date),
      categories: attributes.categories || [],
      content: body.trim(),
      readingTime: calculateReadingTime(body),
      tableOfContents: generateTableOfContents(body)
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
};

const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const generateTableOfContents = (content) => {
  const headings = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-');     // Remove consecutive hyphens
      
      headings.push({ level, text, id });
    }
  });
  
  return headings;
};

// Add this to your existing blogUtils.js file

export const checkAvailableLanguages = async (baseSlug) => {
  const languages = ['en', 'ar', 'de', 'cz'];
  const availableLanguages = ['en']; // English is always available as base

  try {
    // Check each language version
    for (const lang of languages) {
      if (lang === 'en') continue; // Skip English as it's the base
      
      const langSlug = `${baseSlug}-${lang}`;
      const exists = await checkPostExists(langSlug); // You'll need to implement this based on your data fetching method
      
      if (exists) {
        availableLanguages.push(lang);
      }
    }
    
    return availableLanguages;
  } catch (error) {
    console.error('Error checking available languages:', error);
    return ['en']; // Return only English if there's an error
  }
};

// Helper function to check if a post exists
const checkPostExists = async (slug) => {
  try {
    const post = await getPost(slug);
    return !!post;
  } catch {
    return false;
  }
};

export { getPosts, getPost, checkPostExists };
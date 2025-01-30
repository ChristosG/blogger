import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { AIContent, Post } from '@/types/ai-content';

const postsDir = path.join(process.cwd(), 'data', 'posts');
const tutorialsDir = path.join(process.cwd(), 'data', 'tutorials');
const aiDir = path.join(process.cwd(), 'data', 'ai');

// Public API
export async function getPosts(): Promise<AIContent[]> {
    return getFiles(postsDir);
}

export async function getTutorials(): Promise<AIContent[]> {
    return getFiles(tutorialsDir);
}

export async function getAIContents(): Promise<AIContent[]> {
    return getFiles(aiDir);
}

export async function getTutorialBySlug(slug: string): Promise<AIContent | null> {
    return getFileBySlug(tutorialsDir, slug);
}

export async function getPostBySlug(slug: string): Promise<AIContent | null> {
    return getFileBySlug(postsDir, slug);
}

// Internal functions
function getFiles(dirPath: string): AIContent[] {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  return items.flatMap(item => {
      const itemPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
          // Process category directory
          const categoryPosts = getPostsInDirectory(itemPath);
          const categoryMeta = getCategoryMetadata(itemPath);
          
          return [{
              slug: item.name,
              title: categoryMeta.title || item.name,
              description: categoryMeta.description || '',
              posts: categoryPosts,
              image: categoryMeta.image,
              date: categoryMeta.date
          } as AIContent];
      }
      
      if (item.name.endsWith('.md')) {
          // Process individual post (top-level markdown file)
          const post = parseMarkdownFile(itemPath);
          return post ? [{
              slug: post.slug,
              title: post.title,
              description: post.description,
              content: post.content,
              date: post.date
          }] : [];
      }
      
      return [];
  });
}

// New helper function for category metadata
function getCategoryMetadata(dirPath: string): Partial<AIContent> {
  const indexPath = path.join(dirPath, 'index.md');
  if (!fs.existsSync(indexPath)) return {};
  
  const fileContent = fs.readFileSync(indexPath, 'utf-8');
  const { data } = matter(fileContent);
  
  return {
      title: data.title,
      description: data.description,
      image: data.image,
      date: data.date ? new Date(data.date) : undefined
  };
}

// New helper function for category posts
function getPostsInDirectory(dirPath: string): Post[] {
  return fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.md') && file !== 'index.md')
      .map(file => {
          const postPath = path.join(dirPath, file);
          const result = parseMarkdownFile(postPath);
          return result ? {
              slug: result.slug,
              title: result.title,
              description: result.description,
              content: result.content || '',
              date: result.date
          } : null;
      })
      .filter((post) => post !== null) as Post[];
}

// Generic markdown parser
function parseMarkdownFile(filePath: string) {
  try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      return {
          slug: path.basename(filePath, '.md'),
          title: data.title || path.basename(filePath, '.md'),
          description: data.description || '',
          content,
          date: data.date ? new Date(data.date) : undefined,
          image: data.image
      };
  } catch (error) {
      console.error(`Error parsing ${filePath}:`, error);
      return null;
  }
}

export async function getAIContentBySlug(categorySlug: string, postSlug?: string): Promise<AIContent | null> {
    const categoryPath = path.join(aiDir, categorySlug);
    
    if (postSlug) {
        const postPath = path.join(categoryPath, `${postSlug}.md`);
        if (!fs.existsSync(postPath)) return null;
        return getFileBySlug(categoryPath, postSlug);
    }

    const indexPath = path.join(categoryPath, 'index.md');
    if (!fs.existsSync(indexPath)) return null;
    return getFileBySlug(categoryPath, 'index');
}

function getFileBySlug(dirPath: string, slug: string): AIContent | null {
    const filePath = path.join(dirPath, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
        slug,
        title: data.title,
        description: data.description,
        content,
        date: data.date ? new Date(data.date) : undefined
    };
}
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'data', 'posts');
const tutorialsDir = path.join(process.cwd(), 'data', 'tutorials');
const aiDir = path.join(process.cwd(), 'data', 'ai');

// ---------------------
// Public API
// ---------------------
export async function getPosts() {
    return getFiles(postsDir);
}

export async function getTutorials() {
    return getFiles(tutorialsDir);
}

export async function getAIContents() {
    return getFiles(aiDir);
}

// export async function getPostBySlug(slug: string) {
//     return getFileBySlug(postsDir, slug);
// }

export async function getTutorialBySlug(slug: string) {
    return getFileBySlug(tutorialsDir, slug);
}

interface ItemsContent {
    slug: string;
    title: string;
    description: string;
    content: string;
    date?: Date;
    image?:string;
}

export async function getAIContentBySlug(slug: string): Promise<ItemsContent | null>  {
    return getFileBySlug(aiDir, slug);
}


interface BlogPostParams {
    slug: string;
    image: string;
    title: string;
    description: string;
    content: string;
    date?: Date;
}
export async function getPostBySlug(slug: string): Promise<ItemsContent | null> {
    return getFileBySlug(postsDir, slug);
}


// ---------------------
// Internals
// ---------------------

// Update the getFiles function in fetcher.ts
function getFiles(dirPath: string): ItemsContent[] {
    const files = fs.readdirSync(dirPath);

    return files.map((file) => {
        const filePath = path.join(dirPath, file);
        const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));
        const slug = file.replace(/\.md$/, '');
        
        // Convert date string to Date object
        const date = new Date(data.date);
        
        return {
            slug,
            title: data.title,
            description: data.description,
            content,
            date
        };
    });
}

// function getFiles(dirPath: string) {
//     const files = fs.readdirSync(dirPath);

//     return files.map((file) => {
//         const filePath = path.join(dirPath, file);
//         const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));
//         const slug = file.replace(/\.md$/, '');
//         return {
//             slug,
//             ...data,
//             content,
//         };
//     });
// }

function getFileBySlug(dirPath: string, slug: string): ItemsContent | null {
    const filePath = path.join(dirPath, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Convert date string to Date object
    const date = new Date(data.date);

    return {
        slug,
        title: data.title,
        description: data.description,
        content,
        date
    };
}

// function getFileBySlug(dirPath: string, slug: string) {
//     const filePath = path.join(dirPath, `${slug}.md`);
//     if (!fs.existsSync(filePath)) return null;

//     const fileContent = fs.readFileSync(filePath, 'utf-8');
//     const { data, content } = matter(fileContent);

//     return {
//         slug,
//         ...data,
//         content,
//     };
// }

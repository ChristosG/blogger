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

export async function getPostBySlug(slug: string) {
    return getFileBySlug(postsDir, slug);
}

export async function getTutorialBySlug(slug: string) {
    return getFileBySlug(tutorialsDir, slug);
}

export async function getAIContentBySlug(slug: string) {
    return getFileBySlug(aiDir, slug);
}

// ---------------------
// Internals
// ---------------------

function getFiles(dirPath: string) {
    const files = fs.readdirSync(dirPath);

    return files.map((file) => {
        const filePath = path.join(dirPath, file);
        const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));
        const slug = file.replace(/\.md$/, '');
        return {
            slug,
            ...data,
            content,
        };
    });
}

function getFileBySlug(dirPath: string, slug: string) {
    const filePath = path.join(dirPath, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
        slug,
        ...data,
        content,
    };
}

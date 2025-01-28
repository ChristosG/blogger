import type { Metadata } from 'next';
import { getPostBySlug, getPosts } from '@/utils/fetcher';
import ReactMarkdown from 'react-markdown';
import React from 'react';

type BlogPostParams = {
    params: { slug: string };
};

// Generate static params for all blog posts (SSG)
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

// Dynamically generate the metadata for each post
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'No post found for this slug.',
        };
    }

    return {
        title: `${post.title} - Coding Blog`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            images: [
                {
                    url: post.image ?? '/images/default-og.jpg',
                },
            ],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostParams) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return <div className="p-8 text-center">Post not found.</div>;
    }

    return (
        <article className="prose max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-500 text-sm mb-4">{String(post.date)}</p>
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    );
}

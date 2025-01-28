import type { Metadata } from 'next';
import { getPosts } from '../../utils/fetcher';
import React from 'react';
import Card from '@/components/Card';


export const metadata: Metadata = {
    title: 'Blog - Coding Blog',
    description: 'Read our latest blog posts and insights on coding.',
};

// If you want ISR or SSG, you can set revalidate
export const revalidate = 60; // Re-generate this page every 60 seconds

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <section>
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                {posts.map((content) => (
                    // <article
                    //     key={post.slug}
                    //     className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
                    // >
                    //     <Link href={`/blog/${post.slug}`}>
                    //         <h2 className="text-xl font-semibold">{post.title}</h2>
                    //         <p className="text-gray-500 text-sm">{post.description}</p>
                    //     </Link>
                    // </article>
                    <Card
                        key={content.slug}
                        type="blog"
                        data={{
                        slug: content.slug,
                        title: content.title,
                        description: content.description,
                        image: content.image,
                        }}
                    />
                ))}
            </div>
        </section>
    );
}

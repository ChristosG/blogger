import type { Metadata } from 'next';
import { getAIContents } from '@/utils/fetcher';
import AIContentCard from '../../components/AIContentCard';
import React from 'react';

export const metadata: Metadata = {
    title: 'AI & Coding - Coding Blog',
    description: 'Explore our AI and coding content.',
};

export const revalidate = 60;

export default async function AIPage() {
    const aiContents = await getAIContents();
    

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">AI & Coding</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                {aiContents.map((content) => (
                    <AIContentCard key={content.slug} content={content} />
                ))}
            </div>
        </section>
    );
}

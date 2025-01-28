import type { Metadata } from 'next';
import { getTutorials } from '../../utils/fetcher';
import TutorialCard from '../../components/TutorialCard';
import React from 'react';

export const metadata: Metadata = {
    title: 'Tutorials - Coding Blog',
    description: 'Browse our coding tutorials.',
};

export const revalidate = 60; // Re-generate this page every 60 seconds (ISR)

export default async function TutorialsPage() {
    const tutorials = await getTutorials();

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Tutorials</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                {tutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.slug} tutorial={tutorial} />
                ))}
            </div>
        </section>
    );
}

import type { Metadata } from 'next';
import { getTutorials, getTutorialBySlug } from '../../../utils/fetcher';
import ReactMarkdown from 'react-markdown';
import React from 'react';

type TutorialParams = {
    params: { slug: string };
};

export async function generateStaticParams() {
    const tutorials = await getTutorials();
    return tutorials.map((tutorial) => ({ slug: tutorial.slug }));
}

export async function generateMetadata({ params }: TutorialParams): Promise<Metadata> {
    const tutorial = await getTutorialBySlug(params.slug);
    if (!tutorial) {
        return {
            title: 'Tutorial Not Found',
            description: 'No tutorial found for this slug.',
        };
    }

    return {
        title: `${tutorial.title} - Coding Blog`,
        description: tutorial.description,
    };
}

export default async function TutorialPage({ params }: TutorialParams) {
    const tutorial = await getTutorialBySlug(params.slug);
    if (!tutorial) {
        return <div className="p-8 text-center">Tutorial not found.</div>;
    }

    return (
        <article className="prose max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold">{tutorial.title}</h1>
            <p className="text-sm text-gray-500 mb-4">{String(tutorial.date)}</p>
            <ReactMarkdown>{tutorial.content}</ReactMarkdown>
        </article>
    );
}

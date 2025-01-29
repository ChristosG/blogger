import type { Metadata } from 'next';
import { getAIContents, getAIContentBySlug } from '../../../utils/fetcher';
import ReactMarkdown from 'react-markdown';

type AIParams = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const aiContents = await getAIContents();
    return aiContents.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: AIParams): Promise<Metadata> {
    const { slug } = await params; // Await the Promise
    const content = await getAIContentBySlug(slug);
    
    return content ? {
        title: `${content.title} - Coding Blog`,
        description: content.description,
    } : {
        title: 'AI Content Not Found',
        description: 'No AI content found for this slug.',
    };
}

export default async function AIContentPage({ params }: AIParams) {
    const { slug } = await params; // Await the Promise
    const content = await getAIContentBySlug(slug);

    return content ? (
        <article className="prose dark:prose-invert max-w-none max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold">{content.title}</h1>
            <p className="text-sm text-gray-500 mb-4">{String(content.date)}</p>
            <ReactMarkdown>{content.content}</ReactMarkdown>
        </article>
    ) : (
        <div className="p-8 text-center">AI content not found.</div>
    );
}

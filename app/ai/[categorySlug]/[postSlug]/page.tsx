// app/ai/[categorySlug]/[postSlug]/page.tsx
import { getAIContentBySlug, getAIContents } from '@/utils/fetcher';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import AITree from '@/components/AITree';
import MobileTreeToggle from '@/components/MobileTreeToggle';

interface PageProps {
  params: {
    categorySlug: string;
    postSlug: string;
  };
}

export default async function AIPostPage({ params }: PageProps) {
  const { categorySlug, postSlug } = params;
  const content = await getAIContentBySlug(categorySlug, postSlug);
  const allContents = await getAIContents();

  return (
    <div className="w-full h-full flex flex-1 min-h-0 relative">
      <MobileTreeToggle contents={allContents} selectedSlug={postSlug} />
      
      {/* Desktop Tree - Wider version */}
      <div className="hidden md:block w-72 border-r border-gray-100 dark:border-gray-800 sticky top-0">
        <AITree contents={allContents} selectedSlug={postSlug} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <div className="max-w-5xl mx-auto">
          {content ? (
            <article className="prose dark:prose-invert max-w-3xl">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                {content.title}
              </h1>
              {content.date && (
                <p className="text-sm text-gray-500 mb-6 dark:text-gray-400">
                  {new Date(content.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
              <div className="mt-8 space-y-6">
                <ReactMarkdown className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {content.content}
                </ReactMarkdown>
              </div>
            </article>
          ) : (
            <div className="p-8 text-center text-red-500 dark:text-red-400">
              Post not found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
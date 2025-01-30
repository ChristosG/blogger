//app/ai/[categorySlug]/page.tsx

import { getAIContents } from '@/utils/fetcher'
import AITree from '@/components/AITree'
import MobileTreeToggle from '@/components/MobileTreeToggle'
import Link from 'next/link'

export async function generateStaticParams() {
  const contents = await getAIContents()
  return contents.map(content => ({
    categorySlug: content.slug
  }))
}

export default async function AICategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}) {
  const contents = await getAIContents()
  const {categorySlug} = await params;
  const currentContent = contents.find(c => c.slug === categorySlug)

  return (
<div className="w-full  h-[calc(100vh-4rem)] flex ">
<MobileTreeToggle contents={contents} selectedSlug={categorySlug} />
      
      {/* Desktop Tree */}
      <div className="hidden md:block">        <AITree contents={contents} selectedSlug={categorySlug} />
      </div>

      {/* Main Content */}
      <div id="main-scroll-container"
        className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50"
      >    <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            {currentContent?.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {currentContent?.posts?.map(post => (
              <Link
                key={post.slug}
                href={`/ai/${categorySlug}/${post.slug}`}
                className="group relative rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-500/30"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-4 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Read article
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
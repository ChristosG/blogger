// components/AITree.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { AIContent } from '@/types/ai-content'

interface AITreeProps {
  contents: AIContent[]
  selectedSlug: string
}

export default function AITree({ contents, selectedSlug }: AITreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setExpandedCategories(prev => new Set(prev).add(selectedSlug))
  }, [selectedSlug])

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      newSet.has(slug) ? newSet.delete(slug) : newSet.add(slug)
      return newSet
    })
  }

  if (!isMounted) return null

  return (
    <div className=" py-8 px-4 w-36 md:w-72 border-r border-gray-200 dark:border-gray-700 overflow-y-auto ai-tree overflow-x-hidden">
      {contents.map((content) => (
        <div key={content.slug} className="mb-1">
          <div className="flex items-start gap-1 group">
            <button
              onClick={() => toggleCategory(content.slug)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mt-1"
              aria-label={`Toggle ${content.title} category`}
            >
              <motion.div
                animate={{ rotate: expandedCategories.has(content.slug) ? 90 : 0 }}
                className="text-xs"
              >
                ➤
              </motion.div>
            </button>
            
            {/* Category Title with Smart Wrapping */}
            <Link
              href={`/ai/${content.slug}`}
              className={`flex-1 p-2 rounded text-sm ${
                selectedSlug === content.slug
                  ? 'bg-blue-100 dark:bg-blue-900 font-medium'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              } min-w-0 break-words line-clamp-10 transition-colors`}
              title={content.title}
            >
              {content.title}
            </Link>
          </div>

          <AnimatePresence>
            {expandedCategories.has(content.slug) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-4 pl-2 border-l-2 border-gray-200 dark:border-gray-600"
              >
                {content.posts?.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/ai/${content.slug}/${post.slug}`}
                    className={`flex items-start p-2 text-xs ${
                      selectedSlug === post.slug
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    } group min-w-0`}
                  >
                    {/* Post Title with Conditional Truncation */}
                    <span 
                      className="flex-1 break-words line-clamp-2"
                      title={post.title.length > 50 ? post.title : undefined}
                    >
                      {post.title}
                    </span>
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
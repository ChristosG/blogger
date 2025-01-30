//components/AIContentCard.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { AIContent } from '@/types/ai-content';

export default function AIContentCard({ content }: { content: AIContent }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="backlight-hover rounded-xl shadow-sm hover:shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-300"
    >
      <Link href={`/ai/${content.slug}`}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">{content.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{content.description}</p>
          {content.posts && (
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
              <span>{content.posts.length} articles</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
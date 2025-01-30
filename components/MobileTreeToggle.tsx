'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AITree from './AITree';
import type { AIContent } from '@/types/ai-content';

interface MobileTreeProps {
  contents: AIContent[];
  selectedSlug: string;
}

export default function MobileTreeToggle({ contents, selectedSlug }: MobileTreeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className={`block relative h-full overflow-x-hidden border-r border-gray-100 dark:border-gray-800 md:hidden overflow-y-auto z-40 bg-white dark:bg-gray-800 w-72 shadow-xl`}

//          className="block fixed h-[calc(100vh-8.3rem)] overflow-x-hidden top-16 
//                      border-r border-gray-100 dark:border-gray-800 md:hidden overflow-y-auto
//                       z-40 bg-white dark:bg-gray-800 w-72 shadow-xl"

        >


                <AITree  contents={contents} selectedSlug={selectedSlug} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
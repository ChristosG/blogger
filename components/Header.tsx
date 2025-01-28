'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If theme is "system", get the actual OS theme
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Subtle fade in for the title
  const headerTitleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <header
      className="
        bg-gradient-to-r 
        from-gray-300 to-gray-100 
        dark:from-gray-800 dark:to-gray-900
        text-gray-900 dark:text-gray-100
        shadow 
      "
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Animated title */}
        <motion.h1
          variants={headerTitleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold"
        >
          <Link href="/">Coding Blog</Link>
        </motion.h1>
        <div className="flex items-center space-x-6">
          {/* Nav Links with backlight hover */}
          <Link href="/blog" className="backlight-hover hover:scale-105 px-2 py-1 rounded">
            Blog
          </Link>
          <Link href="/tutorials" className="backlight-hover hover:scale-105 px-2 py-1 rounded">
            Tutorials
          </Link>
          <Link href="/ai" className="backlight-hover hover:scale-105 px-2 py-1 rounded">
            AI
          </Link>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              className="
                backlight-hover hover:scale-105
                px-3 py-1 rounded 
                bg-gray-200 dark:bg-gray-700
                text-gray-700 dark:text-gray-200
                transition-colors
              "
            >
              {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

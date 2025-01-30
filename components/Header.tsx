'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Find the main scroll container after mount
    setScrollContainer(document.getElementById('main-scroll-container'));
  }, []);

  useEffect(() => {
    if (!scrollContainer) return;

    let timeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const currentScroll = scrollContainer.scrollTop;
      const isScrollingUp = currentScroll < lastScrollY;
      const shouldShow = isScrollingUp || currentScroll < 100;

      setIsVisible(shouldShow);
      setLastScrollY(currentScroll);

      // Clear previous timeout
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Additional logic if needed
      }, 100);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [scrollContainer, lastScrollY]);

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
<motion.header
  className=" sticky top-0  bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
  animate={{ height: isVisible ? "64px" : "0px" }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
  <motion.nav
    animate={{ opacity: isVisible ? 1 : 0 }}
    className="container mx-auto px-4 py-4 flex justify-between items-center"
  >
        {/* Animated title */}
        <motion.h1
          variants={headerTitleVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-bold"
        >
          <Link href="/">Coding Blog</Link>
        </motion.h1>
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Nav Links with backlight hover */}
          <div className=" md:flex space-x-4">
          <Link href="/blog" className="backlight-hover hover:scale-105 px-2 py-1 rounded">
            Blog
          </Link>
          <Link href="/tutorials" className="backlight-hover hover:scale-105 px-2 py-1 rounded">
            Tutorials
          </Link>
          <Link href="/ai" className="backlight-hover hover:scale-105 px-2 py-1 rounded">
            AI
          </Link>
          </div>

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
            > <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {currentTheme === 'dark' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              )}
              </svg>
            </button>
          )}
        </div>
      </motion.nav>
    </motion.header>
    
  );
}

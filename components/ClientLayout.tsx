'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname} 
        initial={{ opacity: 1, scale: 2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.4, ease:"easeInOut",
            scale: { type: "spring", visualDuration: 0.5, bounce: 0.4 },
        }}
        className="w-full flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

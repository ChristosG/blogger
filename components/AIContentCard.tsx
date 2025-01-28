'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type AIContentProps = {
  content: {
    slug: string;
    title: string;
    description: string;
  };
};

export default function AIContentCard({ content }: AIContentProps) {
  return (
    <motion.div
      // Scale up on hover, scale slightly down on tap
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      // The backlight-hover class adds the "glow" on hover
      className="
        backlight-hover
        rounded-lg
        shadow-md
        transition-shadow
        bg-gray-100 
        dark:bg-[#2a3b50] 
        text-gray-900 
        dark:text-gray-100
      "
    >
      <Link href={`/ai/${content.slug}`}>
        <div className="prose dark:prose-invert max-w-none p-6">
          <h2 className="text-xl font-bold mb-2">{content.title}</h2>
          <p>{content.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

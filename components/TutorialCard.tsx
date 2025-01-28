'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

type TutorialCardProps = {
  tutorial: {
    slug: string;
    title: string;
    description: string;
    image?: string;
  };
};

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
      <Link href={`/tutorials/${tutorial.slug}`}>
        {/* If you have a local image in /public/, 
            you can replace <img> with <Image> from next/image for optimization */}
        {tutorial.image && (
          <img
            src={tutorial.image}
            alt={tutorial.title}
            className="w-full h-auto"
          />
        )}
        <div className="prose dark:prose-invert max-w-none p-6">
          <h2 className="text-xl font-bold mb-2">{tutorial.title}</h2>
          <p>{tutorial.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

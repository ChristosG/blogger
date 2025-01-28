'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CardData {
  slug: string;
  title: string;
  description?: string;
  image?: string;
}

interface CardProps {
  type: 'blog' | 'tutorials' | 'ai';
  data: CardData;
}

/**
 * A single, reusable card.
 * 
 * - "type" is used to build the link prefix (/blog, /tutorials, or /ai).
 * - "data" contains the slug, title, description, etc.
 */
export default function Card({ type, data }: CardProps) {
  const linkHref = `/${type}/${data.slug}`;

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
      <Link href={linkHref}>
        {/* If there's an image, display it */}
        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-auto"
          />
        )}
        <div className="prose dark:prose-invert max-w-none p-6">
          <h2 className="text-xl font-bold mb-2">{data.title}</h2>
          {data.description && <p>{data.description}</p>}
        </div>
      </Link>
    </motion.div>
  );
}

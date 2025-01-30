import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Home - Coding Blog',
  description: 'Welcome to the Coding Blog main page!',
};

export default function HomePage() {
  return (
    <section className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Coding Blog</h1>
      <p className="text-gray-700 text-lg">
        Explore our blog posts, tutorials, and AI content.
      </p>
    </section>
  );
}

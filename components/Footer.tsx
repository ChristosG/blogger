'use client';

export default function Footer() {
  return (
    <footer
      className="
        bg-gradient-to-r 
        from-gray-300 to-gray-200
        dark:from-gray-900 dark:to-black
        text-gray-900 dark:text-gray-100
        py-5 
        shadow-inner
      "
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm sm:text-base">
          © {2024} Coding Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

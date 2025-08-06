import React from 'react';
import { SiReact, SiTailwindcss, SiVercel } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="w-full py-4 sm:py-6 mt-8 sm:mt-12 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>&copy; {new Date().getFullYear()} Hari Hara Sundaram S. All rights reserved.</span>
        <span className="text-center sm:text-left flex items-center gap-1">
          Built with 
          <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <SiReact className="text-blue-500" />
            React.js
          </span> 
          &amp; 
          <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <SiTailwindcss className="text-cyan-500" />
            Tailwind CSS
          </span>, 
          deployed on 
          <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <SiVercel className="text-black dark:text-white" />
            Vercel
          </span>
          <span className="text-red-500 ml-1">❤️</span>
        </span>
      </div>
    </footer>
  );
} 
import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Subtle background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.svg" 
          alt="AI and technology background" 
          className="w-full h-full object-cover opacity-10 dark:opacity-5"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/80 to-purple-50/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Hari Hara Sundaram S
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
            AI/ML Engineer & Tech Innovator
          </p>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transforming ideas into intelligent solutions through cutting-edge AI, machine learning, and innovative technology development.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#projects" 
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
        
        {/* Floating tech icons */}
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-40 left-20 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
} 
import React from 'react';
import OptimizedImage from './OptimizedImage';

export default function About() {
  return (
    <section id="about" className="mb-16 sm:mb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">About Me</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Professional Headshot */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl headshot-container">
            <OptimizedImage 
              src="/profile-headshot.jpg" 
              alt="Hari Hara Sundaram S - AI/ML Engineer and Tech Innovator" 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
              fetchPriority="high"
              fallbackSrc="/placeholder-headshot.jpg"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Professional credentials overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">AI/ML Engineer</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Tech Innovator & Problem Solver</p>
          </div>
        </div>
        
        {/* About Content */}
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              I'm a passionate AI/ML Engineer with expertise in developing cutting-edge solutions that bridge the gap between artificial intelligence and real-world applications. My journey in technology has been driven by a deep curiosity for how intelligent systems can solve complex problems.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              With a strong foundation in machine learning, computer vision, and natural language processing, I specialize in building voice-first AI agents, developing computer vision systems, and creating intelligent automation solutions. My work spans from retail analytics using YOLOv8 to conversational AI frameworks with ElevenLabs.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              I believe in the power of technology to transform businesses and improve lives. Whether it's developing RPA solutions for process optimization or creating innovative IoT systems, I approach each project with a focus on practical, scalable solutions that deliver real value.
            </p>
          </div>
          
          {/* Key Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">AI/ML Expertise</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Specialized in TensorFlow, YOLO, and advanced machine learning algorithms
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Voice AI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Building conversational AI agents with ElevenLabs and advanced NLP
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Computer Vision</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Real-time analytics and object detection systems for retail applications
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Creating forward-thinking solutions that push technological boundaries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
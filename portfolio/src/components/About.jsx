import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <motion.section
      id="about"
      className="mb-16 sm:mb-24"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Professional Headshot */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.4 }}
        >
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
          <motion.div 
            className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">AI/ML Engineer</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">Tech Innovator & Problem Solver</p>
          </motion.div>
        </motion.div>
        
        {/* About Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
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
            {[
              {
                title: 'AI/ML Expertise',
                description: 'Specialized in TensorFlow, YOLO, and advanced machine learning algorithms',
              },
              {
                title: 'Voice AI',
                description: 'Building conversational AI agents with ElevenLabs and advanced NLP',
              },
              {
                title: 'Computer Vision',
                description: 'Real-time analytics and object detection systems for retail applications',
              },
              {
                title: 'Innovation',
                description: 'Creating forward-thinking solutions that push technological boundaries',
              },
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity" />
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">{highlight.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
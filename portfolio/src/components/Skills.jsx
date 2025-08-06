import React, { useState } from 'react';
import TechIconFast from './TechIconFast';

const skills = [
  { name: 'Java', level: 'Advanced' },
  { name: 'Python', level: 'Expert' },
  { name: 'C', level: 'Advanced' },
  { name: 'YOLO', level: 'Advanced' },
  { name: 'Tensorflow', level: 'Advanced' },
  { name: 'CrewAI', level: 'Intermediate' },
  { name: 'n8n', level: 'Intermediate' },
  { name: 'Langflow', level: 'Intermediate' },
  { name: 'SQL', level: 'Intermediate' },
  { name: 'AWS Cloud', level: 'Intermediate' },
  { name: 'Frontend Technologies', level: 'Intermediate' },
  { name: 'Canva', level: 'Advanced' },
  { name: 'Figma', level: 'Intermediate' },
  { name: 'Leadership', level: 'Advanced' },
  { name: 'Coordination', level: 'Advanced' },
];

export default function Skills() {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <section id="skills" className="mb-16 sm:mb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Skills</h2>
      
      {/* Fast Skills Grid */}
      <div className="relative min-h-[400px] mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center items-center">
          {skills.map((skill, idx) => (
            <div
              key={skill.name}
              className="group relative flex flex-col items-center gap-3 p-4 sm:p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-105 transform"
              title={`${skill.name} - ${skill.level}`}
            >
              <div className="relative">
                <TechIconFast 
                  tech={skill.name} 
                  className="w-16 h-16 sm:w-20 sm:h-20" 
                  onHover={setHoveredTech}
                />
                {/* Enhanced glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
              
              <div className="text-center">
                <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {skill.name}
                </span>
                <div className="mt-1">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {skill.level}
                  </span>
                </div>
              </div>
              
              {/* Enhanced floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute top-4 right-3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-3 left-4 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technology Stack</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Programming Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">AI/ML Frameworks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">AI Tools</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Cloud & Database</span>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
        Hover over the technology icons to see details. Each icon represents a technology or skill I've mastered.
      </p>
    </section>
  );
} 
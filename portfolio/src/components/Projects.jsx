import React, { useState } from 'react';
import TechIconFast from './TechIconFast';
import OptimizedImage from './OptimizedImage';

const projects = [
  {
    title: 'PersonaCache AI Agent',
    summary: 'A framework for building specialized, voice-first AI agents powered by ElevenLabs.',
    tech: ['ElevenLabs', 'Voice AI', 'AI Agents', 'Python'],
    details: 'Developed a comprehensive framework for building specialized, voice-first AI agents powered by ElevenLabs. This project demonstrates advanced conversational AI capabilities and domain-specific knowledge integration for creating hyper-specialized assistants.',
    github: 'https://github.com/haransundar/personacache-ai-agent',
    demo: '#',
    image: '/projects/personacache-ai.jpg',
    imageAlt: 'PersonaCache AI Agent - Voice-first AI framework interface'
  },
  {
    title: 'Vertex AI Projects',
    summary: 'A centralized repository for all Vertex AI projects and experiments.',
    tech: ['Google Cloud', 'Vertex AI', 'Machine Learning', 'Python'],
    details: 'Created a centralized repository showcasing various Vertex AI projects and experiments. This includes machine learning models, AI experiments, and cloud-based AI solutions using Google Cloud Platform.',
    github: 'https://github.com/haransundar/vertex-ai',
    demo: '#',
    image: '/projects/vertex-ai.jpg',
    imageAlt: 'Vertex AI Projects - Google Cloud AI experiments dashboard'
  },
  {
    title: 'Game Projects',
    summary: 'Collection of interactive game projects built with JavaScript.',
    tech: ['JavaScript', 'Game Development', 'HTML5', 'CSS3'],
    details: 'A collection of interactive game projects showcasing JavaScript game development skills. Includes various game mechanics, user interactions, and responsive design for gaming applications.',
    github: 'https://github.com/haransundar/Game-projects',
    demo: '#',
    image: '/projects/game-projects.jpg',
    imageAlt: 'Game Projects - Interactive JavaScript games collection'
  },
  {
    title: 'Google ADK',
    summary: 'Python-based Google Android Development Kit projects.',
    tech: ['Python', 'Android Development', 'Google APIs', 'Mobile Development'],
    details: 'Python-based projects utilizing Google Android Development Kit (ADK) for mobile application development. Focuses on Android app development and Google API integration.',
    github: 'https://github.com/haransundar/Google-adk',
    demo: '#',
    image: '/projects/google-adk.jpg',
    imageAlt: 'Google ADK - Android development with Python projects'
  },
  {
    title: 'AI Projects',
    summary: 'Collection of artificial intelligence and machine learning projects.',
    tech: ['Python', 'Machine Learning', 'AI', 'Data Science'],
    details: 'A comprehensive collection of artificial intelligence and machine learning projects. Includes various AI algorithms, data science experiments, and machine learning models.',
    github: 'https://github.com/haransundar/AI-Projects',
    demo: '#',
    image: '/projects/ai-projects.jpg',
    imageAlt: 'AI Projects - Machine learning and data science collection'
  },
  {
    title: 'RPA Projects',
    summary: 'Robotic Process Automation projects for business process optimization.',
    tech: ['RPA', 'Automation', 'Python', 'Business Process'],
    details: 'Robotic Process Automation projects designed to optimize business processes through automation. Includes workflow automation, process optimization, and efficiency improvements.',
    github: 'https://github.com/haransundar/RPA-Projects',
    demo: '#',
    image: '/projects/rpa-projects.jpg',
    imageAlt: 'RPA Projects - Business process automation solutions'
  },
  {
    title: 'Web Projects',
    summary: 'Collection of web development projects and applications.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    details: 'A diverse collection of web development projects showcasing frontend and backend development skills. Includes responsive web applications, interactive interfaces, and modern web technologies.',
    github: 'https://github.com/haransundar/Web-Projects',
    demo: '#',
    image: '/projects/web-projects.jpg',
    imageAlt: 'Web Projects - Frontend and backend development collection'
  },
  {
    title: 'IoT Projects',
    summary: 'Internet of Things projects using C++ for embedded systems.',
    tech: ['C++', 'IoT', 'Embedded Systems', 'Hardware'],
    details: 'Internet of Things projects built with C++ for embedded systems and hardware integration. Focuses on sensor networks, device communication, and IoT infrastructure.',
    github: 'https://github.com/haransundar/Iot-Projects',
    demo: '#',
    image: '/projects/iot-projects.jpg',
    imageAlt: 'IoT Projects - Embedded systems and hardware integration'
  },
  {
    title: '100ex Buildathon',
    summary: 'Projects from the 100ex Buildathon competition.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Competition'],
    details: 'Projects developed during the 100ex Buildathon competition. Showcases rapid prototyping, hackathon skills, and innovative problem-solving approaches.',
    github: 'https://github.com/haransundar/100exBuildathon',
    demo: '#',
    image: '/projects/100ex-buildathon.jpg',
    imageAlt: '100ex Buildathon - Competition projects and rapid prototyping'
  },
  {
    title: 'Replit Projects',
    summary: 'TypeScript-based projects developed on Replit platform.',
    tech: ['TypeScript', 'Replit', 'Web Development', 'Full Stack'],
    details: 'TypeScript-based projects developed on the Replit platform. Includes full-stack applications, web services, and modern TypeScript development practices.',
    github: 'https://github.com/haransundar/replitprojects-',
    demo: '#',
    image: '/projects/replit-projects.jpg',
    imageAlt: 'Replit Projects - TypeScript full-stack development'
  },
  {
    title: 'Lovable Projects',
    summary: 'Collection of innovative and creative project ideas.',
    tech: ['Innovation', 'Creative Development', 'Prototyping'],
    details: 'A collection of innovative and creative project ideas showcasing problem-solving skills and creative development approaches. Includes prototypes and experimental projects.',
    github: 'https://github.com/haransundar/lovableprojects',
    demo: '#',
    image: '/projects/lovable-projects.jpg',
    imageAlt: 'Lovable Projects - Innovative and creative prototypes'
  },
];

const techFilters = ['All', ...Array.from(new Set(projects.flatMap(p => p.tech)))];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.tech.includes(filter));

  return (
    <section id="projects" className="mb-16 sm:mb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Projects</h2>
      
      {/* Enhanced Filters */}
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
        {techFilters.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full border font-medium transition-all duration-300 text-sm ${
              filter === t 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg scale-105' 
                : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:scale-105'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      
      {/* Enhanced Project Cards with Screenshots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((p, idx) => (
          <div key={idx} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 transform border border-gray-200 dark:border-gray-700 overflow-hidden project-card">
            {/* Project Screenshot */}
            <div className="relative overflow-hidden">
              <OptimizedImage 
                src={p.image} 
                alt={p.imageAlt}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                loading="lazy"
                fallbackSrc="/projects/placeholder-project.svg"
              />
              {/* Overlay with zoom icon */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-2">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">{p.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base flex-grow">{p.summary}</p>
              
              {/* Fast Technology Stack */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => (
                    <div key={t} className="relative group/tech">
                      <TechIconFast 
                        tech={t} 
                        className="w-12 h-12" 
                        onHover={setHoveredTech}
                      />
                      {/* Enhanced tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {t}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium text-sm transition-colors">
                  GitHub
                </a>
                {p.demo !== '#' && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium text-sm transition-colors">
                    Live Demo
                  </a>
                )}
                <button 
                  onClick={() => setModal(p)} 
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Enhanced hover glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
      
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 lightbox-backdrop" onClick={() => setLightboxImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <OptimizedImage 
              src={lightboxImage.image} 
              alt={lightboxImage.imageAlt}
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
              fallbackSrc="/projects/placeholder-project.svg"
            />
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{lightboxImage.title}</h3>
              <p className="text-sm opacity-90">{lightboxImage.imageAlt}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setModal(null)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 text-2xl transition-colors"
            >
              &times;
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">{modal.title}</h3>
            
            {/* Project Screenshot in Modal */}
            {modal.image && (
              <div className="mb-4">
                <OptimizedImage 
                  src={modal.image} 
                  alt={modal.imageAlt}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                  fallbackSrc="/projects/placeholder-project.svg"
                />
              </div>
            )}
            
            {/* Fast Technology Stack in Modal */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Technology Stack</h4>
              <div className="flex flex-wrap gap-3">
              {modal.tech.map(t => (
                  <div key={t} className="relative group/tech">
                    <TechIconFast 
                      tech={t} 
                      className="w-16 h-16" 
                      onHover={setHoveredTech}
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      {t}
                    </div>
                </div>
              ))}
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">{modal.details}</p>
            
            <div className="flex gap-3">
              <a href={modal.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
                GitHub
              </a>
              {modal.demo !== '#' && (
                <a href={modal.demo} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 
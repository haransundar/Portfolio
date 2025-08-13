/**
 * ProjectCard Component
 * Enhanced project card with hover animations and interactive elements
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHoverAnimation } from '../hooks/useAnimation';
import { cn } from '../utils/design-system';
import InteractiveButton from './InteractiveButton';

const ProjectCard = ({
  project,
  className = '',
  onViewDetails,
  showTechStack = true,
  showMetrics = true,
  layout = 'standard', // 'standard', 'featured', 'compact'
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isHovered, elementRef } = useHoverAnimation();

  const {
    id,
    title,
    description,
    image,
    technologies = [],
    metrics = {},
    links = {},
    featured = false,
    status = 'completed',
  } = project;

  // Animation variants
  const cardVariants = {
    rest: {
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    },
    hover: {
      scale: 1.02,
      y: -8,
      rotateX: 5,
      rotateY: 2,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.4 }
    },
  };

  const overlayVariants = {
    rest: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
  };

  // Handle card click
  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(project);
    }
  };

  // Layout configurations
  const layoutConfig = {
    standard: {
      aspectRatio: 'aspect-[4/3]',
      padding: 'p-6',
      imageHeight: 'h-48',
    },
    featured: {
      aspectRatio: 'aspect-[16/10]',
      padding: 'p-8',
      imageHeight: 'h-64',
    },
    compact: {
      aspectRatio: 'aspect-[3/2]',
      padding: 'p-4',
      imageHeight: 'h-32',
    },
  };

  const config = layoutConfig[layout];

  return (
    <motion.article
      ref={elementRef}
      className={cn(
        'group relative bg-white dark:bg-neutral-900',
        'rounded-2xl overflow-hidden cursor-pointer',
        'border border-neutral-200 dark:border-neutral-800',
        'transition-all duration-normal',
        className
      )}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onClick={handleCardClick}
      {...props}
    >
      {/* Status Badge */}
      {status !== 'completed' && (
        <div className="absolute top-4 right-4 z-20">
          <span className={cn(
            'px-3 py-1 rounded-full text-xs font-medium',
            status === 'in-progress' && 'bg-yellow-100 text-yellow-800',
            status === 'planned' && 'bg-blue-100 text-blue-800',
            status === 'archived' && 'bg-gray-100 text-gray-800'
          )}>
            {status.replace('-', ' ')}
          </span>
        </div>
      )}

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full bg-gradient-primary text-white text-xs font-medium">
            Featured
          </span>
        </div>
      )}

      {/* Image Section */}
      <div className={cn('relative overflow-hidden', config.imageHeight)}>
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse" />
        )}
        
        {/* Project Image */}
        <motion.img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-cover',
            !imageLoaded && 'opacity-0'
          )}
          variants={imageVariants}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          variants={overlayVariants}
        />

        {/* Hover Actions */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          variants={overlayVariants}
        >
          {links.demo && (
            <InteractiveButton
              size="sm"
              variant="glass"
              href={links.demo}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </InteractiveButton>
          )}
          
          {links.github && (
            <InteractiveButton
              size="sm"
              variant="glass"
              href={links.github}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </InteractiveButton>
          )}
        </motion.div>
      </div>

      {/* Content Section */}
      <div className={config.padding}>
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Metrics */}
        {showMetrics && Object.keys(metrics).length > 0 && (
          <div className="flex gap-4 mb-4 text-xs text-neutral-500">
            {metrics.stars && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {metrics.stars}
              </div>
            )}
            {metrics.forks && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {metrics.forks}
              </div>
            )}
          </div>
        )}

        {/* Technology Stack */}
        {showTechStack && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-2 py-1 text-neutral-500 text-xs">
                +{technologies.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-primary opacity-0 rounded-2xl blur-xl -z-10"
        animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};

export default ProjectCard;
/**
 * ProjectGrid Component
 * Responsive grid layout for project cards with filtering and search
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '../hooks/useAnimation';
import { cn } from '../utils/design-system';
import ProjectCard from './ProjectCard';
import InteractiveButton from './InteractiveButton';

const ProjectGrid = ({
  projects = [],
  className = '',
  showFilters = true,
  showSearch = true,
  defaultFilter = 'all',
  onProjectSelect,
  gridCols = { sm: 1, md: 2, lg: 3 },
  ...props
}) => {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const { canAnimate } = useAnimation();

  // Extract unique technologies for filters
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      project.technologies?.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length },
    ...allTechnologies.slice(0, 6).map(tech => ({
      id: tech.toLowerCase(),
      label: tech,
      count: projects.filter(p => p.technologies?.includes(tech)).length,
    })),
  ];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply technology filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'featured') {
        filtered = filtered.filter(project => project.featured);
      } else {
        filtered = filtered.filter(project => 
          project.technologies?.some(tech => 
            tech.toLowerCase() === activeFilter
          )
        );
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies?.some(tech => 
          tech.toLowerCase().includes(query)
        )
      );
    }

    return filtered;
  }, [projects, activeFilter, searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: canAnimate ? 0.1 : 0,
        delayChildren: canAnimate ? 0.2 : 0,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: canAnimate ? 0.5 : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: canAnimate ? 0.3 : 0,
      },
    },
  };

  // Grid column classes
  const gridClasses = cn(
    'grid gap-6',
    `grid-cols-${gridCols.sm}`,
    `md:grid-cols-${gridCols.md}`,
    `lg:grid-cols-${gridCols.lg}`
  );

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Header Section */}
      <div className="mb-8">
        {/* Search Bar */}
        {showSearch && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full pl-10 pr-4 py-3 rounded-xl',
                  'bg-white dark:bg-neutral-900',
                  'border border-neutral-200 dark:border-neutral-800',
                  'text-neutral-900 dark:text-white',
                  'placeholder-neutral-500',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  'transition-all duration-normal'
                )}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <InteractiveButton
                key={filter.id}
                size="sm"
                variant={activeFilter === filter.id ? 'primary' : 'ghost'}
                onClick={() => setActiveFilter(filter.id)}
                className="text-sm"
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className={cn(
                    'ml-2 px-2 py-0.5 rounded-full text-xs',
                    activeFilter === filter.id 
                      ? 'bg-white/20' 
                      : 'bg-neutral-200 dark:bg-neutral-700'
                  )}>
                    {filter.count}
                  </span>
                )}
              </InteractiveButton>
            ))}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          {searchQuery ? (
            <>
              Found <span className="font-semibold text-primary-600">{filteredProjects.length}</span> projects 
              matching "<span className="font-medium">{searchQuery}</span>"
            </>
          ) : (
            <>
              Showing <span className="font-semibold text-primary-600">{filteredProjects.length}</span> projects
              {activeFilter !== 'all' && (
                <> in <span className="font-medium">{filterOptions.find(f => f.id === activeFilter)?.label}</span></>
              )}
            </>
          )}
        </p>
      </div>

      {/* Project Grid */}
      <motion.div
        className={gridClasses}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <ProjectCard
                project={project}
                onViewDetails={onProjectSelect}
                layout={project.featured ? 'featured' : 'standard'}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: canAnimate ? 0.5 : 0 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {searchQuery 
              ? `No projects match your search for "${searchQuery}"`
              : `No projects found in the ${filterOptions.find(f => f.id === activeFilter)?.label} category`
            }
          </p>
          <InteractiveButton
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
          >
            Clear Filters
          </InteractiveButton>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectGrid;
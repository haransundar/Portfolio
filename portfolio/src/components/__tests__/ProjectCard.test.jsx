/**
 * ProjectCard Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ProjectCard from '../ProjectCard';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    article: React.forwardRef(({ children, variants, whileHover, onClick, ...props }, ref) => (
      <article ref={ref} data-testid="motion-article" onClick={onClick} {...props}>{children}</article>
    )),
    img: React.forwardRef(({ children, variants, onLoad, ...props }, ref) => (
      <img ref={ref} data-testid="motion-img" onLoad={onLoad} {...props}>{children}</img>
    )),
    div: React.forwardRef(({ children, variants, animate, ...props }, ref) => (
      <div ref={ref} data-testid="motion-div" {...props}>{children}</div>
    )),
  },
}));

// Mock animation hooks
vi.mock('../../hooks/useAnimation', () => ({
  useHoverAnimation: () => ({
    isHovered: false,
    elementRef: { current: null },
  }),
}));

// Mock InteractiveButton
vi.mock('../InteractiveButton', () => ({
  default: ({ children, onClick, href, ...props }) => (
    <button data-testid="interactive-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe('ProjectCard', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'This is a test project description',
    image: '/test-image.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind'],
    metrics: { stars: 42, forks: 12 },
    links: { demo: 'https://demo.com', github: 'https://github.com/test' },
    featured: false,
    status: 'completed',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders project information correctly', () => {
      render(<ProjectCard project={mockProject} />);
      
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('This is a test project description')).toBeInTheDocument();
      expect(screen.getByTestId('motion-img')).toHaveAttribute('src', '/test-image.jpg');
    });

    it('renders technology stack', () => {
      render(<ProjectCard project={mockProject} showTechStack={true} />);
      
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Tailwind')).toBeInTheDocument();
    });

    it('renders metrics when available', () => {
      render(<ProjectCard project={mockProject} showMetrics={true} />);
      
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('renders action buttons for demo and github links', () => {
      render(<ProjectCard project={mockProject} />);
      
      expect(screen.getByText('Demo')).toBeInTheDocument();
      expect(screen.getByText('Code')).toBeInTheDocument();
    });
  });

  describe('Status and Badges', () => {
    it('shows featured badge when project is featured', () => {
      const featuredProject = { ...mockProject, featured: true };
      render(<ProjectCard project={featuredProject} />);
      
      expect(screen.getByText('Featured')).toBeInTheDocument();
    });

    it('shows status badge for non-completed projects', () => {
      const inProgressProject = { ...mockProject, status: 'in-progress' };
      render(<ProjectCard project={inProgressProject} />);
      
      expect(screen.getByText('in progress')).toBeInTheDocument();
    });

    it('does not show status badge for completed projects', () => {
      render(<ProjectCard project={mockProject} />);
      
      expect(screen.queryByText('completed')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onViewDetails when card is clicked', () => {
      const handleViewDetails = vi.fn();
      render(<ProjectCard project={mockProject} onViewDetails={handleViewDetails} />);
      
      fireEvent.click(screen.getByTestId('motion-article'));
      expect(handleViewDetails).toHaveBeenCalledWith(mockProject);
    });

    it('handles image load event', () => {
      render(<ProjectCard project={mockProject} />);
      
      const image = screen.getByTestId('motion-img');
      fireEvent.load(image);
      
      // Image should become visible after loading
      expect(image).not.toHaveClass('opacity-0');
    });
  });

  describe('Layout Variants', () => {
    it('applies standard layout by default', () => {
      render(<ProjectCard project={mockProject} />);
      
      const article = screen.getByTestId('motion-article');
      expect(article).toBeInTheDocument();
    });

    it('applies featured layout when specified', () => {
      render(<ProjectCard project={mockProject} layout="featured" />);
      
      const article = screen.getByTestId('motion-article');
      expect(article).toBeInTheDocument();
    });

    it('applies compact layout when specified', () => {
      render(<ProjectCard project={mockProject} layout="compact" />);
      
      const article = screen.getByTestId('motion-article');
      expect(article).toBeInTheDocument();
    });
  });

  describe('Conditional Rendering', () => {
    it('hides tech stack when showTechStack is false', () => {
      render(<ProjectCard project={mockProject} showTechStack={false} />);
      
      expect(screen.queryByText('React')).not.toBeInTheDocument();
    });

    it('hides metrics when showMetrics is false', () => {
      render(<ProjectCard project={mockProject} showMetrics={false} />);
      
      expect(screen.queryByText('42')).not.toBeInTheDocument();
    });

    it('shows "more" indicator when there are many technologies', () => {
      const projectWithManyTechs = {
        ...mockProject,
        technologies: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Express', 'MongoDB'],
      };
      
      render(<ProjectCard project={projectWithManyTechs} showTechStack={true} />);
      
      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles missing project data gracefully', () => {
      const incompleteProject = {
        id: '1',
        title: 'Test Project',
      };
      
      render(<ProjectCard project={incompleteProject} />);
      
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });

    it('handles missing links gracefully', () => {
      const projectWithoutLinks = { ...mockProject, links: {} };
      
      render(<ProjectCard project={projectWithoutLinks} />);
      
      expect(screen.queryByText('Demo')).not.toBeInTheDocument();
      expect(screen.queryByText('Code')).not.toBeInTheDocument();
    });
  });
});
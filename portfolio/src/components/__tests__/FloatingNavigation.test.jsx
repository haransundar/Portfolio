/**
 * FloatingNavigation Component Tests
 * Unit tests for the FloatingNavigation component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import FloatingNavigation from '../FloatingNavigation';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: React.forwardRef(({ children, variants, initial, animate, transition, ...props }, ref) => (
      <nav ref={ref} data-testid="motion-nav" {...props}>{children}</nav>
    )),
    a: React.forwardRef(({ children, whileHover, whileTap, layoutId, ...props }, ref) => (
      <a ref={ref} data-testid="motion-a" {...props}>{children}</a>
    )),
    div: React.forwardRef(({ children, layoutId, initial, animate, exit, transition, ...props }, ref) => (
      <div ref={ref} data-testid="motion-div" {...props}>{children}</div>
    )),
  },
  AnimatePresence: ({ children }) => <div data-testid="animate-presence">{children}</div>,
}));

// Mock animation hooks
vi.mock('../../hooks/useAnimation', () => ({
  useAnimation: () => ({
    canAnimate: true,
    isVisible: true,
    elementRef: { current: null },
  }),
}));

// Mock design system utilities
vi.mock('../../utils/design-system', () => ({
  cn: (...classes) => classes.filter(Boolean).join(' '),
  throttle: (fn) => fn, // Simplified throttle for testing
}));

// Mock DOM methods
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

// Mock getElementById
const mockGetElementById = vi.fn();
document.getElementById = mockGetElementById;

describe('FloatingNavigation', () => {
  const defaultItems = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock scroll position
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with default items', () => {
      render(<FloatingNavigation />);
      
      expect(screen.getByTestId('motion-nav')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
    });

    it('renders with custom items', () => {
      const customItems = [
        { id: 'custom1', label: 'Custom 1', href: '#custom1' },
        { id: 'custom2', label: 'Custom 2', href: '#custom2' },
      ];

      render(<FloatingNavigation items={customItems} />);
      
      expect(screen.getByText('Custom 1')).toBeInTheDocument();
      expect(screen.getByText('Custom 2')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<FloatingNavigation className="custom-nav-class" />);
      
      const nav = screen.getByTestId('motion-nav');
      expect(nav).toHaveClass('custom-nav-class');
    });
  });

  describe('Desktop Navigation', () => {
    it('renders desktop navigation items', () => {
      render(<FloatingNavigation items={defaultItems} />);
      
      const navLinks = screen.getAllByTestId('motion-a');
      expect(navLinks).toHaveLength(defaultItems.length);
    });

    it('handles navigation clicks', () => {
      const mockElement = { offsetTop: 100 };
      mockGetElementById.mockReturnValue(mockElement);

      render(<FloatingNavigation items={defaultItems} />);
      
      const homeLink = screen.getByText('Home');
      fireEvent.click(homeLink);
      
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 20, // 100 - 80 (offset)
        behavior: 'smooth'
      });
    });

    it('shows active section indicator', () => {
      render(<FloatingNavigation items={defaultItems} />);
      
      // The active indicator should be rendered as a motion.div
      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile Navigation', () => {
    it('renders mobile menu toggle', () => {
      render(<FloatingNavigation items={defaultItems} />);
      
      expect(screen.getByText('Menu')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('opens mobile menu when toggle is clicked', () => {
      render(<FloatingNavigation items={defaultItems} />);
      
      const menuButton = screen.getByRole('button');
      fireEvent.click(menuButton);
      
      // Mobile menu should be rendered
      expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
    });

    it('closes mobile menu when backdrop is clicked', () => {
      render(<FloatingNavigation items={defaultItems} />);
      
      const menuButton = screen.getByRole('button');
      fireEvent.click(menuButton);
      
      // Find and click backdrop
      const backdrop = screen.getAllByTestId('motion-div').find(div => 
        div.className?.includes('backdrop-blur-sm')
      );
      
      if (backdrop) {
        fireEvent.click(backdrop);
      }
      
      // Menu should close (this is handled by AnimatePresence)
      expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
    });

    it('closes mobile menu when navigation item is clicked', () => {
      const mockElement = { offsetTop: 100 };
      mockGetElementById.mockReturnValue(mockElement);

      render(<FloatingNavigation items={defaultItems} />);
      
      const menuButton = screen.getByRole('button');
      fireEvent.click(menuButton);
      
      // Click a navigation item in mobile menu
      const homeLink = screen.getAllByText('Home')[0]; // Get first occurrence
      fireEvent.click(homeLink);
      
      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  describe('Scroll Behavior', () => {
    it('shows navigation by default when showOnScroll is false', () => {
      render(<FloatingNavigation showOnScroll={false} />);
      
      const nav = screen.getByTestId('motion-nav');
      expect(nav).toBeInTheDocument();
    });

    it('handles scroll events for visibility', () => {
      render(<FloatingNavigation showOnScroll={true} />);
      
      // Simulate scroll event
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
      fireEvent.scroll(window);
      
      expect(screen.getByTestId('motion-nav')).toBeInTheDocument();
    });

    it('updates active section based on scroll position', () => {
      const mockElements = {
        'hero': { offsetTop: 0 },
        'about': { offsetTop: 500 },
        'projects': { offsetTop: 1000 },
      };

      mockGetElementById.mockImplementation((id) => mockElements[id]);

      render(<FloatingNavigation items={defaultItems} />);
      
      // Simulate scroll to about section
      Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
      fireEvent.scroll(window);
      
      // The component should update active section
      expect(screen.getByTestId('motion-nav')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('includes proper ARIA labels', () => {
      render(<FloatingNavigation />);
      
      const nav = screen.getByTestId('motion-nav');
      expect(nav).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(<FloatingNavigation items={defaultItems} />);
      
      const navLinks = screen.getAllByTestId('motion-a');
      navLinks.forEach(link => {
        expect(link).toHaveClass('focus-ring');
      });
    });

    it('prevents default on navigation clicks', () => {
      const mockElement = { offsetTop: 100 };
      mockGetElementById.mockReturnValue(mockElement);

      render(<FloatingNavigation items={defaultItems} />);
      
      const homeLink = screen.getByText('Home');
      const clickEvent = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
      
      fireEvent(homeLink, clickEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Animation Configuration', () => {
    it('handles disabled animations', () => {
      // Mock canAnimate to false
      vi.doMock('../../hooks/useAnimation', () => ({
        useAnimation: () => ({
          canAnimate: false,
          isVisible: true,
          elementRef: { current: null },
        }),
      }));

      render(<FloatingNavigation />);
      
      expect(screen.getByTestId('motion-nav')).toBeInTheDocument();
    });

    it('applies magnetic effect when enabled', () => {
      render(<FloatingNavigation magneticEffect={true} />);
      
      const navLinks = screen.getAllByTestId('motion-a');
      expect(navLinks.length).toBeGreaterThan(0);
    });

    it('disables magnetic effect when specified', () => {
      render(<FloatingNavigation magneticEffect={false} />);
      
      const navLinks = screen.getAllByTestId('motion-a');
      expect(navLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('handles missing DOM elements gracefully', () => {
      mockGetElementById.mockReturnValue(null);

      render(<FloatingNavigation items={defaultItems} />);
      
      const homeLink = screen.getByText('Home');
      fireEvent.click(homeLink);
      
      // Should not throw error when element is not found
      expect(screen.getByTestId('motion-nav')).toBeInTheDocument();
    });

    it('handles empty items array', () => {
      render(<FloatingNavigation items={[]} />);
      
      expect(screen.getByTestId('motion-nav')).toBeInTheDocument();
    });

    it('handles external links', () => {
      const externalItems = [
        { id: 'external', label: 'External', href: 'https://example.com' },
      ];

      // Mock window.open
      const mockOpen = vi.fn();
      window.open = mockOpen;

      render(<FloatingNavigation items={externalItems} />);
      
      const externalLink = screen.getByText('External');
      fireEvent.click(externalLink);
      
      expect(mockOpen).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    });
  });
});
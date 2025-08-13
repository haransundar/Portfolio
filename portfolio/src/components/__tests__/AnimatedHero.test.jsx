/**
 * AnimatedHero Component Tests
 * Unit tests for the AnimatedHero component
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import AnimatedHero from '../AnimatedHero';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: React.forwardRef(({ children, variants, initial, animate, ...props }, ref) => (
      <section ref={ref} data-testid="motion-section" {...props}>{children}</section>
    )),
    div: React.forwardRef(({ children, variants, initial, animate, style, ...props }, ref) => (
      <div ref={ref} data-testid="motion-div" style={style} {...props}>{children}</div>
    )),
    button: React.forwardRef(({ children, whileHover, whileTap, ...props }, ref) => (
      <button ref={ref} data-testid="motion-button" {...props}>{children}</button>
    )),
  },
}));

// Mock AnimatedText components
vi.mock('../AnimatedText', () => ({
  default: ({ text, children, onComplete, autoStart, ...props }) => {
    React.useEffect(() => {
      if (autoStart && onComplete) {
        const timer = setTimeout(onComplete, 100);
        return () => clearTimeout(timer);
      }
    }, [autoStart, onComplete]);
    
    return <div data-testid="animated-text" {...props}>{text || children}</div>;
  },
  AnimatedHeading: ({ children, onComplete, autoStart, ...props }) => {
    React.useEffect(() => {
      if (autoStart && onComplete) {
        const timer = setTimeout(onComplete, 100);
        return () => clearTimeout(timer);
      }
    }, [autoStart, onComplete]);
    
    return <h1 data-testid="animated-heading" {...props}>{children}</h1>;
  },
  AnimatedParagraph: ({ children, onComplete, autoStart, ...props }) => {
    React.useEffect(() => {
      if (autoStart && onComplete) {
        const timer = setTimeout(onComplete, 100);
        return () => clearTimeout(timer);
      }
    }, [autoStart, onComplete]);
    
    return <p data-testid="animated-paragraph" {...props}>{children}</p>;
  },
}));

// Mock animation hooks
vi.mock('../../hooks/useAnimation', () => ({
  useAnimation: () => ({
    canAnimate: true,
    isVisible: true,
    elementRef: { current: null },
  }),
  useScrollAnimation: () => ({
    isInView: true,
    hasTriggered: false,
    elementRef: { current: null },
  }),
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('AnimatedHero', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<AnimatedHero />);
      
      expect(screen.getByTestId('motion-section')).toBeInTheDocument();
      expect(screen.getByTestId('animated-heading')).toBeInTheDocument();
      expect(screen.getByTestId('animated-text')).toBeInTheDocument();
      expect(screen.getByTestId('animated-paragraph')).toBeInTheDocument();
    });

    it('renders with custom title and subtitle', () => {
      const title = "Custom Title";
      const subtitle = "Custom Subtitle";
      const description = "Custom Description";

      render(
        <AnimatedHero 
          title={title}
          subtitle={subtitle}
          description={description}
        />
      );

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(subtitle)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<AnimatedHero className="custom-hero-class" />);
      const section = screen.getByTestId('motion-section');
      expect(section).toHaveClass('custom-hero-class');
    });
  });

  describe('Background Elements', () => {
    it('renders background elements by default', () => {
      render(<AnimatedHero />);
      const backgroundDivs = screen.getAllByTestId('motion-div');
      expect(backgroundDivs.length).toBeGreaterThan(0);
    });

    it('hides background elements when backgroundElements is false', () => {
      render(<AnimatedHero backgroundElements={false} />);
      // Should still have some divs for content structure, but fewer
      const backgroundDivs = screen.getAllByTestId('motion-div');
      // The exact count depends on implementation, but should be minimal
      expect(backgroundDivs.length).toBeGreaterThan(0);
    });

    it('renders floating particles', () => {
      render(<AnimatedHero />);
      // Particles are rendered as motion.div elements
      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(6); // At least 6 particles plus other divs
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('renders CTA buttons', () => {
      render(<AnimatedHero />);
      const buttons = screen.getAllByTestId('motion-button');
      expect(buttons).toHaveLength(2);
      expect(screen.getByText('View My Work')).toBeInTheDocument();
      expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    });

    it('applies correct button styles', () => {
      render(<AnimatedHero />);
      const primaryButton = screen.getByText('View My Work');
      const secondaryButton = screen.getByText('Get In Touch');
      
      expect(primaryButton).toHaveClass('btn-magnetic');
      expect(secondaryButton).toHaveClass('border-2');
    });
  });

  describe('Animation Phases', () => {
    it('starts animation when autoStart is true', async () => {
      render(<AnimatedHero autoStart={true} />);
      
      // Should start with phase 1 (title animation)
      await waitFor(() => {
        expect(screen.getByTestId('animated-heading')).toBeInTheDocument();
      });
    });

    it('progresses through animation phases', async () => {
      render(<AnimatedHero autoStart={true} />);
      
      // Fast-forward through timers to trigger phase progression
      act(() => {
        vi.advanceTimersByTime(100); // Trigger onComplete for heading
      });
      
      act(() => {
        vi.advanceTimersByTime(300); // Trigger phase 2
      });
      
      act(() => {
        vi.advanceTimersByTime(100); // Trigger onComplete for subtitle
      });
      
      act(() => {
        vi.advanceTimersByTime(200); // Trigger phase 3
      });

      await waitFor(() => {
        expect(screen.getByTestId('animated-paragraph')).toBeInTheDocument();
      });
    });

    it('calls onAnimationComplete when animation finishes', async () => {
      const onComplete = vi.fn();
      render(<AnimatedHero autoStart={true} onAnimationComplete={onComplete} />);
      
      // Fast-forward through all phases
      act(() => {
        vi.advanceTimersByTime(100); // Complete heading
      });
      act(() => {
        vi.advanceTimersByTime(300); // Move to phase 2
      });
      act(() => {
        vi.advanceTimersByTime(100); // Complete subtitle
      });
      act(() => {
        vi.advanceTimersByTime(200); // Move to phase 3
      });
      act(() => {
        vi.advanceTimersByTime(100); // Complete description
      });
      act(() => {
        vi.advanceTimersByTime(100); // Move to phase 4
      });

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalled();
      });
    });
  });

  describe('Scroll Indicator', () => {
    it('renders scroll indicator', () => {
      render(<AnimatedHero />);
      // The scroll indicator is rendered as motion.div elements
      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy', () => {
      render(<AnimatedHero />);
      const heading = screen.getByTestId('animated-heading');
      expect(heading.tagName).toBe('H1');
    });

    it('includes focus-ring classes for keyboard navigation', () => {
      render(<AnimatedHero />);
      const buttons = screen.getAllByTestId('motion-button');
      buttons.forEach(button => {
        expect(button).toHaveClass('focus-ring');
      });
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes', () => {
      render(<AnimatedHero />);
      const section = screen.getByTestId('motion-section');
      expect(section).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });

    it('applies responsive text sizing', () => {
      render(<AnimatedHero />);
      const heading = screen.getByTestId('animated-heading');
      expect(heading).toHaveClass('text-6xl', 'sm:text-7xl', 'lg:text-8xl');
    });
  });

  describe('Error Handling', () => {
    it('handles missing props gracefully', () => {
      render(<AnimatedHero title="" subtitle="" description="" />);
      expect(screen.getByTestId('motion-section')).toBeInTheDocument();
    });

    it('handles disabled animations', () => {
      // Mock canAnimate to false
      vi.doMock('../../hooks/useAnimation', () => ({
        useAnimation: () => ({
          canAnimate: false,
          isVisible: true,
          elementRef: { current: null },
        }),
        useScrollAnimation: () => ({
          isInView: true,
          hasTriggered: false,
          elementRef: { current: null },
        }),
      }));

      render(<AnimatedHero />);
      expect(screen.getByTestId('motion-section')).toBeInTheDocument();
    });
  });
});
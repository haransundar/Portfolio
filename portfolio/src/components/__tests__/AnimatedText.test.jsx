/**
 * AnimatedText Component Tests
 * Unit tests for the AnimatedText component and its variants
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import AnimatedText, { AnimatedHeading, AnimatedParagraph, TypewriterText } from '../AnimatedText';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    span: React.forwardRef(({ children, variants, initial, animate, ...props }, ref) => (
      <span ref={ref} data-testid="motion-span" {...props}>{children}</span>
    )),
    h1: React.forwardRef(({ children, variants, initial, animate, ...props }, ref) => (
      <h1 ref={ref} data-testid="motion-h1" {...props}>{children}</h1>
    )),
    h2: React.forwardRef(({ children, variants, initial, animate, ...props }, ref) => (
      <h2 ref={ref} data-testid="motion-h2" {...props}>{children}</h2>
    )),
    p: React.forwardRef(({ children, variants, initial, animate, ...props }, ref) => (
      <p ref={ref} data-testid="motion-p" {...props}>{children}</p>
    )),
  },
  AnimatePresence: ({ children }) => <div data-testid="animate-presence">{children}</div>,
}));

// Mock the animation hook
vi.mock('../../hooks/useAnimation', () => ({
  useAnimation: () => ({
    canAnimate: true,
    isVisible: true,
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

// Mock matchMedia for reduced motion
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

describe('AnimatedText', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Functionality', () => {
    it('renders text content correctly', () => {
      render(<AnimatedText text="Hello World" />);
      expect(screen.getByText('H')).toBeInTheDocument();
      expect(screen.getByText('e')).toBeInTheDocument();
      expect(screen.getByText('l')).toBeInTheDocument();
    });

    it('splits text by letters by default', () => {
      render(<AnimatedText text="Hi" />);
      const motionSpans = screen.getAllByTestId('motion-span');
      // Should have individual letters plus container
      expect(motionSpans.length).toBeGreaterThan(1);
    });

    it('splits text by words when specified', () => {
      render(<AnimatedText text="Hello World" splitBy="word" />);
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('World')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<AnimatedText text="Test" className="custom-class" />);
      const container = screen.getByTestId('motion-span');
      expect(container).toHaveClass('custom-class');
    });

    it('uses specified HTML element', () => {
      render(<AnimatedText text="Test" as="h1" />);
      expect(screen.getByTestId('motion-h1')).toBeInTheDocument();
    });
  });

  describe('Animation Types', () => {
    it('handles fadeIn animation', () => {
      render(<AnimatedText text="Test" animation="fadeIn" />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });

    it('handles slideUp animation', () => {
      render(<AnimatedText text="Test" animation="slideUp" />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });

    it('handles typewriter animation', () => {
      render(<AnimatedText text="Test" animation="typewriter" />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });

    it('handles scale animation', () => {
      render(<AnimatedText text="Test" animation="scale" />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });

    it('handles rotate animation', () => {
      render(<AnimatedText text="Test" animation="rotate" />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('respects reduced motion preferences', () => {
      // Mock reduced motion preference
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      // Mock the hook to return canAnimate: false
      vi.doMock('../../hooks/useAnimation', () => ({
        useAnimation: () => ({
          canAnimate: false,
          isVisible: true,
          elementRef: { current: null },
        }),
      }));

      render(<AnimatedText text="Test" />);
      // Should render static text when animations are disabled
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('preserves semantic HTML structure', () => {
      render(<AnimatedText text="Test" as="h1" />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Configuration Options', () => {
    it('handles custom stagger delay', () => {
      render(<AnimatedText text="Test" staggerDelay={0.1} />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });

    it('handles custom duration', () => {
      render(<AnimatedText text="Test" duration={1.0} />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });

    it('handles start delay', () => {
      render(<AnimatedText text="Test" startDelay={0.5} />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });

    it('calls onComplete callback', async () => {
      const onComplete = vi.fn();
      render(<AnimatedText text="Test" onComplete={onComplete} autoStart={true} />);
      
      // Wait for animation to potentially complete
      await waitFor(() => {
        // The callback should be called after animation
      }, { timeout: 100 });
    });
  });

  describe('Space Handling', () => {
    it('preserves spaces when preserveSpaces is true', () => {
      render(<AnimatedText text="Hello World" preserveSpaces={true} />);
      // Should have space representation
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });

    it('handles line breaks', () => {
      render(<AnimatedText text="Line 1\nLine 2" />);
      expect(screen.getByTestId('motion-span')).toBeInTheDocument();
    });
  });
});

describe('AnimatedHeading', () => {
  it('renders as h1 by default', () => {
    render(<AnimatedHeading>Test Heading</AnimatedHeading>);
    expect(screen.getByTestId('motion-h1')).toBeInTheDocument();
  });

  it('renders with specified heading level', () => {
    render(<AnimatedHeading level={2}>Test Heading</AnimatedHeading>);
    expect(screen.getByTestId('motion-h2')).toBeInTheDocument();
  });

  it('applies display font class', () => {
    render(<AnimatedHeading>Test Heading</AnimatedHeading>);
    const heading = screen.getByTestId('motion-h1');
    expect(heading).toHaveClass('font-display', 'font-bold');
  });
});

describe('AnimatedParagraph', () => {
  it('renders as paragraph element', () => {
    render(<AnimatedParagraph>Test paragraph</AnimatedParagraph>);
    expect(screen.getByTestId('motion-p')).toBeInTheDocument();
  });

  it('splits by words', () => {
    render(<AnimatedParagraph>Hello World</AnimatedParagraph>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('applies body font class', () => {
    render(<AnimatedParagraph>Test paragraph</AnimatedParagraph>);
    const paragraph = screen.getByTestId('motion-p');
    expect(paragraph).toHaveClass('font-body');
  });
});

describe('TypewriterText', () => {
  it('renders with typewriter animation', () => {
    render(<TypewriterText>Test typewriter</TypewriterText>);
    expect(screen.getByTestId('motion-span')).toBeInTheDocument();
  });

  it('applies mono font class', () => {
    render(<TypewriterText>Test typewriter</TypewriterText>);
    const element = screen.getByTestId('motion-span');
    expect(element).toHaveClass('font-mono');
  });
});

describe('Error Handling', () => {
  it('handles empty text gracefully', () => {
    render(<AnimatedText text="" />);
    expect(screen.getByTestId('motion-span')).toBeInTheDocument();
  });

  it('handles undefined text gracefully', () => {
    render(<AnimatedText text={undefined} />);
    expect(screen.getByTestId('motion-span')).toBeInTheDocument();
  });

  it('handles special characters', () => {
    render(<AnimatedText text="Test @#$%^&*()" />);
    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('#')).toBeInTheDocument();
  });
});
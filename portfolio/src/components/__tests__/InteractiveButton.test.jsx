/**
 * InteractiveButton Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import InteractiveButton, { 
  PrimaryButton, 
  SecondaryButton, 
  OutlineButton,
  GhostButton,
  GlassButton,
  MagneticButton,
  GlowButton 
} from '../InteractiveButton';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: React.forwardRef(({ children, variants, whileHover, whileTap, ...props }, ref) => (
      <button ref={ref} data-testid="motion-button" {...props}>{children}</button>
    )),
    a: React.forwardRef(({ children, variants, whileHover, whileTap, ...props }, ref) => (
      <a ref={ref} data-testid="motion-a" {...props}>{children}</a>
    )),
    div: React.forwardRef(({ children, variants, animate, transition, style, ...props }, ref) => (
      <div ref={ref} data-testid="motion-div" style={style} {...props}>{children}</div>
    )),
  },
}));

// Mock animation hooks
vi.mock('../../hooks/useAnimation', () => ({
  useAnimation: () => ({
    canAnimate: true,
  }),
  useHoverAnimation: () => ({
    isHovered: false,
    isFocused: false,
    isActive: false,
    elementRef: { current: null },
  }),
}));

describe('InteractiveButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders button with children', () => {
      render(<InteractiveButton>Click me</InteractiveButton>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders as anchor when href is provided', () => {
      render(<InteractiveButton href="/test">Link</InteractiveButton>);
      expect(screen.getByTestId('motion-a')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<InteractiveButton className="custom-class">Button</InteractiveButton>);
      const button = screen.getByTestId('motion-button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('applies primary variant styles', () => {
      render(<InteractiveButton variant="primary">Primary</InteractiveButton>);
      const button = screen.getByTestId('motion-button');
      expect(button).toHaveClass('bg-gradient-primary');
    });

    it('applies secondary variant styles', () => {
      render(<InteractiveButton variant="secondary">Secondary</InteractiveButton>);
      const button = screen.getByTestId('motion-button');
      expect(button).toHaveClass('bg-gradient-secondary');
    });

    it('applies outline variant styles', () => {
      render(<InteractiveButton variant="outline">Outline</InteractiveButton>);
      const button = screen.getByTestId('motion-button');
      expect(button).toHaveClass('border-primary-500');
    });
  });

  describe('Sizes', () => {
    it('applies small size styles', () => {
      render(<InteractiveButton size="sm">Small</InteractiveButton>);
      const button = screen.getByTestId('motion-button');
      expect(button).toHaveClass('px-4', 'py-2', 'text-sm');
    });

    it('applies large size styles', () => {
      render(<InteractiveButton size="lg">Large</InteractiveButton>);
      const button = screen.getByTestId('motion-button');
      expect(button).toHaveClass('px-8', 'py-4', 'text-lg');
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<InteractiveButton disabled>Disabled</InteractiveButton>);
      const button = screen.getByTestId('motion-button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('cursor-not-allowed');
    });

    it('handles loading state', () => {
      render(<InteractiveButton loading>Loading</InteractiveButton>);
      const button = screen.getByTestId('motion-button');
      expect(button).toHaveClass('cursor-wait');
    });
  });

  describe('Click Handling', () => {
    it('calls onClick handler', () => {
      const handleClick = vi.fn();
      render(<InteractiveButton onClick={handleClick}>Click</InteractiveButton>);
      
      fireEvent.click(screen.getByTestId('motion-button'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<InteractiveButton onClick={handleClick} disabled>Click</InteractiveButton>);
      
      fireEvent.click(screen.getByTestId('motion-button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles external links', () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;

      render(<InteractiveButton href="https://example.com" target="_blank">External</InteractiveButton>);
      
      fireEvent.click(screen.getByTestId('motion-a'));
      expect(mockOpen).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    });
  });

  describe('Preset Variants', () => {
    it('renders PrimaryButton', () => {
      render(<PrimaryButton>Primary</PrimaryButton>);
      expect(screen.getByTestId('motion-button')).toHaveClass('bg-gradient-primary');
    });

    it('renders SecondaryButton', () => {
      render(<SecondaryButton>Secondary</SecondaryButton>);
      expect(screen.getByTestId('motion-button')).toHaveClass('bg-gradient-secondary');
    });

    it('renders OutlineButton', () => {
      render(<OutlineButton>Outline</OutlineButton>);
      expect(screen.getByTestId('motion-button')).toHaveClass('border-primary-500');
    });

    it('renders GhostButton', () => {
      render(<GhostButton>Ghost</GhostButton>);
      expect(screen.getByTestId('motion-button')).toHaveClass('bg-transparent');
    });

    it('renders GlassButton', () => {
      render(<GlassButton>Glass</GlassButton>);
      expect(screen.getByTestId('motion-button')).toHaveClass('glass-medium');
    });
  });
});
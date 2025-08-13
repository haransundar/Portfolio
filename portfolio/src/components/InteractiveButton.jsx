/**
 * InteractiveButton Component
 * Modern button with magnetic effects, hover animations, and micro-interactions
 */

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAnimation, useHoverAnimation } from '../hooks/useAnimation';
import { cn } from '../utils/design-system';

const InteractiveButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  magneticEffect = true,
  rippleEffect = true,
  glowEffect = false,
  onClick,
  href,
  target,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);
  const { canAnimate } = useAnimation();
  const { isHovered, isFocused, isActive, elementRef } = useHoverAnimation();
  const buttonRef = useRef(null);

  // Combine refs
  const combinedRef = (node) => {
    buttonRef.current = node;
    if (elementRef) elementRef.current = node;
  };

  // Handle magnetic effect on mouse move
  const handleMouseMove = (e) => {
    if (!magneticEffect || !canAnimate || disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  // Reset magnetic effect
  const handleMouseLeave = () => {
    if (!magneticEffect || !canAnimate) return;
    
    const button = buttonRef.current;
    if (button) {
      button.style.transform = 'translate(0px, 0px)';
    }
  };

  // Handle ripple effect
  const handleClick = (e) => {
    if (disabled || loading) return;

    // Create ripple effect
    if (rippleEffect && canAnimate) {
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const newRipple = {
          id: Date.now(),
          x,
          y,
          size,
        };
        
        setRipples(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
      }
    }

    // Handle navigation
    if (href) {
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    }

    // Call onClick handler
    onClick?.(e);
  };

  // Variant styles
  const variantStyles = {
    primary: {
      base: 'bg-gradient-primary text-white border-transparent',
      hover: 'shadow-primary hover:shadow-xl',
      active: 'bg-gradient-primary',
    },
    secondary: {
      base: 'bg-gradient-secondary text-white border-transparent',
      hover: 'shadow-secondary hover:shadow-xl',
      active: 'bg-gradient-secondary',
    },
    outline: {
      base: 'bg-transparent text-primary-600 border-primary-500 border-2',
      hover: 'bg-primary-500 text-white shadow-primary',
      active: 'bg-primary-600',
    },
    ghost: {
      base: 'bg-transparent text-neutral-700 border-transparent',
      hover: 'bg-neutral-100 text-neutral-900',
      active: 'bg-neutral-200',
    },
    glass: {
      base: 'glass-medium text-neutral-700 border-white/20 border',
      hover: 'glass-strong shadow-lg',
      active: 'glass-strong',
    },
  };

  // Size styles
  const sizeStyles = {
    xs: 'px-3 py-1.5 text-xs rounded-lg',
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl',
  };

  // Animation variants
  const buttonVariants = {
    rest: { 
      scale: 1,
      y: 0,
    },
    hover: { 
      scale: canAnimate ? 1.02 : 1,
      y: canAnimate ? -2 : 0,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    tap: { 
      scale: canAnimate ? 0.98 : 1,
      y: 0,
      transition: { 
        duration: 0.1 
      }
    },
    disabled: {
      scale: 1,
      y: 0,
      opacity: 0.6,
    },
  };

  // Glow animation
  const glowVariants = {
    rest: { opacity: 0 },
    hover: { 
      opacity: glowEffect ? 0.3 : 0,
      transition: { duration: 0.3 }
    },
  };

  // Loading spinner
  const LoadingSpinner = () => (
    <motion.div
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  // Determine component type
  const Component = href ? motion.a : motion.button;
  const componentProps = href 
    ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined }
    : { type: 'button', disabled: disabled || loading };

  return (
    <Component
      ref={combinedRef}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center',
        'font-semibold transition-all duration-normal',
        'focus-ring cursor-pointer select-none',
        'overflow-hidden',
        
        // Size styles
        sizeStyles[size],
        
        // Variant styles
        variantStyles[variant].base,
        !disabled && !loading && variantStyles[variant].hover,
        
        // State styles
        disabled && 'cursor-not-allowed opacity-60',
        loading && 'cursor-wait',
        
        // Custom className
        className
      )}
      variants={buttonVariants}
      initial="rest"
      animate={disabled ? "disabled" : "rest"}
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...componentProps}
      {...props}
    >
      {/* Glow effect */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-primary rounded-inherit opacity-0 blur-md -z-10"
          variants={glowVariants}
          initial="rest"
          animate={isHovered || isFocused ? "hover" : "rest"}
        />
      )}

      {/* Ripple effects */}
      {rippleEffect && (
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute bg-white/30 rounded-full pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <span className={cn(
        'relative z-10 flex items-center gap-2',
        loading && 'opacity-0'
      )}>
        {children}
      </span>

      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </Component>
  );
};

// Preset button variants for common use cases
export const PrimaryButton = (props) => (
  <InteractiveButton variant="primary" {...props} />
);

export const SecondaryButton = (props) => (
  <InteractiveButton variant="secondary" {...props} />
);

export const OutlineButton = (props) => (
  <InteractiveButton variant="outline" {...props} />
);

export const GhostButton = (props) => (
  <InteractiveButton variant="ghost" {...props} />
);

export const GlassButton = (props) => (
  <InteractiveButton variant="glass" {...props} />
);

// Special effect buttons
export const MagneticButton = (props) => (
  <InteractiveButton magneticEffect={true} rippleEffect={true} {...props} />
);

export const GlowButton = (props) => (
  <InteractiveButton glowEffect={true} magneticEffect={true} {...props} />
);

export default InteractiveButton;
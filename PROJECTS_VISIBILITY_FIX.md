# Projects Section Visibility Fix

## Issue Identified
The Projects section was not visible on Vercel deployment due to viewport detection issues with Framer Motion's `whileInView` animation.

## Root Cause
The Projects component was using `whileInView` with `viewport={{ once: true, amount: 0.15 }}`, which requires 15% of the component to be visible before triggering the animation. Due to the large size of the Projects section and potential timing issues on Vercel's deployment, the viewport detection was failing, leaving the section with `opacity: 0` (hidden state).

## Solution Implemented

### 1. Replaced `whileInView` with `useInView` Hook
Changed from declarative `whileInView` prop to the more reliable `useInView` hook from Framer Motion, which provides better control over viewport detection.

### 2. Adjusted Viewport Settings
- Reduced `amount` from `0.15` to `0.05` (only 5% needs to be visible)
- Added negative margin: `margin: "0px 0px -200px 0px"` to trigger animation earlier
- This ensures the animation triggers before the user scrolls to the section

### 3. Optimized Animation Variants
- Reduced animation distances and durations for smoother performance
- Changed from `y: 30` to `y: 20` for less dramatic movement
- Adjusted timing from `0.6s` to `0.5s` for faster response

## Changes Made

**File: `portfolio/src/components/Projects.jsx`**

```javascript
// Before
<motion.section
  id="projects"
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
>

// After
const sectionRef = React.useRef(null);
const isInView = useInView(sectionRef, { 
  once: true, 
  amount: 0.05, 
  margin: "0px 0px -200px 0px" 
});

<motion.section
  ref={sectionRef}
  i
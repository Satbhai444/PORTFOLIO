# Implementation Plan: Webflow Home Clone

## Overview

This implementation plan transforms the existing React portfolio Home page by cloning the Webflow template (https://darshans-fabulous-site-2c3476.webflow.io/). The approach prioritizes extracting design tokens and structure first, then building shared components, implementing section components, and finally integrating animations and optimizations. The implementation preserves all existing pages (About, Projects, Contact) and maintains compatibility with the current tech stack (React 19, Vite, Framer Motion, GSAP, React Router v7).

## Tasks

- [ ] 1. Extract design tokens and structure from Webflow template
  - [x] 1.1 Create extraction utility and extract design tokens
    - Create src/utils/webflowExtractor.js utility
    - Extract colors, typography, spacing, shadows, and border radius values
    - Extract animation timing and easing functions
    - Document color usage contexts
    - Generate src/styles/tokens.js with all extracted values
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  
  - [-] 1.2 Document HTML structure and component hierarchy
    - Identify all major sections from Webflow template
    - Extract DOM hierarchy for each section
    - Document semantic HTML elements and CSS class relationships
    - Create structure documentation in src/components/home/STRUCTURE.md
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 2. Set up project structure and shared components
  - [~] 2.1 Create directory structure for Home page components
    - Create src/components/home/ directory
    - Create src/pages/Home.css file
    - Set up component files: Hero.jsx, IntroSection.jsx, PortfolioSection.jsx, ServicesSection.jsx, TestimonialsSection.jsx, FAQSection.jsx, ContactCTA.jsx
    - _Requirements: 12.1, 12.2, 12.3, 12.6_
  
  - [~] 2.2 Implement shared animation components
    - Create src/components/shared/ClipReveal.jsx component with Framer Motion
    - Create src/components/shared/FadeUp.jsx component with Framer Motion
    - Implement animation wrappers using design tokens for timing
    - Add prefers-reduced-motion support
    - _Requirements: 6.1, 6.3, 6.6, 11.7_
  
  - [~] 2.3 Implement shared UI components
    - Create src/components/shared/Button.jsx component
    - Implement hover animations matching Webflow timing
    - Apply design tokens for styling
    - Ensure keyboard accessibility and focus indicators
    - _Requirements: 4.1, 4.5, 6.4, 11.5, 11.6_

- [ ] 3. Implement Hero section component
  - [~] 3.1 Build Hero component structure and styling
    - Create src/components/home/Hero.jsx component
    - Implement semantic HTML structure (header, h1)
    - Apply design tokens for typography, colors, and spacing
    - Implement responsive layouts for mobile/tablet/desktop breakpoints
    - Ensure color contrast ratios meet WCAG standards (4.5:1)
    - _Requirements: 5.1, 4.2, 4.3, 4.4, 9.1, 9.2, 9.3, 11.1, 11.3_
  
  - [~] 3.2 Add Hero entrance animations
    - Integrate ClipReveal and FadeUp components
    - Apply GSAP scroll-based animations if present in Webflow
    - Ensure animations complete within 800ms
    - Use GPU-accelerated properties (transform, opacity)
    - _Requirements: 6.1, 6.2, 6.3, 6.7, 10.5_

- [ ] 4. Implement Introduction/About section component
  - [~] 4.1 Build IntroSection component structure and styling
    - Create src/components/home/IntroSection.jsx component
    - Implement semantic HTML (section, article)
    - Apply design tokens for visual styling
    - Implement responsive layouts across breakpoints
    - Add alt text for images
    - _Requirements: 5.2, 4.1, 9.4, 9.5, 11.1, 11.2_
  
  - [~] 4.2 Add IntroSection entrance animations
    - Integrate animation components
    - Apply viewport-triggered animations
    - _Requirements: 6.3, 6.7_

- [ ] 5. Implement Services section component
  - [~] 5.1 Build ServicesSection component structure and styling
    - Create src/components/home/ServicesSection.jsx component
    - Implement service items with numbering (001, 002, 003)
    - Apply design tokens and responsive layouts
    - Ensure keyboard navigation for interactive elements
    - _Requirements: 5.3, 4.1, 9.5, 11.6_
  
  - [~] 5.2 Add ServicesSection animations and interactions
    - Implement entrance animations
    - Add hover state animations matching Webflow timing
    - Ensure 44x44px minimum touch targets on mobile
    - _Requirements: 6.3, 6.4, 9.6_

- [ ] 6. Implement Portfolio section component
  - [~] 6.1 Build PortfolioSection component with content integration
    - Create src/components/home/PortfolioSection.jsx component
    - Reference existing project content (TUNIFY, SEIZEFIRE, etc.)
    - Use same image assets as Projects page
    - Ensure data consistency with Projects page
    - Implement responsive image loading with srcset
    - Apply lazy loading for below-the-fold images
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 10.3, 10.7_
  
  - [~] 6.2 Add PortfolioSection animations
    - Implement entrance animations for project cards
    - Add hover interactions matching Webflow
    - _Requirements: 6.3, 6.4_

- [ ] 7. Implement Testimonials section component
  - [~] 7.1 Build TestimonialsSection component structure and styling
    - Create src/components/home/TestimonialsSection.jsx component
    - Implement semantic HTML structure
    - Apply design tokens for styling
    - Implement responsive layouts
    - _Requirements: 5.6, 5.7, 4.1, 9.5_
  
  - [~] 7.2 Add TestimonialsSection animations
    - Implement entrance animations
    - Add any carousel or slide interactions if present
    - _Requirements: 6.3_

- [ ] 8. Implement FAQ section component
  - [~] 8.1 Build FAQSection component structure and styling
    - Create src/components/home/FAQSection.jsx component
    - Implement expandable questions with numbering (001-005)
    - Manage expansion state internally
    - Apply design tokens for styling
    - Implement keyboard navigation (Enter/Space to toggle)
    - _Requirements: 5.4, 5.5, 4.1, 11.6_
  
  - [~] 8.2 Add FAQ expand/collapse animations and accessibility
    - Implement smooth expand/collapse animations with Framer Motion
    - Update aria-expanded attributes on toggle
    - Add ARIA labels for accessibility
    - Ensure visible focus indicators
    - _Requirements: 6.5, 11.5, 11.8, 11.9_

- [ ] 9. Implement Contact CTA section component
  - [~] 9.1 Build ContactCTA component structure and styling
    - Create src/components/home/ContactCTA.jsx component
    - Implement call-to-action with Button component
    - Apply design tokens for styling
    - Implement responsive layouts
    - _Requirements: 5.6, 4.1, 9.5_
  
  - [~] 9.2 Add ContactCTA animations
    - Implement entrance animations
    - _Requirements: 6.3_

- [ ] 10. Integrate all sections into Home page
  - [~] 10.1 Compose Home page with all section components
    - Update src/pages/Home.jsx to import all section components
    - Compose sections in correct visual order (Hero → Intro → Portfolio → Services → Testimonials → FAQ → ContactCTA)
    - Apply appropriate spacing between sections
    - Import and apply design tokens
    - Ensure Navbar and Footer integration
    - _Requirements: 5.6, 5.7, 1.6, 2.6_
  
  - [~] 10.2 Implement scoped styles for Home page
    - Create src/pages/Home.css with scoped styles
    - Use CSS modules or scoped class names to prevent style leakage
    - Ensure no conflicts with existing pages' styles
    - Do not override global CSS variables used by other pages
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_
  
  - [~] 10.3 Verify router integration and navigation
    - Ensure Home.jsx is properly connected to root route ('/') in App.jsx
    - Verify About, Projects, and Contact pages remain unchanged
    - Test navigation between all pages
    - Verify existing Router configuration is preserved
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [~] 11. Checkpoint - Test basic functionality and visual accuracy
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement performance optimizations
  - [~] 12.1 Optimize animation performance
    - Verify GSAP scroll animations maintain 60fps
    - Ensure GPU-accelerated CSS properties are used
    - Optimize animation complexity for smooth performance
    - _Requirements: 10.4, 10.5_
  
  - [~] 12.2 Implement code splitting and lazy loading
    - Defer non-critical JavaScript execution
    - Implement dynamic imports for section components if needed
    - Verify images below fold are lazy-loaded
    - _Requirements: 10.3, 10.6_
  
  - [~] 12.3 Run Lighthouse performance audit
    - Run Lighthouse audit
    - Verify performance score >= 90
    - Verify initial load time <= 2 seconds on simulated 3G
    - Address any performance issues identified
    - _Requirements: 10.1, 10.2_

- [ ] 13. Implement accessibility enhancements
  - [~] 13.1 Verify semantic HTML and ARIA attributes
    - Audit all section components for proper semantic HTML5 elements
    - Verify ARIA labels are present for interactive elements without visible labels
    - Verify aria-expanded attributes on FAQ items
    - Test keyboard navigation across all interactive elements
    - _Requirements: 11.1, 11.6, 11.8, 11.9_
  
  - [~] 13.2 Verify color contrast and focus indicators
    - Audit color contrast ratios (4.5:1 for normal text, 3:1 for large text)
    - Verify visible focus indicators on all interactive elements
    - Test prefers-reduced-motion media query behavior
    - _Requirements: 11.3, 11.4, 11.5, 11.7_
  
  - [~] 13.3 Test with screen readers
    - Test navigation with keyboard only
    - Test with screen reader (NVDA/JAWS/VoiceOver)
    - Verify all images have appropriate alt text
    - _Requirements: 11.2, 11.6_

- [ ] 14. Cross-browser testing and compatibility
  - [~] 14.1 Test in multiple browsers
    - Test functionality in Chrome >= 90
    - Test functionality in Firefox >= 88
    - Test functionality in Safari >= 14
    - Test functionality in Edge >= 90
    - Verify animations work consistently across browsers
    - _Requirements: 14.1, 14.2, 14.3, 14.4_
  
  - [~] 14.2 Implement browser-specific fixes if needed
    - Add vendor prefixes where required
    - Implement graceful degradation for unsupported features
    - _Requirements: 14.5, 14.6_

- [ ] 15. Responsive design testing
  - [~] 15.1 Test responsive layouts across breakpoints
    - Test desktop layout (>= 1280px)
    - Test tablet layout (768px - 1279px)
    - Test mobile layout (< 768px)
    - Verify typography scaling at each breakpoint
    - Verify horizontal elements stack vertically on mobile
    - Verify touch targets are at least 44x44px on mobile
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [ ] 16. Build and deployment verification
  - [~] 16.1 Verify build process
    - Run 'npm run build' and verify no errors
    - Run 'npm run dev' and verify development server starts
    - Run 'npm run lint' and verify ESLint passes
    - Verify no build warnings about deprecated dependencies
    - _Requirements: 13.1, 13.2, 13.3, 13.5_
  
  - [~] 16.2 Verify deployment compatibility
    - Verify compatibility with Vercel deployment configuration
    - Test build output in production mode
    - Verify production behavior matches development
    - _Requirements: 13.4, 13.6_

- [ ] 17. Final integration testing
  - [~] 17.1 Verify style isolation from existing pages
    - Navigate from Home to About and verify About styles are unchanged
    - Navigate from Home to Projects and verify Projects styles are unchanged
    - Navigate from Home to Contact and verify Contact styles are unchanged
    - Verify global styles remain intact
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_
  
  - [~] 17.2 Verify content integration
    - Verify project content matches Projects page
    - Test that updating project content reflects on both Home and Projects pages
    - Verify image assets are consistent
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [~] 17.3 Verify Firebase integration
    - Verify compatibility with existing firebase.js configuration
    - Test analytics tracking if implemented
    - _Requirements: 8.6_

- [~] 18. Final checkpoint - Comprehensive review
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and allow for user feedback
- The implementation follows a bottom-up approach: tokens → shared components → sections → integration → optimization
- Visual accuracy targets: colors within 5% RGB difference, fonts within 2px, spacing within 4px
- Performance targets: Lighthouse score >= 90, initial load <= 2 seconds on 3G, 60fps animations
- Accessibility targets: WCAG color contrast standards, keyboard navigation, screen reader support
- Browser support: Chrome/Edge/Firefox >= 90/88, Safari >= 14
- Responsive breakpoints: Mobile (< 768px), Tablet (768-1279px), Desktop (>= 1280px)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3"] },
    { "id": 2, "tasks": ["3.1", "4.1", "5.1", "6.1", "7.1", "8.1", "9.1"] },
    { "id": 3, "tasks": ["3.2", "4.2", "5.2", "6.2", "7.2", "8.2", "9.2"] },
    { "id": 4, "tasks": ["10.1", "10.2"] },
    { "id": 5, "tasks": ["10.3"] },
    { "id": 6, "tasks": ["12.1", "12.2"] },
    { "id": 7, "tasks": ["12.3", "13.1", "13.2", "14.1", "15.1"] },
    { "id": 8, "tasks": ["13.3", "14.2"] },
    { "id": 9, "tasks": ["16.1"] },
    { "id": 10, "tasks": ["16.2", "17.1", "17.2", "17.3"] }
  ]
}
```

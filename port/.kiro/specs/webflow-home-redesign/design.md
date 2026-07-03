# Design: Webflow Home Page Redesign

## Overview

This design document outlines the architecture and implementation approach for replacing the current Home.jsx with a Webflow-inspired design. The solution focuses on programmatic design token extraction, modular component architecture, and pixel-perfect visual fidelity while maintaining performance and accessibility standards.

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Home Page                            │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Section Composition Layer                      │ │
│  │  (Assembles sections with transitions & spacing)      │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
│  ┌───────────┬──────────┬──────────┬───────────┬─────────┐ │
│  │  Hero     │  Intro   │ Portfolio│  Services │   FAQ   │ │
│  │  Section  │  Section │  Section │  Section  │ Section │ │
│  └───────────┴──────────┴──────────┴───────────┴─────────┘ │
│                          │                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Shared Component Library                       │ │
│  │  (Buttons, Cards, Animations, Typography)             │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Design Token System                            │ │
│  │  (Colors, Typography, Spacing, Animations)            │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
           │                      │                    │
    ┌──────────┐          ┌──────────┐         ┌──────────┐
    │  Data    │          │ Firebase │         │  React   │
    │  Layer   │          │ Services │         │  Router  │
    └──────────┘          └──────────┘         └──────────┘
```

### Directory Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── IntroSection.jsx
│   │   ├── PortfolioSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── FAQSection.jsx
│   │   └── ContactCTASection.jsx
│   ├── shared/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ClipReveal.jsx
│   │   ├── FadeUp.jsx
│   │   └── ProjectRow.jsx
│   └── animation/
│       ├── ScrollTrigger.jsx
│       └── ParallaxWrapper.jsx
├── data/
│   ├── projects.js
│   ├── services.js
│   ├── testimonials.js
│   └── faqs.js
├── styles/
│   ├── tokens.js
│   ├── global.css
│   └── sections/
│       ├── hero.css
│       ├── intro.css
│       └── ...
├── hooks/
│   ├── useIntersectionObserver.js
│   ├── useReducedMotion.js
│   └── useScrollProgress.js
├── utils/
│   ├── extractDesignTokens.js
│   └── animations.js
└── pages/
    └── Home.jsx
```


---

## Component Architecture

### 1. Design Token System

**Purpose:** Centralize all design values extracted from the Webflow template for consistent styling.

**Design Token Structure:**

```javascript
// src/styles/tokens.js
export const tokens = {
  colors: {
    primary: {
      background: '#0a0a0a',
      text: '#ffffff',
      accent: '#ff6b35'
    },
    secondary: {
      background: '#f2f2f2',
      text: '#1a1a1a',
      muted: '#666666'
    },
    interactive: {
      hover: '#ff8555',
      active: '#ff5015',
      focus: 'rgba(255, 107, 53, 0.2)'
    }
  },
  typography: {
    fontFamilies: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: '"Space Grotesk", sans-serif',
      mono: '"JetBrains Mono", monospace'
    },
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
      '8xl': '6rem'     // 96px
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      tight: 1.1,
      snug: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 1.8
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
      wider: '0.1em'
    }
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '6rem',  // 96px
    '4xl': '8rem',  // 128px
    '5xl': '12rem'  // 192px
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    fast: '150ms cubic-bezier(0.16, 1, 0.3, 1)',
    medium: '300ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '600ms cubic-bezier(0.16, 1, 0.3, 1)'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px'
  }
};
```


**Design Token Extraction Utility:**

```javascript
// src/utils/extractDesignTokens.js
/**
 * Extracts design tokens from a live Webflow site
 * Runs in browser console or as a Node script with puppeteer
 */
export const extractDesignTokens = () => {
  const tokens = {
    colors: new Set(),
    fonts: new Set(),
    spacing: new Set()
  };

  // Extract computed styles from all elements
  const elements = document.querySelectorAll('*');
  elements.forEach(el => {
    const computed = window.getComputedStyle(el);
    
    // Colors
    ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
      const value = computed[prop];
      if (value && value !== 'rgba(0, 0, 0, 0)') {
        tokens.colors.add(value);
      }
    });
    
    // Typography
    tokens.fonts.add({
      family: computed.fontFamily,
      size: computed.fontSize,
      weight: computed.fontWeight,
      lineHeight: computed.lineHeight
    });
    
    // Spacing
    ['padding', 'margin', 'gap'].forEach(prop => {
      const value = computed[prop];
      if (value && value !== '0px') {
        tokens.spacing.add(value);
      }
    });
  });

  return {
    colors: Array.from(tokens.colors),
    fonts: Array.from(tokens.fonts),
    spacing: Array.from(tokens.spacing)
  };
};
```


### 2. Section Components

#### HeroSection Component

**Purpose:** Display the main hero with animated name, avatar card, and scroll indicator.

**Props Interface:**

```javascript
{
  firstName: string,
  lastName: string,
  avatarImage: string,
  scrollTarget: string
}
```

**Key Features:**
- Letter-by-letter animation for name reveal
- 3D card flip animation for avatar
- Floating scroll indicator with bounce animation
- Curved SVG divider at bottom
- Responsive typography scaling

**Animation Timeline:**
1. Letters animate in sequentially (0.1s - 0.8s)
2. Avatar card fades and flips into view (0.25s - 1.45s)
3. Scroll indicator fades in and begins bounce (1.3s+)

#### IntroSection Component

**Purpose:** Brief introduction text with call-to-action and "Since 2025" visual element.

**Props Interface:**

```javascript
{
  introText: string,
  ctaText: string,
  ctaLink: string,
  sinceYear: string
}
```

**Key Features:**
- Fade-up animation on scroll into view
- Large background text "SINCE 2025" with clip reveal
- Centered layout with white background
- Pill-shaped CTA button

#### PortfolioSection Component

**Purpose:** Interactive project list with hover-triggered image preview.

**Props Interface:**

```javascript
{
  projects: Array<{
    title: string,
    category: string,
    image: string,
    link: string
  }>
}
```

**Key Features:**
- Two-column layout (list + preview)
- Hover triggers image display in sticky preview area
- Staggered row animations on scroll
- Title clip reveal animation per row
- Responsive: preview moves below list on mobile

**State Management:**
```javascript
const [hoveredImage, setHoveredImage] = useState(null);
```


#### ServicesSection Component

**Purpose:** Display service offerings in a card format with numbered items.

**Props Interface:**

```javascript
{
  services: Array<{
    number: string,
    title: string,
    description: string
  }>
}
```

**Key Features:**
- White card container on dark background
- Each service row with number, title, and description
- Staggered fade-up animations (0.1s delay between items)
- Semantic HTML with proper heading hierarchy

#### TestimonialsSection Component

**Purpose:** Carousel slider for client testimonials with navigation controls.

**Props Interface:**

```javascript
{
  testimonials: Array<{
    text: string,
    author: string,
    company: string
  }>
}
```

**Key Features:**
- Current slide with fade transition
- Previous/Next navigation buttons
- Slide counter (01 / 05 format)
- Auto-advance capability (optional)
- Keyboard navigation support (arrow keys)

**State Management:**
```javascript
const [currentIndex, setCurrentIndex] = useState(0);
const prev = () => setCurrentIndex(i => (i - 1 + testimonials.length) % testimonials.length);
const next = () => setCurrentIndex(i => (i + 1) % testimonials.length);
```

#### FAQSection Component

**Purpose:** Accordion-style FAQ with expandable answers.

**Props Interface:**

```javascript
{
  faqs: Array<{
    question: string,
    answer: string
  }>
}
```

**Key Features:**
- Click to expand/collapse answers
- Animated plus icon rotates to X when open
- Height animation for smooth expansion
- Only one FAQ open at a time (optional: allow multiple)
- Numbered questions (01, 02, etc.)

**State Management:**
```javascript
const [openIndex, setOpenIndex] = useState(null);
const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
```


#### ContactCTASection Component

**Purpose:** Final call-to-action with massive background text and floating card.

**Props Interface:**

```javascript
{
  ctaText: string,
  buttonText: string,
  buttonLink: string
}
```

**Key Features:**
- Massive "CONTACT ME" background text
- Floating white card with CTA content
- Fade-up animation for card content
- High contrast design for emphasis

---

## Shared Component Library

### ClipReveal Component

**Purpose:** Reusable animation wrapper for clip-path reveal effects.

```javascript
const ClipReveal = ({ children, delay = 0, duration = 0.9 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  
  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
```

### FadeUp Component

**Purpose:** Reusable fade and slide-up animation wrapper.

```javascript
const FadeUp = ({ children, delay = 0, duration = 0.8 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
```

### Button Component

**Purpose:** Reusable pill-shaped button with variants.

```javascript
const Button = ({ 
  children, 
  variant = 'dark', // 'dark' | 'light'
  to,
  onClick,
  ...props 
}) => {
  const className = `pill-btn pill-${variant}`;
  
  return to ? (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
};
```


---

## Data Layer

### Data File Structure

All content is externalized for easy updates without touching component code.

```javascript
// src/data/projects.js
export const projects = [
  {
    id: 'tunify',
    title: 'TUNIFY',
    category: 'MUSIC STREAMING APP',
    image: '/tunify_app.png',
    link: '/projects'
  },
  // ... more projects
];

// src/data/services.js
export const services = [
  {
    number: '001',
    title: 'Web Design',
    description: 'Creating unique designs that reflect brand identity...'
  },
  // ... more services
];

// src/data/testimonials.js
export const testimonials = [
  {
    id: 1,
    text: 'His custom website designs, coding solutions...',
    author: 'Emily H.',
    company: 'Airtable'
  },
  // ... more testimonials
];

// src/data/faqs.js
export const faqs = [
  {
    id: 1,
    question: 'How long do projects typically take?',
    answer: 'Project timelines vary based on complexity...'
  },
  // ... more FAQs
];
```

---

## Animation Strategy

### Animation Principles

1. **Performance First:** Use CSS transforms and opacity only (GPU-accelerated)
2. **Meaningful Motion:** Animations should enhance understanding, not distract
3. **Respect Preferences:** Honor `prefers-reduced-motion` setting
4. **Consistent Easing:** Use cubic-bezier(0.16, 1, 0.3, 1) for smooth, natural feel
5. **Staggered Reveals:** Create visual hierarchy with delayed animations

### Animation Types

#### 1. Entrance Animations (Scroll-Triggered)
- **ClipReveal:** Elements slide up from behind a mask
- **FadeUp:** Elements fade in while sliding up
- **Stagger:** Sequential animation for lists (0.06-0.1s delay per item)

#### 2. Hover Animations (GSAP)
```javascript
// Button hover
gsap.to(buttonRef.current, {
  scale: 1.05,
  duration: 0.3,
  ease: 'power2.out'
});

// Image preview
gsap.to(imageRef.current, {
  scale: 1,
  opacity: 1,
  duration: 0.35,
  ease: 'power3.out'
});
```

#### 3. Page Load Animations (Framer Motion)
```javascript
// Hero name animation
{
  initial: { y: "110%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { 
    duration: 0.8, 
    delay: 0.1 + index * 0.055,
    ease: [0.16, 1, 0.3, 1]
  }
}
```

### Reduced Motion Support

```javascript
// hooks/useReducedMotion.js
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};
```


---

## Responsive Design Strategy

### Breakpoint System

```css
/* Mobile First Approach */
.container {
  /* Base styles (mobile 320px+) */
}

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1440px) {
  /* Wide desktop styles */
}
```

### Layout Patterns by Breakpoint

| Component | Mobile (320-767px) | Tablet (768-1023px) | Desktop (1024px+) |
|-----------|-------------------|---------------------|-------------------|
| Hero Name | Stack vertically, 48px font | Stack, 60px font | Side-by-side, 96px font |
| Projects | Single column list | Single column + preview below | Two columns (list + sticky preview) |
| Services | Stack vertically | Stack with wider card | Stack with max-width |
| Testimonials | Full width | Centered, max-width 600px | Centered, max-width 800px |
| FAQ | Full width accordion | Max-width 700px | Max-width 900px |

### Typography Scaling

```javascript
// Using CSS clamp for fluid typography
const responsiveScale = {
  hero: 'clamp(3rem, 8vw, 6rem)',        // 48px - 96px
  h1: 'clamp(2rem, 5vw, 3.75rem)',      // 32px - 60px
  h2: 'clamp(1.5rem, 4vw, 2.25rem)',    // 24px - 36px
  h3: 'clamp(1.25rem, 3vw, 1.875rem)',  // 20px - 30px
  body: 'clamp(1rem, 2vw, 1.125rem)'    // 16px - 18px
};
```

---

## Performance Optimization

### Code Splitting Strategy

```javascript
// Lazy load sections below the fold
const PortfolioSection = lazy(() => import('./sections/PortfolioSection'));
const ServicesSection = lazy(() => import('./sections/ServicesSection'));
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'));
const FAQSection = lazy(() => import('./sections/FAQSection'));

// Wrap in Suspense with loading fallback
<Suspense fallback={<SectionLoader />}>
  <PortfolioSection projects={projects} />
</Suspense>
```

### Image Optimization

```javascript
// Implement lazy loading for images
<img 
  src={project.image} 
  alt={project.title}
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
/>

// Optional: Use modern formats with fallback
<picture>
  <source srcSet={`${image}.webp`} type="image/webp" />
  <img src={`${image}.jpg`} alt={alt} loading="lazy" />
</picture>
```

### Animation Performance

```javascript
// Use will-change sparingly for animated elements
.hero-card {
  will-change: transform;
}

// Remove will-change after animation completes
useEffect(() => {
  const element = ref.current;
  const timer = setTimeout(() => {
    element.style.willChange = 'auto';
  }, 1500);
  return () => clearTimeout(timer);
}, []);
```

### Bundle Size Optimization

- Tree-shake unused Framer Motion features
- Import only needed GSAP modules
- Use dynamic imports for heavy dependencies
- Minimize CSS with PurgeCSS in production


---

## Accessibility Implementation

### Keyboard Navigation

```javascript
// Ensure all interactive elements are keyboard accessible
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="faq-item">
    <button
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${id}`}
      className="faq-trigger"
    >
      <span>{question}</span>
      <PlusIcon aria-hidden="true" />
    </button>
    <div 
      id={`faq-answer-${id}`}
      role="region"
      aria-labelledby={`faq-question-${id}`}
      hidden={!isOpen}
    >
      {answer}
    </div>
  </div>
);
```

### Screen Reader Support

```javascript
// Provide descriptive labels and semantic HTML
<nav aria-label="Main navigation">
  <Link to="/about" aria-label="Learn more about Darshan">
    About
  </Link>
</nav>

<section aria-labelledby="services-heading">
  <h2 id="services-heading" className="sr-only">
    My Services
  </h2>
  {/* Services content */}
</section>

// Skip link for keyboard users
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Focus Management

```javascript
// Visible focus indicators
.button:focus-visible,
.link:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

// Trap focus in modals (if needed)
const useFocusTrap = (ref) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input, select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };
    
    element.addEventListener('keydown', handleTab);
    return () => element.removeEventListener('keydown', handleTab);
  }, [ref]);
};
```

### Color Contrast

All text must meet WCAG 2.1 AA standards:
- Normal text (< 18pt): 4.5:1 contrast ratio
- Large text (≥ 18pt or bold ≥ 14pt): 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

```javascript
// Validate contrast ratios during build
const validateContrast = (foreground, background) => {
  const ratio = calculateContrastRatio(foreground, background);
  if (ratio < 4.5) {
    console.warn(`Insufficient contrast: ${ratio.toFixed(2)}:1`);
  }
};
```

---

## Firebase Integration

### Configuration

```javascript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
```

### Analytics Tracking

```javascript
// Track page views and custom events
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

// In Home.jsx or App.jsx
useEffect(() => {
  logEvent(analytics, 'page_view', {
    page_path: location.pathname,
    page_title: 'Home'
  });
}, [location]);

// Track interactions
const handleProjectClick = (projectTitle) => {
  logEvent(analytics, 'project_view', {
    project_name: projectTitle
  });
};

const handleCTAClick = (ctaLocation) => {
  logEvent(analytics, 'cta_click', {
    location: ctaLocation
  });
};
```

### Contact Form Integration

```javascript
// Form submission with Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const handleContactSubmit = async (formData) => {
  try {
    await addDoc(collection(db, 'contacts'), {
      ...formData,
      timestamp: serverTimestamp(),
      source: 'home_page_cta'
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error: error.message };
  }
};
```


---

## Error Handling

### Error Boundary Implementation

```javascript
// components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Section render error:', error, errorInfo);
    // Optional: Log to Firebase Analytics
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <p>Something went wrong loading this section.</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Wrap sections in error boundaries
<ErrorBoundary>
  <PortfolioSection projects={projects} />
</ErrorBoundary>
```

### Graceful Degradation

```javascript
// Handle missing images
const ProjectImage = ({ src, alt }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className="image-placeholder">
        <span>{alt}</span>
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

// Handle Firebase errors
const safeLogEvent = (eventName, params) => {
  try {
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch (error) {
    console.warn('Analytics error:', error);
    // Continue without analytics
  }
};
```

---

## Testing Strategy

### Unit Testing

```javascript
// Test individual components
describe('Button', () => {
  it('renders with correct variant class', () => {
    const { container } = render(<Button variant="dark">Click</Button>);
    expect(container.querySelector('.pill-dark')).toBeInTheDocument();
  });
  
  it('renders as link when "to" prop is provided', () => {
    const { getByRole } = render(<Button to="/about">Link</Button>);
    expect(getByRole('link')).toHaveAttribute('href', '/about');
  });
});

// Test animation components
describe('FadeUp', () => {
  it('applies initial opacity and y transform', () => {
    const { container } = render(
      <FadeUp>
        <div>Content</div>
      </FadeUp>
    );
    // Test initial state
  });
});
```

### Integration Testing

```javascript
// Test section composition
describe('Home Page', () => {
  it('renders all sections in correct order', () => {
    const { container } = render(<Home />);
    const sections = container.querySelectorAll('section');
    
    expect(sections[0]).toHaveClass('hero-section');
    expect(sections[1]).toHaveClass('intro-section');
    expect(sections[2]).toHaveClass('portfolio-section');
    // ... etc
  });
  
  it('navigates to projects page when clicking CTA', async () => {
    const { getByText } = render(<Home />);
    const ctaButton = getByText('VIEW MY PORTFOLIO');
    
    fireEvent.click(ctaButton);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/projects');
    });
  });
});
```

### Visual Regression Testing

```javascript
// Use tools like Percy or Chromatic for visual diffs
// Example with @testing-library/react
describe('Visual Regression', () => {
  it('matches snapshot for hero section', () => {
    const { container } = render(<HeroSection {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
```

### Accessibility Testing

```javascript
// Use jest-axe for automated a11y testing
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('allows keyboard navigation through FAQ', () => {
    const { getAllByRole } = render(<FAQSection faqs={mockFaqs} />);
    const buttons = getAllByRole('button');
    
    buttons[0].focus();
    expect(document.activeElement).toBe(buttons[0]);
    
    fireEvent.keyDown(buttons[0], { key: 'Tab' });
    expect(document.activeElement).toBe(buttons[1]);
  });
});
```


---

## Implementation Approach

### Phase 1: Foundation (Week 1)
1. Set up design token extraction utility
2. Run extraction script on Webflow template
3. Create tokens.js with normalized values
4. Update CSS variables in global.css
5. Create directory structure for sections and shared components

### Phase 2: Core Sections (Week 2)
1. Implement HeroSection with letter animations
2. Implement IntroSection with fade-up animations
3. Implement PortfolioSection with hover preview
4. Test responsive behavior across breakpoints
5. Verify animation performance

### Phase 3: Interactive Sections (Week 3)
1. Implement ServicesSection with card layout
2. Implement TestimonialsSection with carousel
3. Implement FAQSection with accordion
4. Implement ContactCTASection
5. Add keyboard navigation and ARIA labels

### Phase 4: Integration & Polish (Week 4)
1. Integrate Firebase analytics tracking
2. Add error boundaries and error handling
3. Optimize bundle size and lazy loading
4. Run accessibility audits
5. Perform visual QA against Webflow template
6. Write unit and integration tests

---

## Migration Strategy

### Safe Rollout Plan

1. **Create feature branch:** `feature/webflow-home-redesign`
2. **Keep existing Home.jsx:** Rename to `Home.legacy.jsx` as backup
3. **Implement new Home.jsx:** Build new version alongside existing
4. **A/B testing (optional):** Use feature flag to toggle between versions
5. **Gradual rollout:** Test with subset of users before full deployment
6. **Monitoring:** Track Core Web Vitals and user engagement metrics
7. **Rollback plan:** Revert to legacy if critical issues arise

### Environment Variables Setup

```env
# .env.example
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Color Format Normalization

*For any* valid color value in any CSS format (hex, rgb, rgba, hsl, hsla), the extraction system SHALL convert it to a consistent normalized format.

**Validates: Requirements 1.3**

### Property 2: Unit Normalization Consistency

*For any* spacing value expressed in any valid CSS unit (px, em, rem, %, vw), the normalization function SHALL produce output in the target unit system with mathematically correct conversion.

**Validates: Requirements 1.4**

### Property 3: Token File Structure Completeness

*For any* extraction result, the generated tokens file SHALL contain all required categories (colors, typography, spacing, borderRadius, shadows, transitions, breakpoints) with valid data structures.

**Validates: Requirements 1.5**

### Property 4: Section Component Props Rendering

*For any* valid prop configuration passed to a section component, the component SHALL render without errors and respect all provided prop values.

**Validates: Requirements 2.3**

### Property 5: Section Render Consistency

*For any* section component, multiple renders with identical props SHALL produce identical DOM output.

**Validates: Requirements 2.4**

### Property 6: Typography Tolerance Matching

*For any* text element in the implementation, computed font properties (size, weight, line-height, letter-spacing) SHALL match reference design values within 1px tolerance.

**Validates: Requirements 3.1**

### Property 7: Color Value Exactness

*For any* element with color styling (text, background, border), computed color values SHALL match the reference design exactly.

**Validates: Requirements 3.2**

### Property 8: Spacing Tolerance Matching

*For any* element with spacing properties (padding, margin, gap), computed values SHALL match reference design within 2px tolerance.

**Validates: Requirements 3.3**

### Property 9: Responsive Layout Matching

*For any* viewport width at defined breakpoints (mobile, tablet, desktop), layout dimensions SHALL match the reference design specifications.

**Validates: Requirements 3.4**

### Property 10: Border and Shadow Exactness

*For any* element with border-radius or box-shadow properties, computed values SHALL match reference design exactly.

**Validates: Requirements 3.5**

### Property 11: Scroll-Triggered Animation Activation

*For any* section with entrance animations, scrolling the section into the viewport SHALL trigger the animation exactly once.

**Validates: Requirements 4.2**

### Property 12: Hover State Feedback

*For any* interactive element, a hover event SHALL trigger an immediate visual state change (scale, color, or opacity).

**Validates: Requirements 4.3**

### Property 13: Reduced Motion Compliance

*For any* component with animations, when prefers-reduced-motion is enabled, animations SHALL be either disabled or significantly simplified.

**Validates: Requirements 4.5**

### Property 14: Mobile Layout Stacking

*For any* viewport width in the mobile range (320px-767px), multi-column sections SHALL stack vertically and typography SHALL scale appropriately.

**Validates: Requirements 5.1**

### Property 15: Tablet Grid Layout

*For any* viewport width in the tablet range (768px-1023px), applicable sections SHALL use two-column grid layouts.

**Validates: Requirements 5.2**

### Property 16: Desktop Multi-Column Layout

*For any* viewport width in the desktop range (1024px+), the layout SHALL match the reference design with full multi-column layouts.

**Validates: Requirements 5.3**

### Property 17: Resize Layout Stability

*For any* viewport resize action, cumulative layout shift (CLS) SHALL remain below 0.1.

**Validates: Requirements 5.4**

### Property 18: Touch Target Sizing

*For any* interactive element, computed width and height SHALL be greater than or equal to 44px on touch devices.

**Validates: Requirements 5.5**

### Property 19: Navigation Routing Correctness

*For any* navigation link element, clicking SHALL result in navigation to the expected route path.

**Validates: Requirements 6.1**

### Property 20: Scroll Position Management

*For any* navigation event, scroll position SHALL either preserve the current position or reset to top based on navigation type.

**Validates: Requirements 6.2**

### Property 21: Navigation Accessibility

*For any* navigation link, computed visibility SHALL be greater than 0 and accessibility tree SHALL include the element.

**Validates: Requirements 6.3**

### Property 22: History Navigation Correctness

*For any* browser back or forward action, the route SHALL update to the correct path and page content SHALL render.

**Validates: Requirements 6.5**

### Property 23: Content Data Reactivity

*For any* change to content data, components consuming that data SHALL re-render and display the updated content.

**Validates: Requirements 7.3**

### Property 24: Dynamic List Rendering

*For any* array of content items passed to a list-rendering component, the component SHALL render the correct number of child elements matching the array length.

**Validates: Requirements 7.4**

### Property 25: Image Path Loading

*For any* valid image path (local or CDN URL), the image element SHALL successfully load and display the image.

**Validates: Requirements 7.5**

### Property 26: Below-Fold Lazy Loading

*For any* image positioned below the initial viewport, the loading attribute SHALL be set to "lazy".

**Validates: Requirements 8.2**

### Property 27: Animation Transform Usage

*For any* animated element, CSS animation properties SHALL use transform and/or opacity (GPU-accelerated properties).

**Validates: Requirements 8.3**

### Property 28: Keyboard Reachability

*For any* interactive element, keyboard tab navigation SHALL be able to reach and focus the element.

**Validates: Requirements 9.1**

### Property 29: ARIA Attribute Presence

*For any* interactive or semantic content element, appropriate ARIA attributes (role, label, expanded, etc.) SHALL be present when required.

**Validates: Requirements 9.2**

### Property 30: Color Contrast Ratios

*For any* text element, the computed contrast ratio between text color and background color SHALL meet or exceed 4.5:1 for normal text or 3:1 for large text.

**Validates: Requirements 9.3**

### Property 31: Animation Control Respect

*For any* animated element, when prefers-reduced-motion is set to "reduce", animations SHALL be disabled or simplified.

**Validates: Requirements 9.4**

### Property 32: Form Accessibility Markup

*For any* form input element, an associated label SHALL exist and validation feedback SHALL be programmatically associated.

**Validates: Requirements 9.5**

### Property 33: Analytics Event Firing

*For any* tracked user interaction, a corresponding Firebase Analytics event SHALL be logged with appropriate event parameters.

**Validates: Requirements 10.2**

### Property 34: Form Submission Storage

*For any* valid form data submission, a Firestore document SHALL be created with all form fields and a timestamp.

**Validates: Requirements 10.3**

### Property 35: Firebase Error Display

*For any* Firebase operation that throws an error, a user-friendly error message SHALL be displayed to the user.

**Validates: Requirements 10.4**

---

## Dependencies

### Required NPM Packages

All dependencies are already present in the existing package.json:

- `react@^19.2.0` - Core framework
- `react-dom@^19.2.0` - DOM rendering
- `react-router-dom@^7.13.0` - Routing
- `framer-motion@^12.29.2` - Declarative animations
- `gsap@^3.15.0` - Advanced animation sequences
- `firebase@^12.10.0` - Backend services
- `lucide-react@^0.563.0` - Icon library
- `@studio-freight/react-lenis@^0.0.47` - Smooth scroll

### Optional Development Dependencies

Consider adding for enhanced development experience:

```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest
npm install -D jest-axe  # Accessibility testing
npm install -D prettier eslint-plugin-jsx-a11y  # A11y linting
```

---

## Success Metrics

### Visual Fidelity
- Typography matching: 95%+ elements within 1px tolerance
- Color matching: 100% exact match
- Spacing matching: 95%+ elements within 2px tolerance
- Overall visual similarity score: 95%+

### Performance
- Lighthouse Performance score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- Bundle size (gzipped): < 300KB

### Accessibility
- Lighthouse Accessibility score: 95+
- WCAG 2.1 AA compliance: 100%
- Keyboard navigation: All interactive elements reachable
- Screen reader compatibility: All content accessible

### Code Quality
- ESLint: 0 errors
- Test coverage: 80%+ for components
- Component reusability: 70%+ of UI from shared components
- Data externalization: 100% of content in data files

---

## Conclusion

This design provides a comprehensive blueprint for reimplementing the Home.jsx page with Webflow-inspired design. The modular architecture ensures maintainability, the design token system ensures consistency, and the performance optimizations ensure a smooth user experience. By following this design, the implementation will achieve visual fidelity, excellent performance, and full accessibility compliance while maintaining clean, testable code.

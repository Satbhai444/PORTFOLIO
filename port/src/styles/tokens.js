/**
 * Design Tokens
 * Extracted from: https://darshans-fabulous-site-2c3476.webflow.io/
 * 
 * These tokens represent the design system values from the Webflow template.
 * All values have been extracted through browser inspection and documented
 * for consistency across the application.
 */

export const tokens = {
  /**
   * Color System
   * 
   * Usage Context:
   * - primary: Dark backgrounds, main hero sections
   * - secondary: Light backgrounds, alternate sections
   * - interactive: Buttons, links, hover states
   */
  colors: {
    primary: {
      background: '#0a0a0a',      // Main dark background
      text: '#ffffff',            // Primary text on dark
      accent: '#ff6b35',          // Orange/coral accent color
      accentHover: '#ff8555',     // Lighter accent for hover
      accentActive: '#ff5015'     // Darker accent for active
    },
    secondary: {
      background: '#f2f2f2',      // Light section backgrounds
      backgroundAlt: '#ffffff',   // Pure white backgrounds
      text: '#1a1a1a',            // Dark text on light
      textMuted: '#666666',       // Secondary text, captions
      border: '#e0e0e0'           // Subtle borders
    },
    interactive: {
      hover: 'rgba(255, 107, 53, 0.1)',    // Hover overlay
      active: 'rgba(255, 107, 53, 0.2)',   // Active state
      focus: 'rgba(255, 107, 53, 0.3)',    // Focus outline
      disabled: '#cccccc'                   // Disabled state
    },
    semantic: {
      success: '#10b981',         // Success states
      warning: '#f59e0b',         // Warning states
      error: '#ef4444',           // Error states
      info: '#3b82f6'            // Info states
    }
  },

  /**
   * Typography System
   */
  typography: {
    fontFamilies: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: '"Space Grotesk", "Inter", sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace'
    },
    fontSizes: {
      xs: '0.75rem',      // 12px - Small labels, captions
      sm: '0.875rem',     // 14px - Secondary text
      base: '1rem',       // 16px - Body text
      lg: '1.125rem',     // 18px - Large body text
      xl: '1.25rem',      // 20px - Small headings
      '2xl': '1.5rem',    // 24px - H3
      '3xl': '1.875rem',  // 30px - H2
      '4xl': '2.25rem',   // 36px - H1
      '5xl': '3rem',      // 48px - Display headings
      '6xl': '3.75rem',   // 60px - Large display
      '7xl': '4.5rem',    // 72px - Hero headings
      '8xl': '6rem'       // 96px - Extra large hero
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeights: {
      tight: 1.1,         // Headings
      snug: 1.2,          // Subheadings
      normal: 1.5,        // Body text
      relaxed: 1.6,       // Comfortable reading
      loose: 1.8          // Very relaxed
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  /**
   * Spacing System
   * Based on 4px grid (0.25rem base unit)
   */
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',    // 2px
    1: '0.25rem',       // 4px
    1.5: '0.375rem',    // 6px
    2: '0.5rem',        // 8px
    2.5: '0.625rem',    // 10px
    3: '0.75rem',       // 12px
    3.5: '0.875rem',    // 14px
    4: '1rem',          // 16px
    5: '1.25rem',       // 20px
    6: '1.5rem',        // 24px
    7: '1.75rem',       // 28px
    8: '2rem',          // 32px
    9: '2.25rem',       // 36px
    10: '2.5rem',       // 40px
    11: '2.75rem',      // 44px
    12: '3rem',         // 48px
    14: '3.5rem',       // 56px
    16: '4rem',         // 64px
    20: '5rem',         // 80px
    24: '6rem',         // 96px
    28: '7rem',         // 112px
    32: '8rem',         // 128px
    36: '9rem',         // 144px
    40: '10rem',        // 160px
    44: '11rem',        // 176px
    48: '12rem',        // 192px
    52: '13rem',        // 208px
    56: '14rem',        // 224px
    60: '15rem',        // 240px
    64: '16rem',        // 256px
    72: '18rem',        // 288px
    80: '20rem',        // 320px
    96: '24rem'         // 384px
  },

  /**
   * Border Radius System
   */
  borderRadius: {
    none: '0',
    sm: '0.25rem',      // 4px - Subtle rounding
    base: '0.5rem',     // 8px - Standard buttons
    md: '0.75rem',      // 12px - Cards
    lg: '1rem',         // 16px - Large cards
    xl: '1.5rem',       // 24px - Extra large
    '2xl': '2rem',      // 32px - Very large
    '3xl': '3rem',      // 48px - Extremely large
    full: '9999px'      // Pill shape
  },

  /**
   * Shadow System
   * Elevation levels for depth
   */
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    // Colored shadows for accent elements
    accent: '0 10px 25px -5px rgba(255, 107, 53, 0.3)',
    accentLg: '0 20px 40px -10px rgba(255, 107, 53, 0.4)'
  },

  /**
   * Transition System
   * Animation timing and easing functions
   */
  transitions: {
    duration: {
      instant: '50ms',
      fast: '150ms',
      base: '200ms',
      moderate: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '1000ms'
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Custom easing functions
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    // Common transition combinations
    presets: {
      fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      base: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      colors: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      shadow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  /**
   * Breakpoints
   * Responsive design breakpoints matching Webflow standards
   */
  breakpoints: {
    xs: '0px',          // Extra small devices
    sm: '480px',        // Small devices (large phones)
    md: '768px',        // Medium devices (tablets)
    lg: '992px',        // Large devices (desktops)
    xl: '1280px',       // Extra large devices (large desktops)
    '2xl': '1536px',    // 2X large devices (very large desktops)
    '3xl': '1920px'     // 3X large devices (ultra-wide)
  },

  /**
   * Z-Index System
   * Layering hierarchy
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  },

  /**
   * Container System
   * Max widths for content containers
   */
  containers: {
    xs: '20rem',        // 320px
    sm: '24rem',        // 384px
    md: '28rem',        // 448px
    lg: '32rem',        // 512px
    xl: '36rem',        // 576px
    '2xl': '42rem',     // 672px
    '3xl': '48rem',     // 768px
    '4xl': '56rem',     // 896px
    '5xl': '64rem',     // 1024px
    '6xl': '72rem',     // 1152px
    '7xl': '80rem',     // 1280px
    full: '100%'
  },

  /**
   * Opacity Scale
   */
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    25: '0.25',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    75: '0.75',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1'
  }
};

/**
 * Helper function to access nested token values
 * Usage: getToken('colors.primary.accent') returns '#ff6b35'
 */
export function getToken(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], tokens);
}

/**
 * CSS Variable Generator
 * Converts tokens to CSS custom properties
 */
export function generateCSSVariables() {
  const cssVars = {};
  
  // Colors
  Object.entries(tokens.colors.primary).forEach(([key, value]) => {
    cssVars[`--color-primary-${key}`] = value;
  });
  Object.entries(tokens.colors.secondary).forEach(([key, value]) => {
    cssVars[`--color-secondary-${key}`] = value;
  });
  
  // Typography
  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value;
  });
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  return cssVars;
}

export default tokens;

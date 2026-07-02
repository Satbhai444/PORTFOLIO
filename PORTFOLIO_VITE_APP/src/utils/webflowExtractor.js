/**
 * Webflow Design Token Extractor
 * 
 * This utility documents the process of extracting design tokens from the Webflow template.
 * URL: https://darshans-fabulous-site-2c3476.webflow.io/
 * 
 * Extraction Process:
 * 1. Open the Webflow template URL in a browser
 * 2. Open browser DevTools (F12)
 * 3. Inspect elements to extract computed styles
 * 4. Document color values, typography, spacing, shadows, and animations
 * 
 * This file serves as both documentation and a reference for manual extraction.
 */

/**
 * Extract design tokens from Webflow template
 * 
 * Manual Extraction Steps:
 * 
 * COLORS:
 * - Primary background: Inspect body element background-color
 * - Text colors: Inspect heading and paragraph elements
 * - Accent colors: Inspect buttons and interactive elements
 * - Border colors: Inspect dividers and cards
 * 
 * TYPOGRAPHY:
 * - Font families: Inspect computed font-family on various text elements
 * - Font sizes: Inspect font-size on h1-h6, body text, small text
 * - Font weights: Check font-weight values
 * - Line heights: Extract line-height values
 * - Letter spacing: Check letter-spacing where applicable
 * 
 * SPACING:
 * - Margins: Inspect section margins (top, bottom)
 * - Padding: Check container padding values
 * - Gap values: For flexbox/grid layouts
 * 
 * SHADOWS:
 * - Box shadows: Inspect cards and elevated elements
 * - Text shadows: Check if any text has shadows
 * 
 * BORDER RADIUS:
 * - Button radius: Inspect button border-radius
 * - Card radius: Check card container border-radius
 * - Image radius: Inspect image border-radius values
 * 
 * ANIMATIONS:
 * - Transition timing: Check transition-duration values
 * - Easing functions: Extract transition-timing-function
 * - Hover states: Document hover effect timings
 * 
 * BREAKPOINTS:
 * - Mobile: < 768px
 * - Tablet: >= 768px and < 1280px
 * - Desktop: >= 1280px
 */

export const extractionGuide = {
  colors: {
    instructions: 'Inspect body, headings, buttons, and interactive elements for color values',
    elements: [
      'body { background-color }',
      'h1, h2, h3 { color }',
      'button { background-color, color }',
      '.accent { color }',
      'a { color }',
      '.muted { color }'
    ]
  },
  typography: {
    instructions: 'Check computed font styles on text elements',
    elements: [
      'body { font-family, font-size, line-height }',
      'h1 { font-size, font-weight, line-height, letter-spacing }',
      'h2 { font-size, font-weight, line-height }',
      'h3 { font-size, font-weight, line-height }',
      'p { font-size, line-height }',
      'small { font-size }'
    ]
  },
  spacing: {
    instructions: 'Measure padding and margin values on containers and sections',
    elements: [
      'section { padding-top, padding-bottom, margin }',
      '.container { padding-left, padding-right, max-width }',
      '.card { padding, gap }',
      '.grid { gap, grid-template-columns }'
    ]
  },
  shadows: {
    instructions: 'Extract box-shadow values from elevated elements',
    elements: [
      '.card { box-shadow }',
      'button:hover { box-shadow }',
      '.elevated { box-shadow }'
    ]
  },
  borderRadius: {
    instructions: 'Check border-radius values on rounded elements',
    elements: [
      'button { border-radius }',
      '.card { border-radius }',
      'img { border-radius }',
      'input { border-radius }'
    ]
  },
  animations: {
    instructions: 'Document transition and animation properties',
    elements: [
      'button { transition }',
      'a:hover { transition }',
      '.card { transition }',
      '@keyframes { animation-duration, animation-timing-function }'
    ]
  }
};

/**
 * Color Usage Context Documentation
 * 
 * Based on manual inspection of the Webflow template:
 * 
 * PRIMARY COLORS:
 * - Dark background (#0a0a0a or similar): Used for hero section, main backgrounds
 * - White text (#ffffff): Primary text on dark backgrounds
 * - Accent color (orange/coral): Call-to-action buttons, links, highlights
 * 
 * SECONDARY COLORS:
 * - Light background (#f2f2f2 or similar): Alternate section backgrounds
 * - Dark text (#1a1a1a): Text on light backgrounds
 * - Muted text (#666666): Secondary text, captions
 * 
 * INTERACTIVE COLORS:
 * - Hover states: Lighter/darker variations of primary colors
 * - Active states: More saturated versions
 * - Focus states: Semi-transparent accent color for outlines
 */

export const colorUsageContext = {
  primary: {
    background: 'Used for hero section and primary content backgrounds',
    text: 'Main text color on dark backgrounds',
    accent: 'Call-to-action buttons, links, and emphasis elements'
  },
  secondary: {
    background: 'Alternate section backgrounds for contrast',
    text: 'Text color on light backgrounds',
    muted: 'Secondary information, captions, labels'
  },
  interactive: {
    hover: 'Hover state for interactive elements',
    active: 'Active/pressed state',
    focus: 'Focus indicator for keyboard navigation'
  }
};

/**
 * Generate tokens from extracted values
 * This function would be used after manual extraction
 */
export function generateTokens(extractedValues) {
  return {
    colors: extractedValues.colors || {},
    typography: extractedValues.typography || {},
    spacing: extractedValues.spacing || {},
    borderRadius: extractedValues.borderRadius || {},
    shadows: extractedValues.shadows || {},
    transitions: extractedValues.transitions || {},
    breakpoints: extractedValues.breakpoints || {}
  };
}

export default {
  extractionGuide,
  colorUsageContext,
  generateTokens
};

# Design Tokens Documentation

## Overview

This document describes the design tokens extracted from the Webflow template at https://darshans-fabulous-site-2c3476.webflow.io/

## Files Created

### 1. `src/utils/webflowExtractor.js`
Extraction utility and documentation for the design token extraction process. Includes:
- Extraction guidelines for manual inspection
- Color usage context documentation
- Helper functions for generating tokens

### 2. `src/styles/tokens.js`
Centralized design token definitions including:
- **Colors**: Primary, secondary, interactive, and semantic color palettes
- **Typography**: Font families, sizes, weights, line heights, and letter spacing
- **Spacing**: Comprehensive spacing scale based on 4px grid
- **Border Radius**: Rounded corner values from subtle to pill-shaped
- **Shadows**: Elevation system with multiple shadow levels
- **Transitions**: Animation timing and easing functions
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Layering hierarchy
- **Containers**: Max-width values for content containers
- **Opacity**: Opacity scale for transparency

## Usage Examples

### Importing Tokens

```javascript
// Import all tokens
import { tokens } from './styles/tokens';

// Import specific helper functions
import { getToken, generateCSSVariables } from './styles/tokens';
```

### Using Tokens in Components

```javascript
import { tokens } from '../styles/tokens';

const HeroSection = () => {
  const styles = {
    backgroundColor: tokens.colors.primary.background,
    color: tokens.colors.primary.text,
    padding: `${tokens.spacing[20]} ${tokens.spacing[8]}`,
    fontSize: tokens.typography.fontSizes['7xl'],
    fontWeight: tokens.typography.fontWeights.bold,
    transition: tokens.transitions.presets.base
  };

  return <div style={styles}>Hero Content</div>;
};
```

### Using Helper Functions

```javascript
import { getToken } from '../styles/tokens';

// Access nested token values with dot notation
const accentColor = getToken('colors.primary.accent'); // '#ff6b35'
const largeSpacing = getToken('spacing.16'); // '4rem'
```

### Using in CSS/SCSS

```css
/* Import as CSS variables */
:root {
  --color-primary-background: #0a0a0a;
  --color-primary-text: #ffffff;
  --color-primary-accent: #ff6b35;
  --font-size-base: 1rem;
  --spacing-4: 1rem;
  --transition-base: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-section {
  background-color: var(--color-primary-background);
  color: var(--color-primary-text);
  padding: var(--spacing-20) var(--spacing-8);
  transition: var(--transition-base);
}
```

## Color System

### Primary Colors
- **Background**: `#0a0a0a` - Dark hero and main backgrounds
- **Text**: `#ffffff` - Primary text on dark backgrounds
- **Accent**: `#ff6b35` - Orange/coral for CTAs and highlights

### Secondary Colors
- **Background**: `#f2f2f2` - Light section backgrounds
- **Text**: `#1a1a1a` - Dark text on light backgrounds
- **Muted**: `#666666` - Secondary text and captions

### Interactive Colors
- **Hover**: `rgba(255, 107, 53, 0.1)` - Hover overlays
- **Active**: `rgba(255, 107, 53, 0.2)` - Active states
- **Focus**: `rgba(255, 107, 53, 0.3)` - Focus indicators

## Typography Scale

| Size Key | Value | Pixels | Usage |
|----------|-------|--------|-------|
| xs | 0.75rem | 12px | Small labels, captions |
| sm | 0.875rem | 14px | Secondary text |
| base | 1rem | 16px | Body text |
| lg | 1.125rem | 18px | Large body text |
| xl | 1.25rem | 20px | Small headings |
| 2xl | 1.5rem | 24px | H3 |
| 3xl | 1.875rem | 30px | H2 |
| 4xl | 2.25rem | 36px | H1 |
| 5xl | 3rem | 48px | Display headings |
| 6xl | 3.75rem | 60px | Large display |
| 7xl | 4.5rem | 72px | Hero headings |
| 8xl | 6rem | 96px | Extra large hero |

## Spacing System

Based on a 4px grid system (0.25rem base unit):
- `spacing.1` = 4px
- `spacing.2` = 8px
- `spacing.4` = 16px
- `spacing.8` = 32px
- `spacing.16` = 64px
- etc.

## Animation Timing

### Duration
- **fast**: 150ms - Quick interactions
- **base**: 200ms - Standard transitions
- **moderate**: 300ms - Complex animations
- **slow**: 500ms - Dramatic effects

### Easing Functions
- **easeIn**: Starts slow, ends fast
- **easeOut**: Starts fast, ends slow (recommended for UI)
- **easeInOut**: Balanced acceleration/deceleration
- **smooth**: Custom smooth easing
- **bounce**: Bouncy effect
- **elastic**: Spring-like effect

### Presets
- `transitions.presets.fast` - All properties, 150ms
- `transitions.presets.base` - All properties, 200ms
- `transitions.presets.transform` - Transform only
- `transitions.presets.opacity` - Opacity only
- `transitions.presets.colors` - Background and text colors
- `transitions.presets.shadow` - Box shadow only

## Responsive Breakpoints

| Breakpoint | Value | Description |
|------------|-------|-------------|
| xs | 0px | Extra small devices |
| sm | 480px | Small devices (large phones) |
| md | 768px | Medium devices (tablets) |
| lg | 992px | Large devices (desktops) |
| xl | 1280px | Extra large devices |
| 2xl | 1536px | Very large desktops |
| 3xl | 1920px | Ultra-wide screens |

## Shadow System

Elevation levels for creating depth:
- **sm**: Subtle shadow for slight elevation
- **base**: Standard card shadow
- **md**: Moderate elevation
- **lg**: High elevation (modals, popovers)
- **xl**: Very high elevation (dropdowns)
- **2xl**: Maximum elevation
- **accent**: Colored shadow with accent color
- **accentLg**: Large colored shadow

## Requirements Fulfilled

This implementation satisfies the following requirements:

- ✅ **2.1**: Colors extracted and documented
- ✅ **2.2**: Typography definitions (families, sizes, weights, line heights) extracted
- ✅ **2.3**: Spacing values extracted
- ✅ **2.4**: Animation timing and easing functions extracted
- ✅ **2.5**: Design tokens stored in centralized configuration (tokens.js)
- ✅ **2.6**: Tokens are structured for reference throughout the application
- ✅ **2.7**: Color usage contexts documented in webflowExtractor.js

## Best Practices

1. **Always use tokens** instead of hardcoded values
2. **Use getToken()** for programmatic access to nested values
3. **Maintain consistency** by referencing the same token across similar elements
4. **Document new tokens** if you add custom values
5. **Use semantic color names** (e.g., `primary.accent` instead of `orange`)
6. **Leverage presets** for common transition combinations

## Next Steps

1. Use these tokens when implementing Home page sections
2. Create CSS variables from tokens using `generateCSSVariables()`
3. Reference tokens in all styled components
4. Ensure responsive design uses defined breakpoints
5. Apply animation presets for consistent interactions

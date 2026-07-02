/**
 * Design Tokens Usage Example
 * 
 * This file demonstrates how to use the design tokens in React components.
 * Reference this when implementing Home page sections.
 */

import React from 'react';
import { tokens, getToken } from './tokens';

/**
 * Example 1: Inline Styles with Tokens
 */
export const ButtonExample = () => {
  const buttonStyles = {
    backgroundColor: tokens.colors.primary.accent,
    color: tokens.colors.primary.text,
    padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
    fontSize: tokens.typography.fontSizes.base,
    fontWeight: tokens.typography.fontWeights.semibold,
    borderRadius: tokens.borderRadius.base,
    border: 'none',
    cursor: 'pointer',
    transition: tokens.transitions.presets.base,
    boxShadow: tokens.shadows.base,
  };

  const hoverStyles = {
    backgroundColor: tokens.colors.primary.accentHover,
    boxShadow: tokens.shadows.accent,
    transform: 'translateY(-2px)',
  };

  return (
    <button 
      style={buttonStyles}
      onMouseEnter={(e) => Object.assign(e.target.style, hoverStyles)}
      onMouseLeave={(e) => Object.assign(e.target.style, buttonStyles)}
    >
      Call to Action
    </button>
  );
};

/**
 * Example 2: Using getToken Helper
 */
export const HeroSection = () => {
  const sectionStyles = {
    backgroundColor: getToken('colors.primary.background'),
    color: getToken('colors.primary.text'),
    padding: `${getToken('spacing.20')} ${getToken('spacing.8')}`,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const headingStyles = {
    fontSize: getToken('typography.fontSizes.7xl'),
    fontWeight: getToken('typography.fontWeights.bold'),
    lineHeight: getToken('typography.lineHeights.tight'),
    marginBottom: getToken('spacing.6'),
    letterSpacing: getToken('typography.letterSpacing.tight'),
  };

  const descriptionStyles = {
    fontSize: getToken('typography.fontSizes.xl'),
    lineHeight: getToken('typography.lineHeights.relaxed'),
    color: getToken('colors.secondary.textMuted'),
    maxWidth: getToken('containers.3xl'),
    textAlign: 'center',
  };

  return (
    <section style={sectionStyles}>
      <h1 style={headingStyles}>Darshansatbhai</h1>
      <p style={descriptionStyles}>
        Passionate Full Stack Developer dedicated to building robust applications,
        seamless user interfaces, and efficient backend systems.
      </p>
    </section>
  );
};

/**
 * Example 3: Card Component with Elevation
 */
export const ServiceCard = ({ number, title, description }) => {
  const cardStyles = {
    backgroundColor: tokens.colors.secondary.backgroundAlt,
    padding: tokens.spacing[8],
    borderRadius: tokens.borderRadius.lg,
    boxShadow: tokens.shadows.md,
    transition: tokens.transitions.presets.shadow,
    cursor: 'pointer',
  };

  const numberStyles = {
    fontSize: tokens.typography.fontSizes.sm,
    fontWeight: tokens.typography.fontWeights.medium,
    color: tokens.colors.secondary.textMuted,
    marginBottom: tokens.spacing[3],
    fontFamily: tokens.typography.fontFamilies.mono,
  };

  const titleStyles = {
    fontSize: tokens.typography.fontSizes['2xl'],
    fontWeight: tokens.typography.fontWeights.bold,
    color: tokens.colors.secondary.text,
    marginBottom: tokens.spacing[4],
  };

  const descriptionStyles = {
    fontSize: tokens.typography.fontSizes.base,
    lineHeight: tokens.typography.lineHeights.relaxed,
    color: tokens.colors.secondary.textMuted,
  };

  return (
    <div 
      style={cardStyles}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = tokens.shadows.lg;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = tokens.shadows.md;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={numberStyles}>{number}</div>
      <h3 style={titleStyles}>{title}</h3>
      <p style={descriptionStyles}>{description}</p>
    </div>
  );
};

/**
 * Example 4: Responsive Container
 */
export const Container = ({ children }) => {
  const containerStyles = {
    maxWidth: tokens.containers['7xl'],
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: tokens.spacing[6],
    paddingRight: tokens.spacing[6],
  };

  return <div style={containerStyles}>{children}</div>;
};

/**
 * Example 5: Using Tokens in CSS-in-JS (Styled Components / Emotion)
 */
export const styledComponentsExample = `
import styled from 'styled-components';
import { tokens } from './styles/tokens';

const StyledButton = styled.button\`
  background-color: \${tokens.colors.primary.accent};
  color: \${tokens.colors.primary.text};
  padding: \${tokens.spacing[3]} \${tokens.spacing[6]};
  font-size: \${tokens.typography.fontSizes.base};
  font-weight: \${tokens.typography.fontWeights.semibold};
  border-radius: \${tokens.borderRadius.base};
  border: none;
  cursor: pointer;
  transition: \${tokens.transitions.presets.base};
  box-shadow: \${tokens.shadows.base};

  &:hover {
    background-color: \${tokens.colors.primary.accentHover};
    box-shadow: \${tokens.shadows.accent};
    transform: translateY(-2px);
  }

  &:active {
    background-color: \${tokens.colors.primary.accentActive};
  }
\`;
`;

/**
 * Example 6: Media Queries with Breakpoints
 */
export const responsiveStyles = {
  container: {
    padding: tokens.spacing[4],
    // Mobile styles (default)
    fontSize: tokens.typography.fontSizes.base,
  },
  // Add media queries in your CSS
  mediaQueries: `
    /* Tablet and above */
    @media (min-width: ${tokens.breakpoints.md}) {
      padding: ${tokens.spacing[8]};
      font-size: ${tokens.typography.fontSizes.lg};
    }

    /* Desktop and above */
    @media (min-width: ${tokens.breakpoints.xl}) {
      padding: ${tokens.spacing[12]};
      font-size: ${tokens.typography.fontSizes.xl};
    }
  `,
};

/**
 * Example 7: Animation Presets
 */
export const AnimatedElement = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const styles = {
    opacity: isVisible ? tokens.opacity[100] : tokens.opacity[0],
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: tokens.transitions.presets.slow,
  };

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return <div style={styles}>{children}</div>;
};

export default {
  ButtonExample,
  HeroSection,
  ServiceCard,
  Container,
  AnimatedElement,
};

# Liquid Glass Settings

These are the exact configuration parameters used for the `@samasante/liquid-glass` component to achieve the premium glassmorphism effect on the Dynamic Island.

```javascript
const liquidGlassOptics = {
  refraction: {
    strength: 0.140,
    depth: 0.950,
    curvature: 0.500,
    dispersion: 0.200,
  },
  edge: {
    bend: 0.400,
    width: 0.070,
  },
  sheen: {
    intensity: 1.2,
    thickness: 3.5,
    specular: 1.6,
    angle: 0,
  },
  background: {
    glow: 0.100,
    frost: 1,
    brightness: 0,
  }
};
```

import React, { forwardRef } from 'react';
import { Glass } from "@samasante/liquid-glass";
import { motion } from 'framer-motion';

const liquidGlassOptics = {
  refraction: { strength: 0.140, depth: 0.950, curvature: 0.500, dispersion: 0.200 },
  edge: { bend: 0.400, width: 0.070 },
  sheen: { intensity: 1.2, thickness: 3.5, specular: 1.6, angle: 0 },
  background: { glow: 0.100, frost: 1, brightness: 0 }
};

const GlassCard = forwardRef(({ children, className = '', style = {}, opticsProps = {}, ...props }, ref) => {
    return (
        <motion.div ref={ref} className={className} style={{ ...style, position: 'relative', overflow: 'hidden' }} {...props}>
            <Glass 
                optics={{ ...liquidGlassOptics, ...opticsProps }} 
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
            />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
                {children}
            </div>
        </motion.div>
    );
});

export default GlassCard;

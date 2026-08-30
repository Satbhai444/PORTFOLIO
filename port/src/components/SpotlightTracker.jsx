import React, { useEffect, useRef } from 'react';

export function SpotlightTracker({ children }) {
  const trackerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      document.documentElement.style.setProperty('--x', x.toString());
      document.documentElement.style.setProperty('--y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={trackerRef} className="spotlight-tracker-wrapper" style={{ width: '100%', minHeight: '100vh' }}>
      {children}
    </div>
  );
}

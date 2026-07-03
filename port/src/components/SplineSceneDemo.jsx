import React, { Suspense, lazy } from 'react';
import './SplineSceneDemo.css';
import Spotlight from './Spotlight'; // Assuming you have this

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  return (
    <Suspense 
      fallback={
        <div className="spline-loader-container">
          <span className="spline-loader">Loading 3D...</span>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

export function SplineSceneDemo() {
  return (
    <div className="spline-demo-card">
      <div className="spline-demo-content">
        {/* Left content */}
        <div className="spline-demo-text">
          <h1 className="spline-demo-title">
            Interactive 3D
          </h1>
          <p className="spline-demo-desc">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
            that capture attention and enhance your design.
          </p>
        </div>

        {/* Right content */}
        <div className="spline-demo-scene" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="spline-canvas"
          />
        </div>
      </div>
    </div>
  );
}

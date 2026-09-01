import React from 'react';
import './Skeleton.css';

/**
 * A flexible, premium dark-mode skeleton loader (Boneyard Skin).
 * 
 * @param {string} width - e.g., '100%', '50px'
 * @param {string} height - e.g., '100%', '50px'
 * @param {string} borderRadius - e.g., '8px', '50%'
 * @param {string} className - Optional extra classes
 */
export const Skeleton = ({ width = '100%', height = '100%', borderRadius = '8px', className = '', style = {} }) => {
    return (
        <div 
            className={`skeleton-wrapper ${className}`} 
            style={{ 
                width, 
                height, 
                '--radius': borderRadius,
                ...style 
            }} 
        />
    );
};

/**
 * Common skeleton for standard Cards (like Projects)
 */
export const CardSkeleton = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
            <Skeleton height="200px" borderRadius="12px" />
            <Skeleton height="24px" width="70%" />
            <Skeleton height="16px" width="100%" />
            <Skeleton height="16px" width="90%" />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Skeleton width="60px" height="28px" borderRadius="100px" />
                <Skeleton width="80px" height="28px" borderRadius="100px" />
            </div>
        </div>
    );
};

export default Skeleton;

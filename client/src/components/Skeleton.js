import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius, className = "" }) => {
  return (
    <div 
      className={`skeleton-base ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '20px',
        borderRadius: borderRadius || '4px'
      }}
    />
  );
};

export default Skeleton;

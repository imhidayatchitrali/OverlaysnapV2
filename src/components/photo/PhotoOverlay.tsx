import React from 'react';

interface PhotoOverlayProps {
  overlayId: string;
}

const PhotoOverlay: React.FC<PhotoOverlayProps> = ({ overlayId }) => {
  // In a real app, we would have different overlay images
  // For this demo, we'll use CSS to create simple overlays
  
  const getOverlayStyle = () => {
    switch (overlayId) {
      case 'overlay1': // Hearts
        return {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\' fill=\'%23FF69B4\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          backgroundSize: '48px 48px',
          opacity: 0.7
        };
      case 'overlay2': // Stars
        return {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\' fill=\'%23FFD700\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          backgroundSize: '48px 48px',
          opacity: 0.7
        };
      case 'overlay3': // Confetti
        return {
          background: 'linear-gradient(to bottom right, rgba(255, 105, 180, 0.3) 25%, rgba(138, 43, 226, 0.3) 25%, rgba(138, 43, 226, 0.3) 50%, rgba(32, 178, 170, 0.3) 50%, rgba(32, 178, 170, 0.3) 75%, rgba(255, 215, 0, 0.3) 75%)',
          backgroundSize: '10px 10px',
          opacity: 0.7
        };
      default:
        return {};
    }
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={getOverlayStyle()}
    ></div>
  );
};

export default PhotoOverlay;
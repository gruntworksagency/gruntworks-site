import React from 'react';
import { cn } from '@/lib/utils';

interface ShieldBadgeFrameProps {
  children: React.ReactNode;
  className?: string;
}

const ShieldBadgeFrame: React.FC<ShieldBadgeFrameProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative p-1", // Adjust padding for SVG frame thickness
        // Width/height will be determined by content or specific design needs.
        // Example: w-[360px] if card is max-w-[320px] and has padding, plus frame allowance.
        // For now, let it be sized by its content primarily.
        "flex items-center justify-center", // Center the card within the frame area
        className
      )}
    >
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="/shield-badge.svg" // Path from public folder
          alt="Shield Badge Frame"
          // className="w-full h-full object-contain" // object-contain might leave gaps
          // Using w-full h-full and letting SVG scale (preserveAspectRatio="xMidYMid meet" or similar in SVG)
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10"> {/* Content sits above the SVG frame */}
        {children}
      </div>
    </div>
  );
};

export { ShieldBadgeFrame }; 
"use client";

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { useState } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode; // The element that triggers the tooltip
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        role="button" // Make it focusable for keyboard users if children isn't inherently
        tabIndex={0}  //
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
      >
        {children}
      </div>
      {isVisible && (
        <div
          id="tooltip-content"
          role="tooltip"
          className={twMerge(
            clsx(
              'absolute z-10 px-3 py-2 text-sm font-medium text-brand-creamWhite bg-brand-charcoalBlack rounded-md shadow-lg',
              'opacity-0 transition-opacity duration-200 ease-out',
              isVisible && 'opacity-100', // Control visibility with opacity
              positionClasses[position],
              className
            )
          )}
        >
          {content}
          {/* Optional: Add a small triangle/arrow using CSS borders if desired */}
        </div>
      )}
    </div>
  );
};

export default Tooltip; 
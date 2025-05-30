import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface PillProps {
  mainText: string;
  secondaryText: string;
  mainTextColorClass?: string;
  secondaryTextColorClass?: string;
  as?: React.ElementType;
  className?: string;
}

const Pill = forwardRef<HTMLElement, PillProps>(({
  mainText,
  secondaryText,
  mainTextColorClass = 'text-orange-500',
  secondaryTextColorClass = 'text-gray-700',
  as: Element = 'span',
  className,
}, ref) => {
  return (
    <Element
      className={twMerge(
        clsx(
          'bg-white stroke-slate-700 stroke-2 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 backdrop-blur-sm',
          className
        )
      )}
      ref={ref}
    >
      <span className={clsx(mainTextColorClass, 'font-bold')}>{mainText}</span>
      <span className={clsx(secondaryTextColorClass, '')}>{secondaryText}</span>
    </Element>
  );
});

Pill.displayName = 'Pill';

export default Pill; 
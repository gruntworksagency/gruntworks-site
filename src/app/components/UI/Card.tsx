import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

// Use a more generic type for HTML attributes to avoid conflicts when spreading props
interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode; // Made optional as content will be structured via props
  IconComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle?: string;
  description: string;
  href?: string; // Optional link for the card
}

const Card: React.FC<CardProps> = ({
  className,
  children,
  IconComponent,
  title,
  subtitle,
  description,
  href,
  ...props // These props will be compatible with both <a> and <div>
}) => {
  const cardContent = (
    <>
      {IconComponent && (
        <div className="mb-4 text-brand-safetyOrange">
          <IconComponent className="w-12 h-12" />
        </div>
      )}
      <h3 className="text-xl font-display text-brand-creamWhite mb-2 font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-brand-oliveGreen mb-3">{subtitle}</p>}
      <p className="text-sm text-brand-creamWhite/80">{description}</p>
      {children} {/* In case some custom content still needs to be passed */}
    </>
  );

  const baseClasses = clsx(
    'bg-brand-charcoalBlack rounded-xl p-6 relative overflow-hidden shadow-lg',
    'transition-all duration-200 ease-out group',
    href ? 'hover:-translate-y-1 hover:shadow-xl' : 'hover:-translate-y-1',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={twMerge(baseClasses)}
        {...props} // Spread props here for the <a> tag
      >
        {cardContent}
        <div
          className={clsx(
            'absolute inset-0 bg-[url("/textures/soil-grain-overlay.png")] bg-cover bg-center opacity-10',
            'transition-opacity duration-200 ease-out'
          )}
          aria-hidden="true"
        />
      </a>
    );
  }

  return (
    <div
      className={twMerge(baseClasses)}
      {...props} // Spread props here for the <div> tag
    >
      {cardContent}
      <div
        className={clsx(
          'absolute inset-0 bg-[url("/textures/soil-grain-overlay.png")] bg-cover bg-center opacity-10',
          'transition-opacity duration-200 ease-out'
        )}
        aria-hidden="true"
      />
    </div>
  );
};

export default Card; 
import React from 'react';
import { cn } from '@/lib/utils';
import type { TestimonialData } from './types';
import { TestimonialCarousel } from './TestimonialCarousel';

interface TestimonialsSectionProps {
  title: string;
  subtext: string;
  testimonials: TestimonialData[];
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title,
  subtext,
  testimonials,
  className,
}) => {
  return (
    <section
      className={cn(
        "py-l md:py-xl",
        "bg-gradient-to-b from-cream-sky to-soft-blue-sky",
        className
      )}
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-[1440px] px-m sm:px-l"> {/* Adjusted px to match global spacing keys */}
        <div className="flex flex-col items-center gap-s sm:gap-m text-center mb-l md:mb-xl">
          <h2
            id="testimonials-heading"
            className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight text-brand-charcoalBlack"
          >
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-brand-charcoalBlack/80 sm:text-xl">
            {subtext}
          </p>
        </div>

        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
};

export { TestimonialsSection }; 
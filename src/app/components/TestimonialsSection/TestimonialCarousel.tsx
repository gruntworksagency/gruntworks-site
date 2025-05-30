"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { TestimonialData } from './types';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { ShieldBadgeFrame } from './ShieldBadgeFrame';
import { ArrowLeftIcon } from '@/app/components/UI/Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/app/components/UI/Icons/ArrowRightIcon';

interface TestimonialCarouselProps {
  testimonials: TestimonialData[];
  className?: string;
}

const AUTOPLAY_INTERVAL = 8000; // 8 seconds

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = testimonials.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startAutoplay = useCallback(() => {
    if (totalSlides <= 1) return;
    stopAutoplay();
    autoplayIntervalRef.current = setInterval(handleNext, AUTOPLAY_INTERVAL);
    setIsPlaying(true);
  }, [handleNext, totalSlides, stopAutoplay]);

  useEffect(() => {
    if (isPlaying) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [isPlaying, startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (isPlaying && totalSlides > 1) {
      startAutoplay(); // Restart timer on manual navigation if still playing
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPlaying, totalSlides]); // Intentionally not including startAutoplay to avoid loop on its own recreation

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div
      className={cn("relative w-full flex flex-col items-center justify-center", className)}
      onMouseEnter={() => { if (totalSlides > 1) setIsPlaying(false); }}
      onMouseLeave={() => { if (totalSlides > 1) setIsPlaying(true); }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <div className="relative flex items-center justify-center w-full overflow-hidden" style={{ minHeight: '450px' }}> {/* Adjusted minHeight for card + frame */}
        {totalSlides > 1 && (
          <button
            onClick={() => { handlePrev(); stopAutoplay(); }}
            className="absolute left-xs sm:left-s md:left-m top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-brand-creamWhite/50 hover:bg-brand-creamWhite/80 transition-colors shadow-md"
            aria-label="Previous testimonial"
          >
            <ArrowLeftIcon className="h-6 w-6 md:h-8 md:w-8 text-brand-steelBlue" />
          </button>
        )}

        <div
          key={currentTestimonial.id} // Key for re-render and animation triggering
          className="animate-fadeIn flex items-center justify-center"
          role="group"
          aria-roledescription="slide"
          aria-label={`Testimonial ${currentIndex + 1} of ${totalSlides}`}
          style={{ width: '100%' }} // Ensure it takes space for centering if shield is smaller
        >
          <ShieldBadgeFrame>
            <TestimonialCard
              author={currentTestimonial.author}
              text={currentTestimonial.quote}
            // Ensure TestimonialCard has a defined max-width if ShieldBadgeFrame doesn't constrain it enough
            // e.g., className="max-w-[320px]"
            />
          </ShieldBadgeFrame>
        </div>

        {totalSlides > 1 && (
          <button
            onClick={() => { handleNext(); stopAutoplay(); }}
            className="absolute right-xs sm:right-s md:right-m top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-brand-creamWhite/50 hover:bg-brand-creamWhite/80 transition-colors shadow-md"
            aria-label="Next testimonial"
          >
            <ArrowRightIcon className="h-6 w-6 md:h-8 md:w-8 text-brand-steelBlue" />
          </button>
        )}
      </div>

      {totalSlides > 1 && (
        <div className="flex justify-center space-x-2 mt-m" role="tablist" aria-label="Testimonial navigation dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                stopAutoplay();
              }}
              className={cn(
                "h-3 w-3 rounded-full transition-all duration-300 ease-out",
                currentIndex === index ? 'bg-brand-steelBlue scale-125' : 'bg-neutral-300 hover:bg-neutral-400'
              )}
              aria-selected={currentIndex === index}
              aria-label={`Go to testimonial ${index + 1}`}
              role="tab"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { TestimonialCarousel }; 
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for combining class names, as per project guidelines for clsx and tailwind-merge
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Define a basic type for a single testimonial item
interface TestimonialItem {
  id: string | number; // Based on key={item.id}
  // Add other properties of a testimonial if known
}

// Props for the TestimonialCarousel component
interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
  totalSlides: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  stopAutoplay: () => void;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  totalSlides,
  currentIndex,
  setCurrentIndex,
  stopAutoplay,
}) => {
  if (!testimonials || testimonials.length === 0) {
    return null; // Or some placeholder if no testimonials
  }

  return (
    // This outer div acts as the single root element for the component's JSX.
    // The problematic '</div>' from the original snippet will now correctly close this.
    <div>
      {/* Dots navigation */}
      {totalSlides > 1 && (
        <div className="flex justify-center space-x-2 mt-m" role="tablist" aria-label="Testimonial navigation dots">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
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


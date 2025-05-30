"use client";

import React from 'react';
import Card from '@/app/components/UI/Card';
import SeedIcon from '@/app/components/UI/Icons/SeedIcon';
import SproutIcon from '@/app/components/UI/Icons/SproutIcon';
import LeafIcon from '@/app/components/UI/Icons/LeafIcon';
import { FC, SVGProps } from 'react';
import Pill from '@/app/components/UI/Pill';

export interface TimelineStepData {
  id: number;
  IconComponent: FC<SVGProps<SVGSVGElement>>;
  title: string;
  duration: string; // This will be used as subtitle in the Card
  microCopy: string; // This will be used as description in the Card
  // nodeText is removed as it's not directly applicable to the card design
  href?: string; // Optional link for each card
}

export const timelineSteps: TimelineStepData[] = [
  {
    id: 1,
    IconComponent: SeedIcon,
    title: "Sign Up",
    duration: "60 secs",
    microCopy: "Fast, easy enrollment—just basic info.",
    // href: "/signup" // Example link
  },
  {
    id: 2,
    IconComponent: SproutIcon,
    title: "Connect Google Profile",
    duration: "2 mins",
    microCopy: "Securely link your Google Business Profile.",
  },
  {
    id: 3,
    IconComponent: LeafIcon,
    title: "Check Your Email",
    duration: "Within 24 hrs",
    microCopy: "Actionable insights straight to your inbox.",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-24 bg-[url('/textures/darker-rock-texture.jpg')] bg-cover bg-center how-it-works-gradient-overlay">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Pill above heading */}
        <div className="flex justify-center mb-4">
          <Pill mainText="How It Works" secondaryText="" />
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-center text-brand-creamWhite mb-12 lg:mb-16 font-display">
          Super Easy - Super Fast
        </h2>

        {/* Grid for Cards with connectors */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 relative">
          {timelineSteps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="relative flex flex-col items-center">
                {/* Step number badge */}
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-base shadow-md border-4 border-white"
                  aria-label={`Step ${idx + 1}`}
                >
                  {idx + 1}
                </span>
                <Card
                  IconComponent={step.IconComponent}
                  title={step.title}
                  subtitle={step.duration}
                  description={step.microCopy}
                  href={step.href}
                  className="flex flex-col pt-6" // pt-6 to make space for badge
                />
              </div>
              {/* Mobile/Tablet Vertical Arrow: render as a flex row between cards */}
              {idx < timelineSteps.length - 1 && (
                <div className="lg:hidden flex justify-center items-center w-full my-2" aria-hidden="true">
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="4" x2="12" y2="28" stroke="#FFA500" strokeWidth="3" strokeLinecap="round" />
                    <polygon points="6,28 12,32 18,28" fill="#FFA500" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
          {/* Desktop Horizontal Arrows: absolutely positioned between cards */}
          {timelineSteps.map((_, idx) => (
            idx < timelineSteps.length - 1 ? (
              <div
                key={`arrow-desktop-${idx}`}
                className="hidden lg:flex items-center justify-center absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-16 h-6 z-0"
                aria-hidden="true"
                style={{ gridColumn: `${idx + 1} / span 1` }}
              >
                {/* Horizontal Arrow SVG */}
                <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="4" y1="12" x2="60" y2="12" stroke="#FFA500" strokeWidth="3" strokeLinecap="round" />
                  <polygon points="60,6 64,12 60,18" fill="#FFA500" />
                </svg>
              </div>
            ) : null
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 
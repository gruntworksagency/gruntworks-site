"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import CtaButton from '../UI/CtaButton';

// VisuallyHidden component for accessibility with emojis/icons
const VisuallyHidden: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
    }}
  >
    {children}
  </span>
);

// Define EMOJI_ARIA_MAP at module level
const EMOJI_ARIA_MAP: Record<string, string> = {
  '✅': 'Feature included.',
  '⚠️': 'Feature has limitations.',
  '💸': 'Cost implication.',
  '💰': 'Cost implication.',
  '🕑': 'Time related information.',
  '❌': 'Feature not included.',
  '🤔': 'Consideration or mixed outcome.',
};

// Define the props interfaces
export interface Offer {
  id: string;
  name: string;
  priceNote?: string;
  icon?: React.ReactNode;
  mainDifferentiator?: React.ReactNode;
}

export interface FeatureRow {
  label: string;
  values: Record<string, React.ReactNode>;
}

export interface PricingComparisonSectionProps {
  headline: string;
  subtext: string;
  offers: Offer[];
  highlightId?: string;
  features: FeatureRow[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

// Helper function to parse feature values with emoji extraction and accessibility
const parseFeatureValue = (value: string | React.ReactNode): React.ReactNode => {
  if (typeof value !== 'string') {
    return (
      <div className="flex items-center justify-start text-left w-full text-neutral-50 dark:text-neutral-800">
        <span className="inline-flex items-center justify-center w-7 h-6">{value}</span>
      </div>
    );
  }

  const emojiMatch = value.match(/^(\p{Emoji_Presentation}|\p{Emoji})/u);
  let textContent = value;
  let emojiDisplay: string | null = null;

  if (emojiMatch) {
    emojiDisplay = emojiMatch[0];
    textContent = value.replace(/(\p{Emoji_Presentation}|\p{Emoji})+/gu, '').trim();
  }

  let ariaText = '';
  if (emojiDisplay && EMOJI_ARIA_MAP[emojiDisplay]) {
    ariaText = EMOJI_ARIA_MAP[emojiDisplay];
  }

  return (
    <div className="flex items-center justify-start text-left w-full text-neutral-50 dark:text-neutral-800">
      {emojiDisplay && (
        <span aria-hidden="true" className="inline-flex items-center justify-center w-7 h-6 text-lg mr-1.5 shrink-0">
          {emojiDisplay}
        </span>
      )}
      {ariaText && <VisuallyHidden>{ariaText}</VisuallyHidden>}
      <span className={`flex-grow ${!emojiDisplay ? 'pl-7' : ''}`}>{textContent}</span>
    </div>
  );
};

// Define the new PricingCard component here
interface PricingCardProps {
  offer: Offer;
  offerIndex: number;
  isHighlighted: boolean;
  isCenterCard: boolean;
  features: FeatureRow[];
  cardVariants: Variants;
  scaleClass: string;
  orderClasses: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  offer,
  offerIndex,
  isHighlighted,
  isCenterCard,
  features,
  cardVariants,
  scaleClass,
  orderClasses,
}) => {
  return (
    <motion.div
      custom={offerIndex}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      role="group"
      aria-labelledby={`offer-${offer.id}-name`}
      className={twMerge(`
        rounded-2xl bg-neutral-800 dark:bg-neutral-100 p-6 flex flex-col text-neutral-50 dark:text-neutral-900
        focus-within:ring-4 focus-within:ring-orange-500/70 dark:focus-within:ring-orange-600/70
        transition-all duration-300 ease-out
        ${isHighlighted ? `ring-4 ring-orange-500 dark:ring-orange-600 shadow-2xl relative ${scaleClass}` : 'shadow-lg hover:shadow-xl'}
        ${isHighlighted && isCenterCard && 'lg:z-10'}
        ${isHighlighted && isCenterCard ? 'lg:origin-top' : ''}
      `, orderClasses)}
    >
      {isHighlighted && (
        <div
          aria-label="Best value"
          className="absolute -top-3.5 right-3.5 bg-orange-500 text-neutral-950 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md"
        >
          Best Value
        </div>
      )}

      <div className="text-center mb-4">
        <h3
          id={`offer-${offer.id}-name`}
          className="text-xl lg:text-2xl font-semibold mb-1 flex items-center justify-center gap-2 text-neutral-50 dark:text-neutral-900"
        >
          {offer.icon && <span className="inline-block text-orange-400 dark:text-orange-500">{offer.icon}</span>}
          {offer.name}
        </h3>
        {offer.priceNote && (
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {offer.priceNote}
          </p>
        )}
      </div>

      {offer.mainDifferentiator && (
        <div className={twMerge(`text-center px-2 py-3 mb-4 rounded-lg
          ${isHighlighted ? 'bg-orange-500/10 dark:bg-orange-500/20' : 'bg-neutral-700/50 dark:bg-neutral-200/80'}`)}
        >
          <p className={twMerge(`font-semibold text-sm ${isHighlighted ? 'text-orange-300 dark:text-orange-400' : 'text-neutral-200 dark:text-neutral-700'}`)}>
            {offer.mainDifferentiator}
          </p>
        </div>
      )}

      <div className="my-2 flex-grow">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="text-sm border-t border-neutral-700 dark:border-neutral-300 py-3"
          >
            <p className="text-neutral-400 dark:text-neutral-500 text-xs mb-1.5 font-medium break-words">{feature.label}</p>
            <div className="font-medium">
              {feature.values[offer.id] !== undefined
                ? parseFeatureValue(feature.values[offer.id] as string)
                : (
                  <div className="flex items-center justify-start text-left w-full text-neutral-500 dark:text-neutral-400">
                    <span className="flex-grow pl-7">—</span>
                  </div>
                )
              }
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA Button for highlighted card only */}
      {isHighlighted && (
        <div className="text-center mt-12">
          <CtaButton
            href="/audit"
            variant="urgent"
          >
            Start Audit
          </CtaButton>
        </div>
      )}

    </motion.div>
  );
};

const PricingComparisonSection: React.FC<PricingComparisonSectionProps> = ({
  headline,
  subtext,
  offers = [],
  highlightId = "gruntworks",
  features = [],
  ctaLabel = "Start Your Audit →",
  ctaHref = "#",
  className = "",
}) => {
  // Edge cases: missing essential props
  if (!headline || !subtext || features.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn("PricingComparisonSection: Missing essential props (headline, subtext, or features). Section will not render.");
    }
    return null;
  }

  // Edge case: invalid number of offers
  if (offers.length !== 3) {
    return (
      <section className={twMerge("bg-neutral-950 text-neutral-50 dark:bg-white dark:text-neutral-900 py-20 px-4 md:px-8", className)}>
        <div className="text-center text-red-500 dark:text-red-600">
          <p className="font-semibold text-lg">Configuration Error</p>
          <p>The pricing comparison section requires exactly three offers to display correctly. Received {offers.length}.</p>
        </div>
      </section>
    );
  }

  const ctaButtonId = "pricing-cta-button";
  const headlineId = "pricing-headline";

  const centerOfferIndex = 1;
  const isCenterOfferHighlighted = offers[centerOfferIndex]?.id === highlightId;

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section
      className={twMerge("bg-neutral-950 text-neutral-50 dark:bg-white dark:text-neutral-900 py-16 sm:py-20 px-4 md:px-8 overflow-hidden", className)}
      aria-labelledby={headlineId}
    >
      <motion.h2
        id={headlineId}
        className="text-3xl md:text-4xl font-bold text-center leading-tight mb-3 text-neutral-50 dark:text-neutral-900"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {headline}
      </motion.h2>
      <motion.p
        className="text-lg md:text-xl text-center max-w-3xl mx-auto text-neutral-300 dark:text-neutral-600 mb-10 md:mb-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        {subtext}
      </motion.p>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch lg:items-start max-w-6xl mx-auto">
        {offers.map((offer, offerIndex) => {
          const isHighlighted = offer.id === highlightId;
          const isCenterCard = offerIndex === centerOfferIndex;
          const scaleClass = isHighlighted ? (isCenterCard ? 'lg:scale-110' : 'md:scale-105') : '';

          let orderClasses = "order-1";
          if (offerIndex === 0) { 
            orderClasses = "order-1";
          } else if (offerIndex === 1) { 
            orderClasses = "order-3 lg:order-2";
          } else if (offerIndex === 2) { 
            orderClasses = "order-2 lg:order-3";
          }

          return (
            <PricingCard
              key={offer.id}
              offer={offer}
              offerIndex={offerIndex}
              isHighlighted={isHighlighted}
              isCenterCard={isCenterCard}
              features={features}
              cardVariants={cardVariants}
              scaleClass={scaleClass}
              orderClasses={orderClasses}
            />
          );
        })}
      </div> 
    </section>
  );
};

export default PricingComparisonSection; 
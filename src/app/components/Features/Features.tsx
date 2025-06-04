import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Pill from '../UI/Pill';

interface FeatureCardData {
  title: string;
  description: string;
  backgroundImage: string;
  id: string;
}

const featureCardsData: FeatureCardData[] = [
  {
    id: "live-heatmap",
    title: "Live Heatmap",
    description: "See who's ranking across your metro area in real time.",
    backgroundImage: '/card--1.png',
  },
  {
    id: "100-point-audit",
    title: "100-Point Audit",
    description: "Full PDF report on your Google Business Page, Website and SEO performance.",
    backgroundImage: '/card--2.png',
  },
  {
    id: "30-day-playbook",
    title: "30-Day Playbook",
    description: "Follow an easy step-by-step roadmap to boost visibility in 30 days flat.",
    backgroundImage: '/card--3.png',
  },
];

const Features: React.FC = () => {
  return (
    <section className="relative features-gradient-bg film-grain-overlay pt-24 pb-12 sm:pt-28 md:pt-32 lg:pt-36">
      <div className="container mx-auto px-4 max-w-[850px] text-center relative z-10">
        <Pill
          mainText="What You'll Get"
          mainTextColorClass="text-orange-500"
          secondaryText=""
          className="mx-auto inline-block"
        />

        <h2 className="text-white text-4xl md:text-5xl font-black text-center mb-4">
          Unearth Exactly What's Blocking Your Local SEO
        </h2>
        <p className="text-gray-300 text-sm text-center mb-12 max-w-lg mx-auto">
          Identify and fix your local SEO visibility gaps with our comprehensive audit, live heatmap, and personalized 30-day playbook.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mx-auto">
          {featureCardsData.map((card) => (
            <div key={card.id} className="relative w-full md:basis-1/3 max-w-[358px] aspect-[358/448] rounded-lg overflow-hidden mx-auto flex-shrink-0 shadow-lg">
              <Image
                src={card.backgroundImage}
                alt={`Background for ${card.title} card`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 358px"
              />
              <div className="absolute bottom-0 w-full p-4">
                <h3 className="text-gray-900 text-xl font-black">{card.title}</h3>
                <p className="text-gray-700 text-[12px]">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 
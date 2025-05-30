"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowRight } from 'lucide-react';
import FlyAnimation from '../FlyAnimation/FlyAnimation';
import Pill from '../UI/Pill';

const HERO_BG_PARALLAX_BASE_SPEED_FACTOR = 0.6; // Initial speed: 0.3 means bg moves 30px for 100px scroll
const HERO_BG_PARALLAX_SPEED_INCREASE_RATE = 1.1; // Speed increases by 10%
const HERO_BG_PARALLAX_SCROLL_INTERVAL = 100;    // ...for every 100px of scroll

interface HeroProps { }

const Hero: React.FC<HeroProps> = () => {
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const ipadRef = useRef<HTMLDivElement>(null);
  const ipadScreenRef = useRef<HTMLDivElement>(null);
  const ipadBezelTopRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLElement>(null);
  const [bgTranslateY, setBgTranslateY] = useState<number>(0);

  const calculateDynamicTranslateY = useCallback((scrollY: number): number => {
    const numIntervals = Math.floor(scrollY / HERO_BG_PARALLAX_SCROLL_INTERVAL);
    const scrollRemainder = scrollY % HERO_BG_PARALLAX_SCROLL_INTERVAL;

    let accumulatedMarginFromFullIntervals = 0;
    if (numIntervals > 0) {
      const geometricSumFactor = (Math.pow(HERO_BG_PARALLAX_SPEED_INCREASE_RATE, numIntervals) - 1) / (HERO_BG_PARALLAX_SPEED_INCREASE_RATE - 1);
      accumulatedMarginFromFullIntervals = HERO_BG_PARALLAX_BASE_SPEED_FACTOR * HERO_BG_PARALLAX_SCROLL_INTERVAL * geometricSumFactor;
    }

    const marginFromCurrentPartialInterval = HERO_BG_PARALLAX_BASE_SPEED_FACTOR * Math.pow(HERO_BG_PARALLAX_SPEED_INCREASE_RATE, numIntervals) * scrollRemainder;

    // The result is negative because we want margin-top to decrease (move upwards)
    return -(accumulatedMarginFromFullIntervals + marginFromCurrentPartialInterval);
  }, []);

  const flyTargetRefs = useMemo(() => ({
    ipad: ipadBezelTopRef,
    cta: ctaButtonRef,
    pill: pillRef,
  }), [ipadBezelTopRef, ctaButtonRef, pillRef]);

  const flyTargetOffsets = useMemo(() => ({
    ipad: { y: -690 },
    cta: { y: -710 },
    pill: { y: -690 },
  }), []);

  useEffect(() => {
    const handleScroll = () => {
      const newTranslateY = calculateDynamicTranslateY(window.scrollY);
      setBgTranslateY(newTranslateY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation in case the page loads scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [calculateDynamicTranslateY]);

  return (
    <section ref={heroSectionRef} className="relative bg-black overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 mt-[175px]"
        style={{ transform: `translateY(${bgTranslateY}px)` }}
      >
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover mt-[-175px]"
          quality={100}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center pb-16 md:pb-24 lg:pb-32">
        {/* Text Content Container */}
        <div className="container mx-auto px-4 pt-[12rem] text-center flex flex-col items-center">
          {/* Pill Text (h1) */}
          <Pill
            ref={pillRef}
            mainText="HEATWORKS"
            secondaryText=": Local SEO Audit"
            as="h1"
          />

          {/* Main Headline (h2) */}
          <h2 className="text-4xl md:text-5xl font-black text-[#2d2828] text-center mb-4 max-w-3xl">
            Invisible on Google Maps? <br />Stop Losing Jobs
          </h2>

          {/* Tagline (p) */}
          <p className="text-md text-[#2d2828] text-center mb-8 max-w-xl mt-4">
            <span className="font-bold">HEATWORKS</span> is your <i>5-minute</i> <span className="font-medium">Google Local Home Services Audit</span> built for landscapers who hate guessing. See your <i>actual
              rankings</i> across your <span className="font-medium">entire
                metro</span> area.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 mt-8">
            {/* Price Badge */}
            <div
              className={twMerge(
                clsx(
                  'bg-white text-center py-2 px-6 rounded-lg border-2 border-red-900 shadow-md flex flex-col items-center'
                )
              )}
            >
              <span className="text-[9px] font-bold text-red-900 mb-[-5px]">
                limited time
              </span>
              <div className="flex items-center gap-1">
                {/* <span className="text-red-900 line-through">
                  ~$150~
                </span> */}
                <span className="text-xl font-bold text-black">
                  $75
                  <span className="text-[10px] pl-1 text-gray-400">/ one-time</span>
                </span>
              </div>
            </div>

            <button
              ref={ctaButtonRef}
              className={twMerge(
                clsx(
                  'bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg flex items-center gap-2 border-2 border-orange-200 shadow-md transition-colors'
                )
              )}
            >
              ⚡ Start My Audit
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* iPad/Video Container */}
        <div ref={ipadRef} className="relative w-full mx-auto mt-0 px-4 max-w-[1280px]">
          {/* This container defines the 16:9 aspect ratio for the iPad frame and video content. */}
          <div className="relative aspect-[16/9] w-full mx-auto">
            {/* Anchor for fly target: top-center of iPad image */}
            <div
              ref={ipadBezelTopRef}
              className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 pointer-events-none z-20"
              aria-hidden="true"
            />
            <Image
              src="/ipad.png" // This image should visually frame the video.
              alt="iPad mockup displaying Heatworks audit"
              fill
              className="object-contain z-10"
              quality={100}
            />
            {/* Video area (iPad screen) */}
            <div
              ref={ipadScreenRef}
              className="absolute top-[15.08%] left-[15.08%] w-[69.84%] h-[69.84%] z-0 flex items-center justify-center"
              aria-label="iPad screen area"
            >
              <video
                src="/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <Image
                src="/badge--lightt.png"
                alt="Certification badge"
                width={1298}
                height={751}
                className="absolute bottom-[10px] right-[10px] z-10 max-w-[250px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grass Transition Image */}
      <div className="absolute bottom-0 left-0 w-full z-10 overflow-hidden transform mb-[-7rem]">
        <Image
          src="/grass-transition.png"
          alt="Grass transition effect"
          width={2880}
          height={1816}
          className="w-full h-auto object-fill"
          quality={100}
        />
      </div>
      <FlyAnimation
        targetRefs={flyTargetRefs}
        containerRef={heroSectionRef}
        flightDuration={0.5}
        pauseDuration={1000}
        flyWidth={40}
        flyHeight={40}
        pathRandomnessFactor={2}
        targetOffsets={flyTargetOffsets}
      />
    </section>
  );
};

export default Hero; 
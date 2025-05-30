'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

// Define types for navigation links and submenu items if they become props later
// interface NavLink {
//   href: string;
//   label: string;
// }

// interface SubMenuItem {
//   title: string;
//   description: string;
//   gradientFrom: string;
//   gradientTo: string;
// }

const Header: React.FC = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const subMenuItems = [
    {
      title: "AI Website Creation",
      description: "Generate fully functional, client-ready websites in minutes with our AI-powered platform.",
      gradientFrom: "from-blue-300",
      gradientTo: "to-blue-500",
      href: "/services/ai-website-creation"
    },
    {
      title: "SEO Optimization",
      description: "Boost your clients' online visibility with our advanced SEO tools and strategies.",
      gradientFrom: "from-orange-400",
      gradientTo: "to-orange-500",
      href: "/services/seo-optimization"
    },
    {
      title: "Content Marketing",
      description: "Engage audiences and drive conversions with compelling, AI-assisted content.",
      gradientFrom: "from-lime-400",
      gradientTo: "to-lime-500",
      href: "/services/content-marketing"
    },
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg border border-gray-200 rounded-2xl max-w-[800px] w-[calc(100%-2rem)]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left-aligned Navigation (Features, Pricing, More) */}
          <nav className="flex items-center space-x-6 text-sm">
            <Link href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                aria-expanded={isMoreMenuOpen}
                aria-controls="more-menu-dropdown"
              >
                More
                <ChevronDown
                  className={clsx('ml-1 h-4 w-4 transition-transform', {
                    'rotate-180': isMoreMenuOpen,
                  })}
                />
              </button>
            </div>
          </nav>

          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="relative" aria-label="Homepage">
              <Image src="/logo.png" alt="GRUNTWORKS Logo" width={220} height={60} className="h-12 w-auto" priority />
            </Link>
          </div>

          {/* Right-aligned Action Button */}
          <div>
            <Link
              href="/audit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center transition-colors shadow-sm"
            >
              Start Audit <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Submenu Dropdown */}
        {isMoreMenuOpen && (
          <div
            id="more-menu-dropdown"
            ref={menuRef}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-auto min-w-[600px] max-w-[700px]"
            role="menu"
          >
            <h3 className="text-gray-800 font-semibold text-lg mb-5 text-center">Explore Our Services</h3>
            <div className="grid grid-cols-3 gap-4">
              {subMenuItems.map((item, index) => (
                <Link href={item.href} key={index} className={clsx(
                  "rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-white/20 group block",
                  item.gradientFrom, item.gradientTo,
                  "bg-gradient-to-b" // Apply gradient
                )}>
                  <div className="p-5 min-h-[160px] flex flex-col justify-end bg-black/20 hover:bg-black/30 transition-colors"> {/* Adjusted padding and min-height */}
                    <h4 className="text-white font-medium text-base mb-1 group-hover:underline">{item.title}</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Overlay to close menu when clicking outside (handled by useEffect) */}
      {/* The visual overlay div could still be useful for a subtle background dimming effect if desired */}
      {isMoreMenuOpen && <div className="fixed inset-0 z-40 bg-black/10" onClick={() => setIsMoreMenuOpen(false)} aria-hidden="true" />}
    </>
  );
};

export default Header; 
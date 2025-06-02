import React from 'react';
import Image from 'next/image';
import CtaButton from '../UI/CtaButton'; // Adjusted path
import { Check } from 'lucide-react';

const CtaBanner: React.FC = () => {
  return (
    <section className="bg-yellow-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl max-w-4xl mx-auto shadow-xl overflow-hidden md:flex md:items-stretch min-h-[20rem]">
          {/* Text Content Area */}
          <div className="md:w-1/2 py-24 px-8 md:px-12 lg:px-16 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Grow Your Business with Us?
            </h2>
            <ul className="text-gray-700 text-lg space-y-4 mb-8 text-center md:text-left">
              <li className="flex items-start justify-center md:justify-start">
                <Check className="text-green-500 mr-2 flex-shrink-0 mt-1" size={20} />
                <span>Live map dashboard</span>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <Check className="text-green-500 mr-2 flex-shrink-0 mt-1" size={20} />
                <span>Full PDF audit report</span>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <Check className="text-green-500 mr-2 flex-shrink-0 mt-1" size={20} />
                <span>30-day playbook</span>
              </li>
            </ul>
            <CtaButton aria-label="Book a free consultation">
              Book Free Consultation
            </CtaButton>
          </div>

          {/* Image Area */}
          <div className="w-full h-64 md:w-1/2 md:h-auto relative">
            <Image
              src="/cta_image.jpg"
              alt="Sunny illustration of business collaboration and growth"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner; 
"use client";

import React, { useMemo } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface FAQAccordionSectionProps {
  items: FAQItem[];
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
  defaultOpenId?: string;
  className?: string;
}

const FAQAccordionSection: React.FC<FAQAccordionSectionProps> = ({
  items,
  title = "Frequently Asked Questions",
  ctaLabel,
  ctaHref,
  defaultOpenId,
  className = "",
}) => {
  // Edge: Empty items
  if (!items || items.length === 0) {
    return <section className={twMerge("bg-neutral-950 py-16 px-4 lg:px-8", className)}><div className="text-center text-neutral-400">No FAQs yet.</div></section>;
  }

  // Edge: Duplicate IDs
  useMemo(() => {
    const idSet = new Set();
    for (const item of items) {
      if (idSet.has(item.id)) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn(`Duplicate FAQ id detected: ${item.id}`);
        }
      }
      idSet.add(item.id);
    }
  }, [items]);

  // Default open id
  const openId = defaultOpenId;

  return (
    <section className={twMerge("bg-neutral-950 py-16 px-4 lg:px-8", className)}>
      <h2 className="text-3xl md:text-5xl font-serif text-white mb-10 text-center">
        {title}
      </h2>
      <Accordion.Root
        type="single"
        collapsible
        defaultValue={openId}
        className="mx-auto w-full max-w-xl"
      >
        {items.map((item) => (
          <Accordion.Item
            key={item.id}
            value={item.id}
            className={clsx(
              "rounded-lg bg-neutral-900 text-white mb-4 overflow-hidden transition-shadow",
              "[data-state='open']:ring-1 [data-state='open']:ring-neutral-700"
            )}
          >
            <Accordion.Header asChild>
              <Accordion.Trigger
                className={clsx(
                  "group peer flex w-full items-center justify-between p-6 text-left font-medium transition-colors",
                  "bg-neutral-900 hover:bg-neutral-800 data-[state=open]:bg-neutral-800",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                )}
                aria-label={item.question}
              >
                <span className="truncate block max-w-[80%]">
                  {item.question}
                </span>
                <ChevronDown
                  className={clsx(
                    "ml-4 h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180"
                  )}
                  aria-hidden="true"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              className={clsx(
                "overflow-hidden transition-all duration-300 ease-out",
                "[data-state='closed']:max-h-0 [data-state='open']:max-h-[80vh]",
                "[data-state='closed']:opacity-0 [data-state='open']:opacity-100"
              )}
            >
              <div className="px-6 pb-6 text-neutral-300 leading-relaxed prose prose-invert">
                {typeof item.answer === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                ) : (
                  item.answer
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="mt-8 mx-auto flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold hover:bg-neutral-800 transition text-white w-fit"
          tabIndex={0}
          rel="noopener noreferrer"
        >
          {ctaLabel}
        </a>
      )}
    </section>
  );
};

export default FAQAccordionSection;

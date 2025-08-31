"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { FaqItem } from "@/types/faq";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  faqs: FaqItem[];
  className?: string;
}

export function FaqAccordion({ faqs, className }: FaqAccordionProps) {
  if (faqs.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">
          Не са намерени въпроси, отговарящи на вашите критерии.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {faqs.map((faq) => (
        <Disclosure key={faq.id} as="div" className="group">
          {({ open }) => (
            <>
              <Disclosure.Button
                className={cn(
                  "flex w-full items-center justify-between rounded-lg bg-white px-6 py-4 text-left text-sm font-medium text-gray-900",
                  "focus-visible:ring-opacity-75 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500",
                  "transition-colors duration-200",
                  "border border-gray-200",
                )}
                aria-expanded={open}
                aria-controls={`faq-panel-${faq.id}`}
                id={`faq-header-${faq.id}`}
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDownIcon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200",
                    open && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </Disclosure.Button>
              <Disclosure.Panel
                id={`faq-panel-${faq.id}`}
                role="region"
                aria-labelledby={`faq-header-${faq.id}`}
                className="rounded-b-lg border-r border-b border-l border-gray-200 bg-gray-50 px-6 pt-2 pb-4 text-sm text-gray-600"
              >
                <div className="prose prose-sm max-w-none">{faq.answer}</div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

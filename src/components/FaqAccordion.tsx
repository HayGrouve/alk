"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <Accordion
      type="single"
      collapsible
      className={cn("w-full space-y-4", className)}
    >
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <AccordionTrigger className="cursor-pointer text-left text-sm font-medium text-gray-900 hover:no-underline [&[data-state=open]>svg]:rotate-180">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pt-2 text-sm text-gray-600">
            <div className="prose prose-sm max-w-none">{faq.answer}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

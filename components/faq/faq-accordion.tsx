"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => {
        const isOpen = faq.id === openId;
        return (
          <div key={faq.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-serif text-lg text-ink md:text-xl">{faq.question}</span>
              <Plus
                size={18}
                strokeWidth={1.5}
                className={cn(
                  "shrink-0 text-terracotta transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <p className="overflow-hidden text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

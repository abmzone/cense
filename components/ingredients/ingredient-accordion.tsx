"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { cn } from "@/lib/utils";

export interface Ingredient {
  title: string;
  tone: "floral" | "fresh" | "woody" | "neutral";
  description: string;
}

export function IngredientAccordion({ ingredients }: { ingredients: Ingredient[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div className="aspect-square md:sticky md:top-28 md:self-start">
        <PlaceholderImage
          alt={ingredients[openIndex].title}
          tone={ingredients[openIndex].tone}
          label={ingredients[openIndex].title}
          className="h-full w-full"
        />
      </div>

      <div className="divide-y divide-line border-y border-line">
        {ingredients.map((ingredient, i) => {
          const isOpen = i === openIndex;
          return (
            <div key={ingredient.title}>
              <button
                onClick={() => setOpenIndex(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span className="font-serif text-2xl text-ink">{ingredient.title}</span>
                <Plus
                  size={20}
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
                <p className="overflow-hidden text-sm leading-relaxed text-ink-soft">
                  {ingredient.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

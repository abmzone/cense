import type { LucideIcon } from "lucide-react";

export function WhyCenseCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="border-t border-line pt-6">
      <Icon size={22} strokeWidth={1.25} className="text-maroon" />
      <h3 className="mt-4 font-serif text-lg text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}

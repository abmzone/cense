import Image from "next/image";
import { cn } from "@/lib/utils";

type Tone = "floral" | "fresh" | "woody" | "combo" | "neutral";

const TONE_GRADIENTS: Record<Tone, string> = {
  floral: "from-[#5b1a24] via-[#8a3a3f] to-[#c99274]",
  fresh: "from-[#3f1119] via-[#ad6a4d] to-[#b6954f]",
  woody: "from-[#211a17] via-[#3f1119] to-[#5b1a24]",
  combo: "from-[#5b1a24] via-[#b6954f] to-[#3f1119]",
  neutral: "from-[#f2ece2] via-[#e6ddd0] to-[#f2ece2]",
};

interface PlaceholderImageProps {
  src?: string | null;
  alt: string;
  tone?: Tone;
  className?: string;
  label?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders a real image when `src` is provided (e.g. from Supabase Storage
 * once product photography is uploaded); otherwise falls back to an
 * editorial gradient placeholder so every layout looks intentional before
 * real photography exists.
 */
export function PlaceholderImage({
  src,
  alt,
  tone = "neutral",
  className,
  label,
  sizes,
  priority,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        TONE_GRADIENTS[tone],
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.18),transparent_60%)]" />
      {label ? (
        <span
          className={cn(
            "absolute bottom-4 left-4 font-serif text-sm tracking-wide",
            tone === "neutral" ? "text-ink-soft" : "text-warm-white/85"
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

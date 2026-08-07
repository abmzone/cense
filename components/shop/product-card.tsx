import Link from "next/link";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { formatINR } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const price = product.variants[0]?.price ?? 0;
  const cover = product.images[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="aspect-[4/5] w-full">
        <PlaceholderImage
          src={cover?.url}
          alt={cover?.alt ?? product.name}
          tone={product.collection}
          label={product.name}
          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl text-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
        </div>
        <p className="whitespace-nowrap text-sm text-ink-soft">
          from {formatINR(price)}
        </p>
      </div>
    </Link>
  );
}

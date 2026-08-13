import { formatINR } from "@/lib/utils";
import { getSettings } from "@/lib/data/settings";

export async function AnnouncementBar() {
  const settings = await getSettings();
  const message = `Free shipping on orders above ${formatINR(settings.free_shipping_threshold)}`;

  return (
    <div className="overflow-hidden bg-maroon py-2.5 text-warm-white">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((groupIndex) => (
          <div key={groupIndex} className="flex shrink-0 items-center" aria-hidden={groupIndex > 0}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                aria-hidden={i > 0}
                className="mx-8 whitespace-nowrap text-sm tracking-wide"
              >
                {message}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

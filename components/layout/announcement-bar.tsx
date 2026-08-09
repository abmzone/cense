import { formatINR } from "@/lib/utils";
import { getSettings } from "@/lib/data/settings";

export async function AnnouncementBar() {
  const settings = await getSettings();

  return (
    <div className="bg-maroon py-2 text-center text-xs tracking-wide text-warm-white">
      Free shipping on orders above {formatINR(settings.free_shipping_threshold)}
    </div>
  );
}

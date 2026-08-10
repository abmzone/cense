import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Container } from "@/components/ui/container";
import { FOOTER_NAV, SITE } from "@/lib/constants";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function Footer() {
  return (
    <footer className="border-t border-line bg-off-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <img src="/cense-logo.svg" alt={SITE.name} className="h-6 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            {SITE.description}
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Cense on Instagram"
            className="mt-6 inline-flex text-ink-soft transition-colors hover:text-maroon"
          >
            <InstagramIcon size={20} />
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-ink-soft">Brand</p>
          <ul className="mt-4 space-y-2">
            {FOOTER_NAV.brand.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft hover:text-maroon">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-ink-soft">Policies</p>
          <ul className="mt-4 space-y-2">
            {FOOTER_NAV.policies.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft hover:text-maroon">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-ink-soft">Stay in the fold</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Notes on new releases, the journal, and the women behind Cense.
          </p>
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-line py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-ink-soft md:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. Made in Assam.</p>
          <p>
            {SITE.email} &middot; {SITE.phone}
          </p>
        </Container>
      </div>
    </footer>
  );
}

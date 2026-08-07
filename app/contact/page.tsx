import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { ContactForm } from "@/components/contact/contact-form";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Cense — email, phone, Instagram, or send us a message directly.",
};

export default function ContactPage() {
  return (
    <section className="py-28">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Contact</p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl leading-tight text-ink md:text-6xl">
            We&apos;d love to hear from you.
          </h1>
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          <Reveal>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <Mail size={20} strokeWidth={1.5} className="text-maroon" />
                <a href={`mailto:${SITE.email}`} className="text-ink hover:text-maroon">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} strokeWidth={1.5} className="text-maroon" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-ink hover:text-maroon">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <InstagramIcon size={20} />
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:text-maroon"
                >
                  @cense.in
                </a>
              </li>
              <li className="flex items-center gap-4">
                <MapPin size={20} strokeWidth={1.5} className="text-maroon" />
                <span className="text-ink">{SITE.address}</span>
              </li>
            </ul>

            <div className="mt-10 aspect-[4/3] w-full overflow-hidden border border-line">
              <iframe
                title="Cense location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=91.66%2C26.15%2C91.76%2C26.22&layer=mapnik&marker=26.1845%2C91.7062"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

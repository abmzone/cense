import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PolicyPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-28">
      <Container className="max-w-2xl">
        <Reveal>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">{title}</h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-ink-soft">
            Last updated {updated}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="prose-policy mt-12 space-y-6 text-sm leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc">
            {children}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

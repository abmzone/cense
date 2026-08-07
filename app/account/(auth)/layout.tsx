import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/constants";

export default function AccountAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container className="mx-auto max-w-md">
        <Link href="/" className="block text-center font-serif text-2xl tracking-[0.15em] text-ink">
          {SITE.name.toUpperCase()}
        </Link>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

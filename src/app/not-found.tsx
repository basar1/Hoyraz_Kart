import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="bg-canvas">
        <div className="mx-auto max-w-3xl px-4 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-2">404</p>
          <h1 className="mt-3 font-display text-4xl text-ink">Sayfa bulunamadı</h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">
            Aradığınız sayfa yayında değil. Kurumsal sayfaya veya ekip kartvizitlerine dönebilirsiniz.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent"
            >
              Ana sayfa
            </Link>
            <Link
              href="/#ekip"
              className="inline-flex items-center justify-center rounded-full border border-accent-2 px-5 py-3 text-sm font-semibold text-ink"
            >
              Ekip kartvizitleri
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

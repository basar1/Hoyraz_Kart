import { companyConfig } from "@/data/companyConfig";

export function LegalNotice({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-center text-[11px] leading-5 text-on-hero-muted">{companyConfig.legalCompliance}</p>
    );
  }

  return (
    <aside className="border border-line border-l-4 border-l-accent-2 bg-surface px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">Yasal uyarı</p>
      <p className="mt-2 text-sm leading-7 text-ink-soft">{companyConfig.legalCompliance}</p>
    </aside>
  );
}

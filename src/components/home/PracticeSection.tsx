import { companyConfig } from "@/data/companyConfig";
import { PracticeIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

export function PracticeSection() {
  return (
    <section id="calisma-alanlari" className="scroll-mt-24 border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          eyebrow="Faaliyet alanları"
          title="Çalışma alanlarımız"
          description="Tarım, tesis yönetimi, inşaat ve mühendislik işlerini aynı saha disiplininde yürütüyoruz."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {companyConfig.practiceAreas.map((area, index) => (
            <article
              key={area.title}
              className="flex h-full flex-col rounded-3xl border border-line bg-canvas p-6 transition hover:border-accent-2"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-full border border-accent-2 text-accent-2">
                  <PracticeIcon name={area.icon} className="size-5" />
                </span>
                <span className="font-display text-sm text-accent-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl leading-snug text-ink">{area.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{area.summary}</p>
              <details className="group mt-4">
                <summary className="cursor-pointer text-sm font-medium text-accent-2">
                  Ayrıntılı açıklama
                </summary>
                <div className="mt-3 space-y-3">
                  {area.description.split(/\n\n+/).map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="text-sm leading-7 text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

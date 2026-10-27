import { Eye, GraduationCap, Lock, Shield } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Employee } from "@/data/companyConfig";
import { lawyerPublicName } from "@/utils/format";

const principles = [
  {
    title: "Şeffaflık",
    text: "Vekalet kapsamı, olası riskler, süreler ve süreç adımları müvekkille açıkça paylaşılır.",
    icon: Eye,
  },
  {
    title: "Gizlilik",
    text: "Mesleki sır kapsamındaki bilgi ve belgeler, yalnızca temsil için gerekli ölçüde ve mevzuata uygun işlenir.",
    icon: Lock,
  },
  {
    title: "Mesleki etik",
    text: "Çalışma düzeni, Türkiye Barolar Birliği meslek kurallarına ve reklam yasağına uygun bir bilgilendirme anlayışıyla sınırlıdır.",
    icon: Shield,
  },
];

export function AboutSection({ employee }: { employee: Employee }) {
  const { personalInfo } = employee;
  const paragraphs = personalInfo.biography.split(/\n\n+/).filter(Boolean);
  const education = personalInfo.education.split("\n").filter(Boolean);
  const publicName = lawyerPublicName(personalInfo.namePrefix, personalInfo.fullName);

  return (
    <section id="hakkimizda" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)]">
          <div>
            <SectionHeading
              eyebrow="Hakkımızda"
              title="Kurumsal ilkelerle sınırlı bir temsil"
              description={`${publicName}, ${personalInfo.title.toLocaleLowerCase("tr-TR")} olarak büro faaliyetini yürütür. Sicil bilgisi ilgili meslek kuruluşu kayıtlarıyla doğrulanabilir.`}
            />
            <div className="mt-8 space-y-4">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-base leading-8 text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-line bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">Sicil</p>
            <p className="mt-3 font-display text-2xl text-ink">{publicName}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{personalInfo.barRegistration}</p>
            <div className="mt-6 border-t border-line pt-6">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">
                <GraduationCap className="size-4" aria-hidden="true" />
                Eğitim
              </p>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-ink-soft">
                {education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="rounded-3xl border border-line bg-surface p-6">
              <item.icon className="size-5 text-accent-2" aria-hidden="true" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

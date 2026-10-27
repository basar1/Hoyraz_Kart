import Image from "next/image";
import Link from "next/link";
import { PracticeSection } from "@/components/home/PracticeSection";
import { SiteShell } from "@/components/SiteShell";
import { companyConfig } from "@/data/companyConfig";
import { lawyerPublicName } from "@/utils/format";

export default function HomePage() {
  const { office, employees } = companyConfig;

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-hero text-on-hero">
        <div className="pointer-events-none absolute inset-0 theme-glow" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent-2">{office.city}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.15] text-on-hero sm:text-5xl lg:text-6xl">
            {office.name}
          </h1>
          <p className="mt-6 max-w-2xl font-display text-2xl leading-snug text-accent-2">{office.statement}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-on-hero-muted">{office.intro}</p>
        </div>
      </section>

      <PracticeSection />

      <section id="ekip" className="scroll-mt-24 bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">Dijital kartvizitler</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Görüşmek istediğiniz kişinin kartvizitini açın. Her bağlantı o çalışanın iletişim kartıdır.
          </p>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => {
              const publicName = lawyerPublicName(
                employee.personalInfo.namePrefix,
                employee.personalInfo.fullName,
              );

              return (
                <li key={employee.slug}>
                  <Link
                    href={`/${employee.slug}`}
                    className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition hover:border-accent-2"
                  >
                    <span className="relative size-20 overflow-hidden rounded-full border-2 border-accent-2">
                      <Image
                        src={employee.personalInfo.photoUrl}
                        alt={employee.personalInfo.photoAlt || publicName}
                        width={80}
                        height={80}
                        className="size-full object-cover object-[center_18%]"
                      />
                    </span>
                    <span className="mt-5 font-display text-2xl text-ink">{publicName}</span>
                    <span className="mt-1 text-sm text-accent-2">{employee.personalInfo.title}</span>
                    <span className="mt-6 inline-flex w-fit rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent">
                      Kartviziti aç
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}

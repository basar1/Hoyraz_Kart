import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { companyConfig } from "@/data/companyConfig";
import { lawyerPublicName } from "@/utils/format";

export const metadata: Metadata = {
  title: "Dijital Kartvizitler",
  description: `${companyConfig.office.name} çalışanlarının dijital iletişim kartları.`,
};

export default function KartPage() {
  const { office, employees } = companyConfig;

  return (
    <SiteShell>
      <section className="bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-2">{office.city}</p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Dijital kartvizitler</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {office.name} ekibinin kişisel kartvizitleri. Bir kişiye dokunarak telefon, WhatsApp ve rehber kaydına
            ulaşabilirsiniz.
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
                    <span className="font-display text-2xl text-ink">{publicName}</span>
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

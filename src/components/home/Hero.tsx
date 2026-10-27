import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { companyConfig, type Employee } from "@/data/companyConfig";
import { lawyerPublicName } from "@/utils/format";
import { whatsappHref } from "@/utils/links";

export function Hero({ employee }: { employee: Employee }) {
  const { office } = companyConfig;
  const { personalInfo, contact } = employee;
  const publicName = lawyerPublicName(personalInfo.namePrefix, personalInfo.fullName);

  return (
    <section className="relative overflow-hidden bg-hero text-on-hero">
      <div className="pointer-events-none absolute inset-0 theme-glow" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.8fr)] lg:py-24">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent-2">
            {office.city}
          </p>
          <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.15] text-on-hero sm:text-5xl lg:text-6xl">
            {office.statement}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-on-hero-muted">{office.intro}</p>
          <p className="mt-4 text-sm font-medium tracking-wide text-accent-2">
            Mesleki ilkeler ve hukuki güvence
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref(contact.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
            >
              <WhatsAppIcon className="size-4" />
              Ön Görüşme Talebi
            </a>
            <Link
              href="#calisma-alanlari"
              className="inline-flex items-center justify-center rounded-full border border-accent-2 px-6 py-3.5 text-sm font-semibold text-on-hero transition hover:bg-accent-soft"
            >
              Çalışma Alanlarımız
            </Link>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-[2rem] border border-line" />
          <div className="relative overflow-hidden rounded-[1.6rem] border border-accent-2 bg-hero-elevated">
            <Image
              src={personalInfo.photoUrl}
              alt={personalInfo.photoAlt}
              width={720}
              height={900}
              priority
              className="aspect-[4/5] w-full object-cover object-[center_18%]"
            />
            <figcaption className="border-t border-line px-5 py-4">
              <p className="font-display text-2xl text-on-hero">{publicName}</p>
              <p className="mt-1 text-sm text-accent-2">{personalInfo.title}</p>
              <p className="mt-1 text-xs text-on-hero-muted">{personalInfo.barRegistration}</p>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}

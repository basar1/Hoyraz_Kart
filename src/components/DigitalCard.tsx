"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { Download, Globe, MapPin, Phone } from "lucide-react";
import { LegalNotice } from "@/components/LegalNotice";
import { RoundPortrait } from "@/components/Portrait";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "@/components/icons";
import { companyConfig, type Employee } from "@/data/companyConfig";
import { downloadVCard } from "@/utils/vcard";
import { telHref, whatsappHref } from "@/utils/links";

const actionClass =
  "flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-action px-3 py-4 text-center text-[13px] font-medium leading-tight text-on-hero transition hover:border-accent-2 hover:bg-accent-soft";

export function DigitalCard({ employee }: { employee: Employee }) {
  const { office } = companyConfig;
  const { personalInfo, contact, socials } = employee;
  const socialItems: {
    label: string;
    href?: string;
    Icon: ComponentType<{ className?: string }>;
  }[] = [
    { label: "LinkedIn", href: socials.linkedin, Icon: LinkedInIcon },
    { label: "X", href: socials.x, Icon: XIcon },
    { label: "Instagram", href: socials.instagram, Icon: InstagramIcon },
  ];
  const visibleSocials = socialItems.filter(
    (item): item is { label: string; href: string; Icon: ComponentType<{ className?: string }> } =>
      Boolean(item.href?.trim()),
  );

  return (
    <section
      id="kartvizit"
      className="mx-auto flex min-h-screen w-full max-w-md scroll-mt-24 flex-col px-5 pt-[max(1.75rem,env(safe-area-inset-top))] pb-[max(1.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="relative flex flex-1 flex-col rounded-[28px] border border-line bg-hero-elevated px-6 py-8 shadow-[0_16px_40px_rgba(55,95,137,0.12)]">
        <div className="pointer-events-none absolute inset-2 rounded-[22px] border border-line" />

        <div className="relative flex flex-col items-center text-center">
          <Link href="/" aria-label={office.name}>
            <Image src="/hoyraz-icon.png" alt="" width={115} height={157} className="h-16 w-auto" />
          </Link>

          <div className="mt-6 size-36 rounded-full border-2 border-accent-2 p-1">
            <div className="size-full overflow-hidden rounded-full">
              <RoundPortrait personalInfo={personalInfo} size={144} priority className="size-full" />
            </div>
          </div>

          <h1 className="mt-5 font-display text-[2rem] leading-tight text-on-hero">{personalInfo.fullName}</h1>
          <p className="mt-2 text-sm tracking-wide text-accent-2">{personalInfo.title}</p>
          {personalInfo.barRegistration.trim() ? (
            <p className="mt-2 max-w-xs text-xs leading-5 text-on-hero-muted">{personalInfo.barRegistration}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => downloadVCard(employee.slug)}
          className="relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-4 text-base font-semibold text-on-accent shadow-lg transition hover:bg-accent-hover"
        >
          <Download className="size-5" aria-hidden="true" />
          Rehbere Kaydet (.vcf)
        </button>
        <p className="relative mt-2 text-center text-[11px] text-on-hero-muted">
          iPhone ve Android rehberlerine uygun vCard dosyası.
        </p>

        <div className="relative mt-6 grid grid-cols-2 gap-3">
          <a className={actionClass} href={telHref(contact.phone)}>
            <Phone className="size-5 text-accent-2" aria-hidden="true" />
            Hemen Ara
          </a>
          <a
            className={actionClass}
            href={whatsappHref(contact.whatsapp, contact.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="size-5 text-accent-2" />
            WhatsApp
          </a>
          <a
            className={actionClass}
            href={contact.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin className="size-5 text-accent-2" aria-hidden="true" />
            Ofis Yol Tarifi
          </a>
          <Link href="/" className={actionClass}>
            <Globe className="size-5 text-accent-2" aria-hidden="true" />
            Web Sitesine Git
          </Link>
        </div>

        {visibleSocials.length > 0 ? (
          <ul className="relative mt-6 flex items-center justify-center gap-3">
            {visibleSocials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-line text-accent-2 transition hover:border-accent-2 hover:bg-accent-soft"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="relative mt-6">
          <LegalNotice compact />
        </div>
      </div>
    </section>
  );
}

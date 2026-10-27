"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, Mail, Menu, Phone, X } from "lucide-react";
import { companyConfig, type Employee } from "@/data/companyConfig";
import { formatPhone } from "@/utils/format";
import { mailHref, telHref } from "@/utils/links";

function navigation(employee?: Employee) {
  if (!employee) {
    return [
      { href: "/", label: "Kurumsal" },
      { href: "/#calisma-alanlari", label: "Hizmetler" },
      { href: "/#ekip", label: "Ekip" },
      { href: "/makaleler", label: "Yayınlar" },
    ];
  }

  const base = `/${employee.slug}`;
  return [
    { href: `${base}#hakkimizda`, label: "Hakkımızda" },
    { href: `${base}#calisma-alanlari`, label: "Çalışma Alanları" },
    { href: "/makaleler", label: "Yayınlar" },
    { href: `${base}#iletisim`, label: "İletişim" },
  ];
}

export function SiteHeader({ employee }: { employee?: Employee }) {
  const [open, setOpen] = useState(false);
  const { office } = companyConfig;
  const links = navigation(employee);
  const cardHref = employee ? `/${employee.slug}#kartvizit` : "/kart";
  const contactHref = employee ? `/${employee.slug}#iletisim` : "/#ekip";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header>
      <div className="bg-topbar text-on-topbar">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2 text-[11px] tracking-wide sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:text-xs">
          <p>{employee ? employee.personalInfo.barRegistration : office.city}</p>
          {employee ? (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-topbar-accent" aria-hidden="true" />
                {employee.contact.workingHours}
              </span>
              <a
                className="inline-flex items-center gap-1.5 hover:text-topbar-accent"
                href={telHref(employee.contact.phone)}
              >
                <Phone className="size-3.5 text-topbar-accent" aria-hidden="true" />
                {formatPhone(employee.contact.phone)}
              </a>
              <a
                className="inline-flex items-center gap-1.5 hover:text-topbar-accent"
                href={mailHref(employee.contact.email)}
              >
                <Mail className="size-3.5 text-topbar-accent" aria-hidden="true" />
                {employee.contact.email}
              </a>
            </div>
          ) : (
            <p>{office.statement}</p>
          )}
        </div>
      </div>

      <div className="sticky top-0 z-40 border-b border-line bg-header backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
            <Image
              src="/hoyraz-logo.png"
              alt={office.name}
              width={240}
              height={82}
              priority
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Ana menü">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-soft transition hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href={cardHref}
              className="rounded-full border border-accent-2 px-4 py-2 text-sm font-medium text-ink transition hover:bg-accent-soft"
            >
              Dijital Kartvizit
            </Link>
            <Link
              href={contactHref}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
            >
              {employee ? "Randevu / İletişim" : "Ekip"}
            </Link>
          </div>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobil-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? "Menüyü kapat" : "Menüyü aç"}</span>
          </button>
        </div>

        {open ? (
          <nav id="mobil-menu" className="border-t border-line bg-canvas px-4 py-4 lg:hidden" aria-label="Mobil menü">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-base text-ink hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={cardHref}
                className="mt-2 rounded-full border border-accent-2 px-4 py-3 text-center text-sm font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                Dijital Kartvizit
              </Link>
              <Link
                href={contactHref}
                className="rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-on-accent"
                onClick={() => setOpen(false)}
              >
                {employee ? "Randevu / İletişim" : "Ekip"}
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

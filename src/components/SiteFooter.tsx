import Image from "next/image";
import Link from "next/link";
import { LegalNotice } from "@/components/LegalNotice";
import { companyConfig, type Employee } from "@/data/companyConfig";
import { formatPhone, lawyerPublicName } from "@/utils/format";
import { mailHref, telHref } from "@/utils/links";

function quickLinks(employee?: Employee) {
  if (!employee) {
    return [
      { href: "/", label: "Kurumsal" },
      { href: "/#ekip", label: "Ekip" },
      { href: "/makaleler", label: "Yayınlar" },
      { href: "/kart", label: "Dijital Kartvizit" },
    ];
  }

  const base = `/${employee.slug}`;
  return [
    { href: `${base}#hakkimizda`, label: "Hakkımızda" },
    { href: `${base}#calisma-alanlari`, label: "Çalışma Alanları" },
    { href: "/makaleler", label: "Yayınlar" },
    { href: `${base}#iletisim`, label: "İletişim" },
    { href: `${base}#kartvizit`, label: "Dijital Kartvizit" },
  ];
}

export function SiteFooter({ employee }: { employee?: Employee }) {
  const { office, employees } = companyConfig;
  const year = new Date().getFullYear();
  const socialItems = [
    { label: "LinkedIn", href: employee?.socials.linkedin },
    { label: "X", href: employee?.socials.x },
    { label: "Instagram", href: employee?.socials.instagram },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href?.trim()));

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_0.8fr_1fr]">
        <div>
          <Image src="/hoyraz-logo.png" alt={office.name} width={240} height={82} className="h-12 w-auto" />
          {employee ? (
            <>
              <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
                {lawyerPublicName(employee.personalInfo.namePrefix, employee.personalInfo.fullName)} ·{" "}
                {employee.personalInfo.title}
              </p>
              <p className="mt-2 text-sm text-muted">{employee.personalInfo.barRegistration}</p>
            </>
          ) : (
            <p className="mt-3 max-w-sm text-sm leading-7 text-muted">{office.intro}</p>
          )}
          {socialItems.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {socialItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-accent-2 underline-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">Hızlı bağlantılar</p>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks(employee).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-soft hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">İletişim</p>
          {employee ? (
            <ul className="mt-4 space-y-2 text-sm leading-6 text-ink-soft">
              <li>{employee.contact.address}</li>
              <li>
                <a href={telHref(employee.contact.phone)} className="hover:text-ink">
                  {formatPhone(employee.contact.phone)}
                </a>
              </li>
              {employee.contact.email.trim() ? (
                <li>
                  <a href={mailHref(employee.contact.email)} className="hover:text-ink">
                    {employee.contact.email}
                  </a>
                </li>
              ) : null}
              <li>{employee.contact.workingHours}</li>
            </ul>
          ) : (
            <ul className="mt-4 space-y-4 text-sm leading-6 text-ink-soft">
              {employees.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`} className="font-medium text-ink hover:text-ink-soft">
                    {item.personalInfo.fullName}
                  </Link>
                  <span className="block text-muted">{item.personalInfo.title}</span>
                  <a href={telHref(item.contact.phone)} className="hover:text-ink">
                    {formatPhone(item.contact.phone)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        <LegalNotice />
        <p className="mt-6 text-xs text-muted">
          © {year} {office.name}. Bilgilendirme amaçlı kurumsal yayın.
        </p>
      </div>
    </footer>
  );
}

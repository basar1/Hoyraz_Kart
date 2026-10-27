import type { Employee } from "@/data/companyConfig";

function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\n|\r/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return phone.trim().startsWith("+") ? `+${digits}` : digits;
}

function pushLine(lines: string[], value: string | null): void {
  if (value) lines.push(value);
}

export function buildVCard(employee: Employee, officeName: string, website: string): string {
  const { personalInfo, contact } = employee;
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  pushLine(
    lines,
    `N;CHARSET=UTF-8:${escapeVCardValue(personalInfo.lastName)};${escapeVCardValue(personalInfo.firstName)};;${escapeVCardValue(personalInfo.namePrefix)};`,
  );
  pushLine(lines, `FN;CHARSET=UTF-8:${escapeVCardValue(personalInfo.fullName)}`);
  pushLine(lines, `ORG;CHARSET=UTF-8:${escapeVCardValue(officeName)}`);
  pushLine(lines, `TITLE;CHARSET=UTF-8:${escapeVCardValue(personalInfo.title)}`);
  pushLine(lines, `TEL;TYPE=CELL,VOICE:${normalizePhone(contact.phone)}`);
  pushLine(lines, `EMAIL;TYPE=INTERNET:${contact.email.trim()}`);
  pushLine(lines, website ? `URL:${website}` : null);
  pushLine(lines, `ADR;CHARSET=UTF-8;TYPE=WORK:;;${escapeVCardValue(contact.address)};;;;`);
  lines.push("END:VCARD");

  return `${lines.join("\r\n")}\r\n`;
}

/**
 * Telefonda Kişiler uygulaması yalnızca gerçek bir .vcf adresini açar.
 * Safari, script ile açılan data: ve blob: indirmelerini yok sayar.
 */
export function vcardHref(slug: string): string {
  return `/${slug}.vcf`;
}

export function downloadVCard(slug: string): void {
  if (typeof window === "undefined") return;
  window.location.assign(vcardHref(slug));
}

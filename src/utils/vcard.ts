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
  pushLine(lines, contact.email.trim() ? `EMAIL;TYPE=INTERNET:${contact.email.trim()}` : null);
  pushLine(lines, website ? `URL:${website}` : null);
  pushLine(lines, `ADR;CHARSET=UTF-8;TYPE=WORK:;;${escapeVCardValue(contact.address)};;;;`);
  lines.push("END:VCARD");

  return `\uFEFF${lines.join("\r\n")}\r\n`;
}

export function downloadVCard(employee: Employee, officeName: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const website = employee.contact.website.trim() || window.location.origin;
  const vCardData = buildVCard(employee, officeName, website);
  const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${employee.slug}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

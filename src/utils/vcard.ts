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

function vcardFileName(fullName: string): string {
  const ascii = fullName
    .replace(/ç/g, "c")
    .replace(/Ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "u")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${ascii || "kartvizit"}.vcf`;
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
  pushLine(lines, `TEL;TYPE=CELL:${normalizePhone(contact.phone)}`);
  pushLine(lines, contact.email.trim() ? `EMAIL;TYPE=INTERNET:${contact.email.trim()}` : null);
  pushLine(lines, website ? `URL:${website}` : null);
  pushLine(lines, `ADR;CHARSET=UTF-8;TYPE=WORK:;;${escapeVCardValue(contact.address)};;;;`);
  lines.push("END:VCARD");

  return `\uFEFF${lines.join("\r\n")}\r\n`;
}

function isIosDevice(): boolean {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  // iPadOS 13+ Safari, userAgent içinde Macintosh yazar.
  return /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
}

function triggerDownload(content: string, fileName: string): void {
  const blob = new Blob([content], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Sayfa adresini .vcf dosyasına çevirme. Safari bu dosyayı sayfa sanıp açmıyor.
 * iPhone’da Kişiler, tıklamayla üretilen vCard ile açılır.
 */
export function downloadVCard(employee: Employee, officeName: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const website = employee.contact.website.trim() || window.location.origin;
  const content = buildVCard(employee, officeName, website);

  if (isIosDevice()) {
    const vcardText = content.replace(/^\uFEFF/, "");
    window.location.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardText)}`;
    return;
  }

  triggerDownload(content, vcardFileName(employee.personalInfo.fullName));
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length === 12) {
    return `+90 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
  }
  return phone.trim();
}

export function lawyerPublicName(prefix: string, fullName: string): string {
  return [prefix.trim(), fullName.trim()].filter(Boolean).join(" ");
}

const SKIPPED_INITIAL_WORDS = new Set(["ve", "ile", "and"]);

export function officeInitials(name: string): string {
  const words = name
    .split(/\s+/)
    .map((word) => word.replace(/[^0-9A-Za-zÇĞİÖŞÜçğıöşü]/g, ""))
    .filter(
      (word) =>
        word.length > 1 && !SKIPPED_INITIAL_WORDS.has(word.toLocaleLowerCase("tr-TR")),
    );

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toLocaleUpperCase("tr-TR") ?? "")
    .join("");
}

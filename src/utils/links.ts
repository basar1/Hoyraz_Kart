export function telHref(phone: string): string {
  const compact = phone.replace(/[^\d+]/g, "");
  return `tel:${compact}`;
}

export function mailHref(email: string, subject?: string): string {
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappHref(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppIcon } from "@/components/icons";
import { companyConfig, type Employee } from "@/data/companyConfig";
import { formatPhone } from "@/utils/format";
import { mailHref, telHref, whatsappHref } from "@/utils/links";

export function ContactSection({ employee }: { employee: Employee }) {
  const { office } = companyConfig;
  const { contact } = employee;

  return (
    <section id="iletisim" className="scroll-mt-24 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          eyebrow="İletişim ve konum"
          title="Ön görüşme ve ofis"
          description="Telefon, e-posta veya WhatsApp üzerinden ulaşabilirsiniz. Randevu, ilettiğiniz konunun niteliğine göre planlanır."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-5">
            <ul className="space-y-4 text-sm leading-7 text-ink-soft">
              <li className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-accent-2" aria-hidden="true" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-1 size-4 shrink-0 text-accent-2" aria-hidden="true" />
                <a href={telHref(contact.phone)} className="hover:text-ink">
                  {formatPhone(contact.phone)}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1 size-4 shrink-0 text-accent-2" aria-hidden="true" />
                <a href={mailHref(contact.email)} className="hover:text-ink">
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-1 size-4 shrink-0 text-accent-2" aria-hidden="true" />
                <span>{contact.workingHours}</span>
              </li>
            </ul>
            <a
              href={whatsappHref(contact.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent-2 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-accent-soft"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp ile hızlı mesaj
            </a>
          </div>
          <ContactForm slug={employee.slug} />
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-line">
          <iframe
            title={`${office.name} ofis konumu`}
            src={contact.mapsEmbedUrl}
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

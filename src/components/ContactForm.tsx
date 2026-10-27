"use client";

import { FormEvent, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { companyConfig, getEmployee } from "@/data/companyConfig";
import { whatsappHref } from "@/utils/links";

export function ContactForm({ slug }: { slug: string }) {
  const [error, setError] = useState("");
  const employee = getEmployee(slug);
  const { practiceAreas, office } = companyConfig;
  const contact = employee?.contact;

  if (!contact) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2 || message.length < 10) {
      setError("Ad soyad ve en az bir cümlelik mesaj gereklidir.");
      return;
    }

    const text = [
      contact.whatsappMessage,
      "",
      `Ad soyad: ${name}`,
      phone ? `Telefon: ${phone}` : null,
      `Konu: ${subject || "Genel"}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    setError("");
    window.open(whatsappHref(contact.whatsapp, text), "_blank", "noopener,noreferrer");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-surface p-6 sm:p-8" noValidate>
      <h3 className="font-display text-2xl text-ink">Ön görüşme talebi</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        İletiniz {office.name} WhatsApp hattına açılır. Bu sayfa üzerinden bir kayıt tutulmaz.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block text-sm text-ink">
          Ad soyad
          <input
            name="name"
            autoComplete="name"
            required
            className="mt-1.5 w-full rounded-xl border border-line bg-input px-4 py-3 text-ink outline-none focus:border-accent-2"
          />
        </label>
        <label className="block text-sm text-ink">
          Telefon
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-xl border border-line bg-input px-4 py-3 text-ink outline-none focus:border-accent-2"
          />
        </label>
        <label className="block text-sm text-ink">
          Konu
          <select
            name="subject"
            defaultValue="Genel bilgilendirme"
            className="mt-1.5 w-full rounded-xl border border-line bg-input px-4 py-3 text-ink outline-none focus:border-accent-2"
          >
            <option>Genel bilgilendirme</option>
            {practiceAreas.map((area) => (
              <option key={area.title}>{area.title}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-ink">
          Mesaj
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1.5 w-full resize-y rounded-xl border border-line bg-input px-4 py-3 text-ink outline-none focus:border-accent-2"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-ink" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
      >
        <WhatsAppIcon className="size-4" />
        WhatsApp ile ön görüşme talebi
      </button>
    </form>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
}) {
  const titleClass = tone === "dark" ? "text-on-hero" : "text-ink";
  const bodyClass = tone === "dark" ? "text-on-hero-muted" : "text-muted";

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-2">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl leading-tight sm:text-4xl ${titleClass}`}>{title}</h2>
      {description ? <p className={`mt-4 text-base leading-7 ${bodyClass}`}>{description}</p> : null}
    </div>
  );
}

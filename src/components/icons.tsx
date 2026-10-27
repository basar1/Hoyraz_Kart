import type { ReactNode } from "react";
import {
  Building2,
  HardHat,
  Leaf,
  Ruler,
  Sprout,
  Tractor,
  type LucideIcon,
} from "lucide-react";
import type { PracticeIconName } from "@/data/companyConfig";

const practiceIcons: Record<PracticeIconName, LucideIcon> = {
  Leaf,
  Sprout,
  Tractor,
  Building2,
  HardHat,
  Ruler,
};

export function PracticeIcon({
  name,
  className,
}: {
  name: PracticeIconName;
  className?: string;
}) {
  const Icon = practiceIcons[name];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.5} />;
}

function BrandIcon({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </BrandIcon>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <BrandIcon className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </BrandIcon>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.8L1 23l6.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 20.8a8.7 8.7 0 0 1-4.5-1.2l-.3-.2-3.7.7.7-3.6-.2-.3A8.8 8.8 0 1 1 12 20.8zm5-6.6c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.9 1-.3.2-.6.1a7.2 7.2 0 0 1-2.1-1.3 8 8 0 0 1-1.5-1.8c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.5c-.1-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.4 11.4 0 0 0 4.5 4 3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.3c-.1-.2-.3-.2-.6-.4z" />
    </svg>
  );
}

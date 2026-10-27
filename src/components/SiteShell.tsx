import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Employee } from "@/data/companyConfig";

export function SiteShell({
  children,
  employee,
}: {
  children: ReactNode;
  employee?: Employee;
}) {
  return (
    <>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        İçeriğe geç
      </a>
      <SiteHeader employee={employee} />
      <main id="icerik" className="flex-1">
        {children}
      </main>
      <SiteFooter employee={employee} />
    </>
  );
}

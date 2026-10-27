"use client";

import { useEffect, useId, useRef, useState } from "react";
import { themes } from "@/data/themes";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-4 bottom-4 z-[80] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Tasarım teması"
          className="w-72 rounded-2xl border border-line bg-surface p-3 text-ink shadow-2xl"
        >
          <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-accent-2">
            Tasarım teması
          </p>
          <ul className="space-y-1">
            {themes.map((option) => {
              const selected = option.id === theme;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setTheme(option.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm transition ${
                      selected ? "bg-accent-soft text-ink" : "hover:bg-accent-soft"
                    }`}
                  >
                    <span className="flex shrink-0" aria-hidden="true">
                      <span
                        className="size-5 rounded-full border border-black/10"
                        style={{ backgroundColor: option.swatches[0] }}
                      />
                      <span
                        className="-ml-1.5 size-5 rounded-full border border-black/10"
                        style={{ backgroundColor: option.swatches[1] }}
                      />
                    </span>
                    <span className="min-w-0 flex-1 leading-5">{option.label}</span>
                    <span
                      className={`size-2 shrink-0 rounded-full ${selected ? "bg-accent" : "bg-transparent"}`}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-on-accent shadow-lg transition hover:bg-accent-hover"
      >
        🎨 Tasarım Teması Seç
      </button>
    </div>
  );
}

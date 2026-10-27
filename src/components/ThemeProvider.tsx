"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  THEME_STORAGE_KEY,
  getTheme,
  isThemeId,
  type ThemeId,
} from "@/data/themes";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  allowSwitch: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme yalnızca ThemeProvider içinde kullanılabilir.");
  }
  return value;
}

function applyTheme(theme: ThemeId): void {
  const option = getTheme(theme);
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = option.colorScheme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", option.themeColor);
}

export function ThemeProvider({
  children,
  defaultTheme,
  allowSwitch,
}: {
  children: ReactNode;
  defaultTheme: ThemeId;
  allowSwitch: boolean;
}) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    const next = allowSwitch && isThemeId(current) ? current : defaultTheme;
    setThemeState(next);
    applyTheme(next);
  }, [allowSwitch, defaultTheme]);

  function setTheme(next: ThemeId) {
    setThemeState(next);
    applyTheme(next);
    if (allowSwitch) localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, allowSwitch }}>
      {children}
      {allowSwitch ? <ThemeSwitcher /> : null}
    </ThemeContext.Provider>
  );
}

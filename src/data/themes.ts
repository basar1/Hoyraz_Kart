export const THEME_STORAGE_KEY = "hukuk-theme";

export const themeIds = [
  "obsidian-gold",
  "navy-bronze",
  "emerald-cream",
  "bordeaux-ivory",
  "emerald-white",
  "emerald-dark",
] as const;

export type ThemeId = (typeof themeIds)[number];

export interface ThemeOption {
  id: ThemeId;
  label: string;
  swatches: [string, string];
  themeColor: string;
  colorScheme: "dark" | "light";
  qrFg: string;
  qrBg: string;
}

export const themes: ThemeOption[] = [
  {
    id: "obsidian-gold",
    label: "VIP Siyah & Gold",
    swatches: ["#09090B", "#D4AF37"],
    themeColor: "#09090B",
    colorScheme: "dark",
    qrFg: "#09090B",
    qrBg: "#FFFFFF",
  },
  {
    id: "navy-bronze",
    label: "Klasik Lacivert",
    swatches: ["#0B132B", "#C5A059"],
    themeColor: "#0B132B",
    colorScheme: "dark",
    qrFg: "#0B132B",
    qrBg: "#FFFFFF",
  },
  {
    id: "emerald-cream",
    label: "Kraliyet Yeşili",
    swatches: ["#071F18", "#D4AF37"],
    themeColor: "#071F18",
    colorScheme: "dark",
    qrFg: "#071F18",
    qrBg: "#FFFFFF",
  },
  {
    id: "bordeaux-ivory",
    label: "Ferah Fildişi & Bordo",
    swatches: ["#FAF8F5", "#721C24"],
    themeColor: "#FAF8F5",
    colorScheme: "light",
    qrFg: "#18181B",
    qrBg: "#FFFFFF",
  },
  {
    id: "emerald-white",
    label: "Beyaz & Zümrüt",
    swatches: ["#FFFFFF", "#0C4A3E"],
    themeColor: "#FFFFFF",
    colorScheme: "light",
    qrFg: "#0C4A3E",
    qrBg: "#FFFFFF",
  },
  {
    id: "emerald-dark",
    label: "Beyaz & Lacivert",
    swatches: ["#FFFFFF", "#375F89"],
    themeColor: "#FFFFFF",
    colorScheme: "light",
    qrFg: "#375F89",
    qrBg: "#FFFFFF",
  },
];

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return themeIds.some((themeId) => themeId === value);
}

export function getTheme(id: ThemeId): ThemeOption {
  return themes.find((theme) => theme.id === id) ?? themes[0];
}

export function themeBootScript(defaultTheme: ThemeId, allowSwitch: boolean): string {
  const themeColors = Object.fromEntries(themes.map((theme) => [theme.id, theme.themeColor]));
  const lightThemes = themes.filter((theme) => theme.colorScheme === "light").map((theme) => theme.id);

  return `(()=>{try{var allow=${allowSwitch ? "true" : "false"};var fallback=${JSON.stringify(defaultTheme)};var allowed=${JSON.stringify(themeIds)};var key=${JSON.stringify(THEME_STORAGE_KEY)};var theme=fallback;if(allow){var stored=localStorage.getItem(key);if(allowed.indexOf(stored)!==-1)theme=stored;}var root=document.documentElement;root.setAttribute("data-theme",theme);var light=${JSON.stringify(lightThemes)};root.style.colorScheme=light.indexOf(theme)!==-1?"light":"dark";var colors=${JSON.stringify(themeColors)};var meta=document.querySelector('meta[name="theme-color"]');if(meta&&colors[theme])meta.setAttribute("content",colors[theme]);}catch(e){}})();`;
}

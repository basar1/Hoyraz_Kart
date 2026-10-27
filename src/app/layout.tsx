import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { companyConfig } from "@/data/companyConfig";
import { getTheme, themeBootScript } from "@/data/themes";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: companyConfig.office.name,
    template: `%s | ${companyConfig.office.name}`,
  },
  description: companyConfig.office.intro,
  applicationName: companyConfig.office.name,
  authors: [{ name: companyConfig.office.name }],
};

const activeTheme = getTheme(companyConfig.activeTheme);

export const viewport: Viewport = {
  themeColor: activeTheme.themeColor,
  colorScheme: activeTheme.colorScheme,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      data-theme={companyConfig.activeTheme}
      suppressHydrationWarning
      className={`${playfair.variable} ${jakarta.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html: themeBootScript(companyConfig.activeTheme, companyConfig.showThemeSwitcher),
          }}
        />
        <ThemeProvider
          defaultTheme={companyConfig.activeTheme}
          allowSwitch={companyConfig.showThemeSwitcher}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

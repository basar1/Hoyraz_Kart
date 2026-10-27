import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { companyConfig } from "./src/data/companyConfig";
import { buildVCard } from "./src/utils/vcard";

const publicDirectory = path.join(process.cwd(), "public");

for (const employee of companyConfig.employees) {
  const content = buildVCard(employee, companyConfig.office.name, employee.contact.website.trim());
  fs.writeFileSync(path.join(publicDirectory, `${employee.slug}.vcf`), content);
}

const nextConfig: NextConfig = {
  // Cloudflare Pages üzerinde sunucusuz statik yayın. `npm run build` çıktısı `out/` klasörüdür.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

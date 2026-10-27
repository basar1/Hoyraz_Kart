import type { NextConfig } from "next";

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

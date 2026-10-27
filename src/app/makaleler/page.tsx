import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteShell } from "@/components/SiteShell";
import { companyConfig } from "@/data/companyConfig";

export const metadata: Metadata = {
  title: "Yayınlar",
  description: `${companyConfig.office.name} yayınları.`,
};

export default function ArticlesPage() {
  return (
    <SiteShell>
      <section className="bg-canvas">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Yayınlar"
            title="Yayınlar"
            description="Kurumsal notlar ve duyurular burada listelenir."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {companyConfig.articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

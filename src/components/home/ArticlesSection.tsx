import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { companyConfig } from "@/data/companyConfig";

export function ArticlesSection() {
  const articles = companyConfig.articles.slice(0, 3);

  return (
    <section id="makaleler" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Yayınlar"
            title="Bilgilendirme yazıları"
            description="Yazılar genel çerçeve sunar. Somut bir uyuşmazlık için hukuki tavsiye yerine geçmez."
          />
          <Link
            href="/makaleler"
            className="shrink-0 text-sm font-medium text-ink underline decoration-accent-2 underline-offset-4"
          >
            Tüm makaleler
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

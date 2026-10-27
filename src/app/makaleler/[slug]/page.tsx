import type { Metadata } from "next";
import Link from "next/link";
import NotFound from "@/app/not-found";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard } from "@/components/ArticleCard";
import { LegalNotice } from "@/components/LegalNotice";
import { SiteShell } from "@/components/SiteShell";
import { companyConfig, getArticle, getOtherArticles } from "@/data/companyConfig";
import { formatDate } from "@/utils/format";

export const dynamicParams = false;

export function generateStaticParams() {
  if (companyConfig.articles.length === 0) {
    return [{ slug: "_yok" }];
  }

  return companyConfig.articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Makale" };

  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return <NotFound />;

  const { office } = companyConfig;
  const others = getOtherArticles(article.slug);

  return (
    <SiteShell>
      <article className="bg-canvas">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
          <p className="text-sm text-muted">
            <Link href="/" className="hover:text-ink">
              Ana sayfa
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/makaleler" className="hover:text-ink">
              Yayınlar
            </Link>
          </p>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
            {article.category}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true"> · </span>
            {article.readTime} okuma
          </p>
          <p className="mt-8 border-l-2 border-accent-2 pl-4 text-lg leading-8 text-ink-soft">
            {article.summary}
          </p>

          <div className="mt-10">
            <ArticleBody content={article.content} />
          </div>

          <div className="mt-12">
            <LegalNotice />
          </div>

          <aside className="mt-8 rounded-3xl border border-line bg-surface p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-accent-2">Kurum</p>
            <p className="mt-1 font-display text-2xl text-ink">{office.name}</p>
            <p className="text-sm text-muted">{office.city}</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{office.intro}</p>
            <p className="mt-3 text-sm">
              <Link href="/#ekip" className="font-medium text-ink underline decoration-accent-2 underline-offset-4">
                Dijital kartvizitler
              </Link>
            </p>
          </aside>
        </div>
      </article>

      {others.length > 0 ? (
        <section className="border-t border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="font-display text-3xl text-ink">Diğer yazılar</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {others.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}

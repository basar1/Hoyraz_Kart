import Link from "next/link";
import type { Article } from "@/data/companyConfig";
import { formatDate } from "@/utils/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition hover:border-accent-2">
      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em]">
        <span className="text-accent-2">{article.category}</span>
        <span className="normal-case tracking-normal text-muted">{article.readTime}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-snug text-ink">
        <Link href={`/makaleler/${article.slug}`} className="transition hover:text-ink-soft">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">{article.summary}</p>
      <div className="mt-6 flex items-center justify-between gap-3 text-sm">
        <time dateTime={article.date} className="text-muted">
          {formatDate(article.date)}
        </time>
        <Link
          href={`/makaleler/${article.slug}`}
          className="font-medium text-ink underline decoration-accent-2 underline-offset-4"
        >
          Makaleyi oku
        </Link>
      </div>
    </article>
  );
}

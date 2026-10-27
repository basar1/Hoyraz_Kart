export function ArticleBody({ content }: { content: string }) {
  const blocks = content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5">
      {blocks.map((block, index) =>
        block.startsWith("## ") ? (
          <h2 key={index} className="pt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
            {block.slice(3)}
          </h2>
        ) : (
          <p key={index} className="text-base leading-8 text-ink-soft sm:text-[1.05rem]">
            {block}
          </p>
        ),
      )}
    </div>
  );
}

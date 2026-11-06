import { Clock } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { LazyImage } from "@/components/ui/lazy-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { cycleColor } from "@/lib/palette";
import { posts } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function Insights() {
  return (
    <section
      id="conteudos"
      aria-labelledby="conteudos-title"
      className="scroll-mt-24 bg-ink-50/70 py-24 sm:py-32 dark:bg-ink-900/40"
    >
      <Container>
        <SectionHeading
          id="conteudos-title"
          eyebrow="Conteúdos"
          title="Conhecimento para captar mais e melhor"
          description="Guias práticos sobre editais, leis de incentivo, gestão e prestação de contas."
        />
        <Stagger as="ul" className="mt-16 grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <StaggerItem as="li" key={post.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-100 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0 dark:bg-ink-900 dark:ring-ink-800">
                <LazyImage
                  src={post.image}
                  alt=""
                  width={640}
                  height={400}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[16/9] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
                />
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 text-sm">
                    <span className={cn("rounded-full px-2.5 py-1 font-semibold text-xs", cycleColor(i + 1).soft)}>
                      {post.tag}
                    </span>
                    <time dateTime={post.date} className="text-ink-500">
                      {dateFormat.format(new Date(post.date))}
                    </time>
                  </div>
                  <h3 className="mt-4 font-bold font-display text-ink-950 text-xl leading-snug dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-ink-600 leading-relaxed dark:text-ink-300">{post.excerpt}</p>
                  <p className="mt-6 flex items-center gap-1.5 text-ink-500 text-sm">
                    <Clock className="size-4" aria-hidden /> {post.readingMinutes} min de leitura
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { client } from "@/sanity/lib/client";
import {
  buildNavigationItems,
  type NavigationPage,
} from "@/sanity/lib/content";
import { urlFor } from "@/sanity/lib/image";
import { navigationPagesQuery, postsQuery } from "@/sanity/lib/queries";

type PostListItem = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  mainImage?: { asset?: unknown };
  publishedAt?: string;
};

function postImageUrl(image?: { asset?: unknown }) {
  if (!image?.asset) {
    return undefined;
  }

  return urlFor(image).width(1400).quality(85).url();
}

function formatDate(value?: string) {
  if (!value) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function JournalPage() {
  const [posts, navigationPages] = await Promise.all([
    client.fetch<PostListItem[]>(postsQuery, {}, { cache: "no-store" }),
    client.fetch<NavigationPage[]>(
      navigationPagesQuery,
      {},
      { cache: "no-store" },
    ),
  ]);

  return (
    <main>
      <SiteHeader items={buildNavigationItems(navigationPages)} />

      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="section-kicker">Learning notes</p>
          <h1>Journal</h1>
          <p>
            This is what a real CMS starts to feel like: structured entries,
            reusable listing pages, and detail pages generated from Sanity
            documents instead of hard-coded sections.
          </p>
        </div>
      </section>

      <section className="post-grid" aria-label="Journal entries">
        {posts.map((post) => {
          const imageUrl = postImageUrl(post.mainImage);

          return (
            <article className="post-card" key={post._id}>
              <Link href={`/journal/${post.slug || ""}`}>
                <div className="post-card-media">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.title || ""}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="post-card-copy">
                  <p className="post-meta">{formatDate(post.publishedAt)}</p>
                  <h2>{post.title}</h2>
                  <p>{post.summary}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}

import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { client } from "@/sanity/lib/client";
import {
  buildNavigationItems,
  type NavigationPage,
} from "@/sanity/lib/content";
import { urlFor } from "@/sanity/lib/image";
import { navigationPagesQuery, postBySlugQuery } from "@/sanity/lib/queries";

type PortableTextSpan = {
  _type?: "span";
  text?: string;
};

type PortableTextBlock = {
  _key?: string;
  _type?: "block";
  children?: PortableTextSpan[];
};

type PostDetail = {
  title?: string;
  slug?: string;
  summary?: string;
  mainImage?: { asset?: unknown };
  publishedAt?: string;
  body?: PortableTextBlock[];
};

type PostRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

function postImageUrl(image?: { asset?: unknown }) {
  if (!image?.asset) {
    return undefined;
  }

  return urlFor(image).width(1800).quality(85).url();
}

function blockText(block?: PortableTextBlock) {
  return (
    block?.children
      ?.map((child) => child.text || "")
      .join("")
      .trim() || ""
  );
}

export async function generateMetadata({
  params,
}: PostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<PostDetail | null>(
    postBySlugQuery,
    { slug },
    { cache: "no-store" },
  );

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function JournalDetailPage({ params }: PostRouteProps) {
  const { slug } = await params;
  const [post, navigationPages] = await Promise.all([
    client.fetch<PostDetail | null>(
      postBySlugQuery,
      { slug },
      { cache: "no-store" },
    ),
    client.fetch<NavigationPage[]>(
      navigationPagesQuery,
      {},
      { cache: "no-store" },
    ),
  ]);

  if (!post) {
    notFound();
  }

  const imageUrl = postImageUrl(post.mainImage);

  return (
    <main>
      <SiteHeader items={buildNavigationItems(navigationPages)} />

      <article className="article-shell">
        <header className="article-header">
          <p className="section-kicker">Learning note</p>
          <h1>{post.title}</h1>
          <p className="article-meta">{formatDate(post.publishedAt)}</p>
          {post.summary ? <p className="article-summary">{post.summary}</p> : null}
        </header>

        {imageUrl ? (
          <div className="article-image">
            <Image src={imageUrl} alt={post.title || ""} fill sizes="100vw" />
          </div>
        ) : null}

        <div className="article-body">
          {post.body?.map((block) => {
            const text = blockText(block);

            if (!text) {
              return null;
            }

            return <p key={block._key || text}>{text}</p>;
          })}
        </div>
      </article>
    </main>
  );
}

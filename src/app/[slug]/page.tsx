import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageSections } from "@/components/cms/page-sections";
import { SiteHeader } from "@/components/site-header";
import { client } from "@/sanity/lib/client";
import {
  buildNavigationItems,
  normalizeSections,
  type CmsPage,
  type NavigationPage,
} from "@/sanity/lib/content";
import { navigationPagesQuery, pageBySlugQuery } from "@/sanity/lib/queries";

type PageRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPage(slug: string) {
  const [page, navigationPages] = await Promise.all([
    client.fetch<CmsPage | null>(
      pageBySlugQuery,
      { slug },
      { cache: "no-store" },
    ),
    client.fetch<NavigationPage[]>(
      navigationPagesQuery,
      {},
      { cache: "no-store" },
    ),
  ]);

  return { page, navigationPages };
}

export async function generateMetadata({
  params,
}: PageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await client.fetch<CmsPage | null>(
    pageBySlugQuery,
    { slug },
    { cache: "no-store" },
  );

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.excerpt,
  };
}

export default async function CmsPageRoute({ params }: PageRouteProps) {
  const { slug } = await params;
  const { page, navigationPages } = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <SiteHeader items={buildNavigationItems(navigationPages)} />
      <PageSections sections={normalizeSections(page)} />
    </main>
  );
}

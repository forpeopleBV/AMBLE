import { client } from "@/sanity/lib/client";
import { PageSections } from "@/components/cms/page-sections";
import { SiteHeader } from "@/components/site-header";
import {
  buildNavigationItems,
  fallbackHomePage,
  normalizeSections,
  type CmsPage,
  type NavigationPage,
} from "@/sanity/lib/content";
import { homePageQuery, navigationPagesQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const [homePage, navigationPages] = await Promise.all([
    client.fetch<CmsPage | null>(homePageQuery, {}, { cache: "no-store" }),
    client.fetch<NavigationPage[]>(
      navigationPagesQuery,
      {},
      { cache: "no-store" },
    ),
  ]);

  const content = homePage || fallbackHomePage;
  const sections = normalizeSections(content);
  const navigationItems = buildNavigationItems(navigationPages);

  return (
    <main>
      <SiteHeader items={navigationItems} />
      <PageSections sections={sections} />
    </main>
  );
}

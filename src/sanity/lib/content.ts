import type { PageSection } from "@/components/cms/page-sections";

export type CmsPage = {
  title?: string;
  slug?: string;
  navigationTitle?: string;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections?: PageSection[];
};

export type NavigationPage = {
  title?: string;
  slug?: string;
};

export const fallbackHomePage: CmsPage = {
  title: "Amble",
  excerpt:
    "A visual lab for Next.js, Sanity CMS, Vercel, GitHub, data sources, and analytics.",
  sections: [
    {
      _type: "heroSection",
      _key: "hero",
      kicker: "Research and development website",
      title: "Learn Sanity by building a real publishing system.",
      body: "A visual lab for Next.js, Sanity CMS, Vercel, GitHub, data sources, and analytics. Every section is made to become a lesson.",
      videoUrl:
        "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85",
      imageAlt: "Laptop screen with code and research notes",
    },
    {
      _type: "twoColumnSection",
      _key: "current-focus",
      kicker: "Current focus",
      title:
        "Create a website that feels editorial, full-screen, and flexible enough for CMS-driven stories.",
      body: "Use Sanity as the control room for reusable pages, sections, posts, and future publishing workflows.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Editorial planning table",
    },
    {
      _type: "textSection",
      _key: "cms-model",
      kicker: "Real CMS direction",
      title: "Pages, modules, and editorial flow live in the Studio now.",
      body: "The next step is to create page documents in Sanity, build them with reusable sections, and let the front end simply render what the CMS describes. That is the difference between a site with a CMS and a site driven by a CMS.",
    },
  ],
};

export function normalizeSections(page?: CmsPage | null): PageSection[] {
  if (page?.sections?.length) {
    return page.sections;
  }

  return fallbackHomePage.sections || [];
}

export function buildNavigationItems(pages: NavigationPage[]) {
  const items = [{ title: "Home", href: "/" }];

  for (const page of pages) {
    if (!page.slug || ["home", "journal", "studio"].includes(page.slug)) {
      continue;
    }

    items.push({
      title: page.title || page.slug,
      href: `/${page.slug}`,
    });
  }

  items.push({ title: "Journal", href: "/journal" });

  return items;
}

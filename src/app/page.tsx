import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { homePageQuery } from "@/sanity/lib/queries";

const menuItems = ["Vision", "Sanity", "Research", "Journal"];

type HeroSection = {
  _key?: string;
  _type: "heroSection";
  kicker?: string;
  title?: string;
  body?: string;
  videoUrl?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
};

type TwoColumnSection = {
  _key?: string;
  _type: "twoColumnSection" | "splitSection" | "largeImageSection";
  kicker?: string;
  title?: string;
  body?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
  reverse?: boolean;
};

type PageSection = HeroSection | TwoColumnSection;

type HomePage = {
  heroKicker?: string;
  heroTitle?: string;
  heroText?: string;
  heroVideoUrl?: string;
  heroPoster?: SanityImageSource | string;
  introKicker?: string;
  introTitle?: string;
  sections?: PageSection[];
  splitSections?: Omit<TwoColumnSection, "_type">[];
  featureImage?: SanityImageSource | string;
  featureKicker?: string;
  featureTitle?: string;
  featureText?: string;
};

const fallbackHomePage: HomePage = {
  heroKicker: "Research and development website",
  heroTitle: "Learn Sanity by building a real publishing system.",
  heroText:
    "A visual lab for Next.js, Sanity CMS, Vercel, GitHub, data sources, and analytics. Every section is made to become a lesson.",
  heroVideoUrl:
    "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85",
  introKicker: "Current focus",
  introTitle:
    "Create a website that feels editorial, full-screen, and flexible enough for CMS-driven stories.",
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
      body: "Use this section as a focused bridge between the hero and the deeper content modules.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Editorial planning table",
    },
    {
      _type: "twoColumnSection",
      _key: "sanity-cms",
      kicker: "01 / Sanity CMS",
      title: "A living content studio for every lesson we build.",
      body: "This space will document schemas, page experiments, and the small decisions that make a CMS project easier to understand. The goal is to learn the tool by publishing with it.",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Abstract architectural structure with clean geometric lines",
    },
    {
      _type: "twoColumnSection",
      _key: "development",
      kicker: "02 / Development",
      title: "From research notes to working Next.js pages.",
      body: "Each section can become a pattern for future work: a content type, a data source, an analytics event, or a deployable feature on Vercel.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Modern workspace with computers and research materials",
      reverse: true,
    },
    {
      _type: "twoColumnSection",
      _key: "content-models",
      kicker: "03 / Content models",
      title: "Shape every page from reusable editorial blocks.",
      body: "Add, reorder, and refine sections directly from the CMS instead of hard-coding every new page idea.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Editorial workspace with planning materials",
    },
    {
      _type: "twoColumnSection",
      _key: "large-image-pattern",
      kicker: "04 / Big image pattern",
      title: "One image can take the full two-column space.",
      body: "Smaller text blocks can sit in opposite corners for observations, captions, project notes, or Sanity-powered annotations.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
      imageAlt: "Wide natural landscape",
      reverse: true,
    },
    {
      _type: "twoColumnSection",
      _key: "publishing-flow",
      kicker: "05 / Publishing flow",
      title: "Move from draft to published pages with a clear content rhythm.",
      body: "Use the Studio as the place where ideas become structured content, ready for the front end to display.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Creative team planning content on a table",
      reverse: true,
    },
    {
      _type: "twoColumnSection",
      _key: "visual-system",
      kicker: "06 / Visual system",
      title: "Large images create breathing room between dense content sections.",
      body: "Use this module for atmosphere, chapter breaks, campaign visuals, or full-width CMS-led storytelling.",
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1800&q=85",
      imageAlt: "Wide forest landscape with soft light",
    },
  ],
  featureImage:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
  featureKicker: "Big image pattern",
  featureTitle: "One image can take the full two-column space.",
  featureText:
    "Smaller text blocks can sit in opposite corners for observations, captions, project notes, or Sanity-powered annotations.",
};

function imageSource(source?: SanityImageSource | string) {
  if (!source) {
    return undefined;
  }

  if (typeof source === "string") {
    return source;
  }

  if (typeof source !== "object" || !("asset" in source) || !source.asset) {
    return undefined;
  }

  return urlFor(source).width(1800).quality(85).url();
}

function legacySections(content: HomePage): PageSection[] {
  const heroSection: HeroSection = {
    _type: "heroSection",
    _key: "legacy-hero",
    kicker: content.heroKicker,
    title: content.heroTitle,
    body: content.heroText,
    videoUrl: content.heroVideoUrl,
    image: content.heroPoster,
  };

  const introSection: TwoColumnSection =
    content.introKicker || content.introTitle
      ? {
          _type: "twoColumnSection",
          _key: "legacy-intro",
          kicker: content.introKicker,
          title: content.introTitle,
          body: "Use this section as a focused bridge between the hero and the deeper content modules.",
        }
      : {
          _type: "twoColumnSection",
          _key: "legacy-intro",
        };

  const splitSections = content.splitSections?.length
    ? content.splitSections.map((section, index) => ({
        ...section,
        _type: "twoColumnSection" as const,
        _key: section._key || `legacy-split-${index}`,
      }))
    : [];

  const featureImageSection: TwoColumnSection[] =
    content.featureImage ||
    content.featureKicker ||
    content.featureTitle ||
    content.featureText
      ? [
          {
            _type: "twoColumnSection" as const,
            _key: "legacy-large-image",
            kicker: content.featureKicker,
            title: content.featureTitle,
            body: content.featureText,
            image: content.featureImage,
            reverse: true,
          },
        ]
      : [];

  return [heroSection, introSection, ...splitSections, ...featureImageSection];
}

function normalizeSections(content: HomePage): PageSection[] {
  const sections = content.sections?.length
    ? content.sections
    : legacySections(content);

  const hasHero = sections.some((section) => section._type === "heroSection");

  if (hasHero) {
    return sections;
  }

  return [legacySections(content)[0], ...sections];
}

export default async function Home() {
  const homePage = await client.fetch<HomePage | null>(
    homePageQuery,
    {},
    { cache: "no-store" },
  );

  const content = {
    ...fallbackHomePage,
    ...homePage,
  };

  const sections = normalizeSections(content);

  return (
    <main>
      <header className="site-header" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="CMS Sanity home">
          CMS_SANITY
        </a>
        <nav className="menu" aria-label="Site menu">
          {menuItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      {sections.map((section, index) => {
        if (section._type === "heroSection") {
          const sectionImage = imageSource(section.image);

          return (
            <section
              id={index === 0 ? "top" : undefined}
              className="hero"
              aria-label={section.title || "Hero section"}
              key={section._key || `${section.title}-${index}`}
            >
              {section.videoUrl ? (
                <video
                  className="hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={sectionImage}
                >
                  <source src={section.videoUrl} type="video/mp4" />
                </video>
              ) : sectionImage ? (
                <Image
                  className="hero-video"
                  src={sectionImage}
                  alt={section.imageAlt || ""}
                  fill
                  sizes="100vw"
                />
              ) : null}
              <div className="hero-overlay" />
              <div className="hero-content">
                <p className="section-kicker">{section.kicker}</p>
                <h1>{section.title}</h1>
                <p>{section.body}</p>
              </div>
            </section>
          );
        }

        const sectionImage = imageSource(section.image);

        return (
          <section
            id={
              index === 0
                ? "top"
                : index === 1
                  ? "vision"
                  : index === 2
                    ? "sanity"
                    : "research"
            }
            className={`split-section ${section.reverse ? "is-reversed" : ""}`}
            key={`${section.title}-${index}`}
          >
            <div className="split-media">
              {sectionImage ? (
                <Image
                  src={sectionImage}
                  alt={section.imageAlt || ""}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              ) : null}
            </div>
            <div className="split-copy">
              <p className="section-kicker">{section.kicker}</p>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          </section>
        );
      })}
    </main>
  );
}

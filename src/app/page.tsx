import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { homePageQuery } from "@/sanity/lib/queries";

const menuItems = ["Vision", "Sanity", "Research", "Journal"];

type SplitSection = {
  _key?: string;
  _type: "splitSection";
  kicker?: string;
  title?: string;
  body?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
  reverse?: boolean;
};

type LargeImageSection = {
  _key?: string;
  _type: "largeImageSection";
  kicker?: string;
  title?: string;
  body?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
};

type PageSection = SplitSection | LargeImageSection;

type HomePage = {
  heroKicker?: string;
  heroTitle?: string;
  heroText?: string;
  heroVideoUrl?: string;
  heroPoster?: SanityImageSource | string;
  introKicker?: string;
  introTitle?: string;
  sections?: PageSection[];
  splitSections?: Omit<SplitSection, "_type">[];
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
      _type: "splitSection",
      _key: "sanity-cms",
      kicker: "01 / Sanity CMS",
      title: "A living content studio for every lesson we build.",
      body: "This space will document schemas, page experiments, and the small decisions that make a CMS project easier to understand. The goal is to learn the tool by publishing with it.",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Abstract architectural structure with clean geometric lines",
    },
    {
      _type: "splitSection",
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
      _type: "splitSection",
      _key: "content-models",
      kicker: "03 / Content models",
      title: "Shape every page from reusable editorial blocks.",
      body: "Add, reorder, and refine sections directly from the CMS instead of hard-coding every new page idea.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Editorial workspace with planning materials",
    },
    {
      _type: "largeImageSection",
      _key: "large-image-pattern",
      kicker: "04 / Big image pattern",
      title: "One image can take the full two-column space.",
      body: "Smaller text blocks can sit in opposite corners for observations, captions, project notes, or Sanity-powered annotations.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
      imageAlt: "Wide natural landscape",
    },
    {
      _type: "splitSection",
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
      _type: "largeImageSection",
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
  const splitSections = content.splitSections?.length
    ? content.splitSections.map((section, index) => ({
        ...section,
        _type: "splitSection" as const,
        _key: section._key || `legacy-split-${index}`,
      }))
    : [];

  const featureImageSection =
    content.featureImage ||
    content.featureKicker ||
    content.featureTitle ||
    content.featureText
      ? [
          {
            _type: "largeImageSection" as const,
            _key: "legacy-large-image",
            kicker: content.featureKicker,
            title: content.featureTitle,
            body: content.featureText,
            image: content.featureImage,
          },
        ]
      : [];

  return [...splitSections, ...featureImageSection];
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

  const heroPoster = imageSource(content.heroPoster);
  const sections = homePage?.sections?.length
    ? homePage.sections
    : legacySections(homePage || fallbackHomePage);

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

      <section id="top" className="hero" aria-label="Research and development intro">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
        >
          <source src={content.heroVideoUrl} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="section-kicker">{content.heroKicker}</p>
          <h1>{content.heroTitle}</h1>
          <p>{content.heroText}</p>
        </div>
      </section>

      <section id="vision" className="intro-strip">
        <p>{content.introKicker}</p>
        <h2>{content.introTitle}</h2>
      </section>

      {sections.map((section, index) => {
        if (section._type === "largeImageSection") {
          const sectionImage = imageSource(section.image);

          return (
            <section
              id={index === sections.length - 1 ? "journal" : undefined}
              className="feature-image"
              key={section._key || `${section.title}-${index}`}
            >
              {sectionImage ? (
                <Image
                  src={sectionImage}
                  alt={section.imageAlt || ""}
                  fill
                  sizes="100vw"
                />
              ) : null}
              <div className="corner-note top-left">
                <p className="section-kicker">{section.kicker}</p>
                <h2>{section.title}</h2>
              </div>
              <div className="corner-note bottom-right">
                <p>{section.body}</p>
              </div>
            </section>
          );
        }

        const sectionImage = imageSource(section.image);

        return (
          <section
            id={index === 0 ? "sanity" : "research"}
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

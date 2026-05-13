import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { homePageQuery } from "@/sanity/lib/queries";

const menuItems = ["Vision", "Sanity", "Research", "Journal"];

type SplitSection = {
  kicker?: string;
  title?: string;
  body?: string;
  image?: SanityImageSource;
  imageAlt?: string;
  reverse?: boolean;
};

type HomePage = {
  heroKicker?: string;
  heroTitle?: string;
  heroText?: string;
  heroVideoUrl?: string;
  heroPoster?: SanityImageSource;
  introKicker?: string;
  introTitle?: string;
  splitSections?: SplitSection[];
  featureImage?: SanityImageSource;
  featureKicker?: string;
  featureTitle?: string;
  featureText?: string;
};

const fallbackHomePage = {
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
  splitSections: [
    {
      kicker: "01 / Sanity CMS",
      title: "A living content studio for every lesson we build.",
      body: "This space will document schemas, page experiments, and the small decisions that make a CMS project easier to understand. The goal is to learn the tool by publishing with it.",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Abstract architectural structure with clean geometric lines",
    },
    {
      kicker: "02 / Development",
      title: "From research notes to working Next.js pages.",
      body: "Each section can become a pattern for future work: a content type, a data source, an analytics event, or a deployable feature on Vercel.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
      imageAlt: "Modern workspace with computers and research materials",
      reverse: true,
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

  return urlFor(source).width(1800).quality(85).url();
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
    splitSections:
      homePage?.splitSections?.length ? homePage.splitSections : fallbackHomePage.splitSections,
  };

  const heroPoster = imageSource(content.heroPoster);
  const featureImage = imageSource(content.featureImage);

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

      {content.splitSections.map((section, index) => {
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

      <section id="journal" className="feature-image">
        {featureImage ? (
          <Image
            src={featureImage}
            alt=""
            fill
            sizes="100vw"
          />
        ) : null}
        <div className="corner-note top-left">
          <p className="section-kicker">{content.featureKicker}</p>
          <h2>{content.featureTitle}</h2>
        </div>
        <div className="corner-note bottom-right">
          <p>{content.featureText}</p>
        </div>
      </section>
    </main>
  );
}

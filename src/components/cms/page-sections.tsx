import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

export type HeroSection = {
  _key?: string;
  _type: "heroSection";
  kicker?: string;
  title?: string;
  body?: string;
  videoUrl?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
};

export type TwoColumnSection = {
  _key?: string;
  _type: "twoColumnSection";
  kicker?: string;
  title?: string;
  body?: string;
  image?: SanityImageSource | string;
  imageAlt?: string;
  reverse?: boolean;
};

export type TextSection = {
  _key?: string;
  _type: "textSection";
  kicker?: string;
  title?: string;
  body?: string;
};

export type PageSection = HeroSection | TwoColumnSection | TextSection;

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

export function PageSections({ sections }: { sections: PageSection[] }) {
  return sections.map((section, index) => {
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

    if (section._type === "textSection") {
      return (
        <section
          className="text-section"
          aria-label={section.title || "Text section"}
          key={section._key || `${section.title}-${index}`}
        >
          <div className="text-section-inner">
            <p className="section-kicker">{section.kicker}</p>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
        </section>
      );
    }

    const sectionImage = imageSource(section.image);

    return (
      <section
        className={`split-section ${section.reverse ? "is-reversed" : ""}`}
        aria-label={section.title || "Two-column section"}
        key={section._key || `${section.title}-${index}`}
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
  });
}

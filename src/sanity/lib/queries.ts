export const homePageQuery = `*[_type == "homePage"][0]{
  title,
  navigationTitle,
  seoTitle,
  seoDescription,
  heroKicker,
  heroTitle,
  heroText,
  heroVideoUrl,
  heroPoster,
  introKicker,
  introTitle,
  sections[]{
    _key,
    _type,
    kicker,
    title,
    body,
    videoUrl,
    image,
    imageAlt,
    reverse
  },
  splitSections[]{
    kicker,
    title,
    body,
    image,
    imageAlt,
    reverse
  },
  featureImage,
  featureKicker,
  featureTitle,
  featureText
}`;

export const navigationPagesQuery = `*[_type == "page" && showInNavigation == true]|order(title asc){
  "title": coalesce(navigationTitle, title),
  "slug": slug.current
}`;

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  navigationTitle,
  excerpt,
  seoTitle,
  seoDescription,
  sections[]{
    _key,
    _type,
    kicker,
    title,
    body,
    videoUrl,
    image,
    imageAlt,
    reverse
  }
}`;

export const postsQuery = `*[_type == "post"]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  mainImage,
  publishedAt
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  summary,
  mainImage,
  publishedAt,
  body
}`;

import Link from "next/link";

export type NavigationItem = {
  title: string;
  href: string;
};

export function SiteHeader({ items }: { items: NavigationItem[] }) {
  return (
    <header className="site-header" aria-label="Main navigation">
      <Link className="brand" href="/" aria-label="Amble home">
        AMBLE
      </Link>
      <nav className="menu" aria-label="Site menu">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}

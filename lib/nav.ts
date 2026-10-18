import { aboutSections } from "@/lib/about";
import { services } from "@/lib/services";

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

// A page's subsections become a dropdown only when there is more than one.
function subsections(
  base: string,
  items: { slug: string; title: string }[],
): NavLink[] | undefined {
  if (items.length < 2) return undefined;
  return items.map((item) => ({
    label: item.title,
    href: `${base}#${item.slug}`,
  }));
}

export const NAV_LINKS: NavLink[] = [
  {
    label: "About",
    href: "/about",
    children: subsections("/about", aboutSections),
  },
  {
    label: "Services",
    href: "/services",
    children: subsections("/services", services),
  },
  { label: "Contact", href: "/#contact" },
];

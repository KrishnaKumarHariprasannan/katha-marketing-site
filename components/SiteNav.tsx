"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

export default function SiteNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Disable page scroll while the hamburger menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close an open dropdown on outside click or Escape
  useEffect(() => {
    if (!openDropdown) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenDropdown(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <div className="site-nav">
      <div className="section-inner">
        <header className="hero__nav">
          <Link href="/" className="hero__logo" aria-label="Katha home">
            <Image
              src="/logo_transparent.png"
              alt=""
              className="hero__logo-mark"
              width={24}
              height={24}
              priority
            />
            <span className="hero__logo-text">KATHA</span>
          </Link>

          <nav className="hero__menu" aria-label="Main" ref={navRef}>
            {NAV_LINKS.map((link) => {
              if (!link.children) {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={current(link.href)}
                  >
                    {link.label}
                  </Link>
                );
              }

              const open = openDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className={`nav-dropdown${open ? " nav-dropdown--open" : ""}`}
                  // Hover only for a real mouse; touch uses the toggle button
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setOpenDropdown(link.label);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") setOpenDropdown(null);
                  }}
                >
                  <Link
                    href={link.href}
                    aria-current={current(link.href)}
                    onClick={() => setOpenDropdown(null)}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    className="nav-dropdown__toggle"
                    aria-label={`${link.label} sections`}
                    aria-expanded={open}
                    onClick={() => setOpenDropdown(open ? null : link.label)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="nav-dropdown__menu">
                    <ul className="nav-dropdown__list">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Mobile burger + panel */}
          <button
            className="hero__burger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="hero-menu-panel"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ☰
          </button>
          <div
            id="hero-menu-panel"
            className="hero__menu-panel"
            role="menu"
            aria-hidden={!menuOpen}
          >
            <button
              className="hero__menu-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="hero__menu-group">
                <Link
                  role="menuitem"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    role="menuitem"
                    className="hero__menu-sub"
                    href={child.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </header>
      </div>
    </div>
  );
}

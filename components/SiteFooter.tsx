import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import { CONTACT_EMAIL } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <div className="hero__logo">
              <Image
                src="/logo_transparent.png"
                alt=""
                className="hero__logo-mark"
                width={24}
                height={24}
              />
              <span className="hero__logo-text">KATHA</span>
            </div>
            <p className="site-footer__tagline">Build your story with us.</p>
          </div>
          <nav className="site-footer__col" aria-label="Footer">
            <h2 className="site-footer__heading">Explore</h2>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <div className="site-footer__col">
            <h2 className="site-footer__heading">Get in touch</h2>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <BookingLink />
          </div>
        </div>
        <p className="site-footer__legal">
          © {new Date().getFullYear()} Katha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

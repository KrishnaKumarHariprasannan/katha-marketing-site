import type { Metadata } from "next";
import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import ServiceIllustration from "@/components/ServiceIllustration";
import { offerPath, offers } from "@/lib/offers";
import { services, servicesCta } from "@/lib/services";
import { BOOKING_MINUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy and research, branding and marketing, and creative digital design for impact-driven organisations.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header: links jump to each service below */}
      <section
        id="services"
        className="services services-head section--top"
        aria-labelledby="services-title"
      >
        <div className="section-inner">
          <header className="services__header">
            <h1 id="services-title" className="services__title">
              Services
            </h1>
            <p className="services__subtitle">
              We moonlight as spies, ninjas, & tap dancers...
              <br />
              but, here’s what we do during the day:
            </p>
          </header>

          <nav className="services-jump" aria-label="Services">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services#${svc.slug}`}
                className="services-jump__link"
              >
                {svc.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* One section per service, alternating light and dark. Dark sections
          swap sides so the illustration zig-zags down the page. */}
      {services.map((svc, i) => {
        const offer = offers.find((o) => o.slug === svc.offer);
        const dark = i % 2 === 1;
        return (
          <section
            key={svc.slug}
            id={svc.slug}
            className={`service-block ${
              dark
                ? "service-block--dark service-block--flip"
                : "service-block--light wave-top wave-bottom"
            }`}
            aria-labelledby={`${svc.slug}-title`}
          >
            <div className="section-inner">
              <div className="service-block__grid">
                <div className="service-block__text">
                  <p className="service-block__num">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`${svc.slug}-title`} className="service-block__title">
                    {svc.title}
                  </h2>
                  <p className="service-block__tagline">{svc.tagline}</p>
                  <p className="service-block__summary">{svc.summary}</p>
                  <div className="service-block__outcome">
                    <h3 className="service-block__outcome-label">The outcome</h3>
                    <p className="service-block__summary">{svc.outcome}</p>
                  </div>
                  {offer && (
                    <Link href={offerPath(offer)} className="service-block__start">
                      Quick way to start: {offer.title} →
                    </Link>
                  )}
                </div>

                <div className="service-block__side">
                  <ServiceIllustration name={svc.art} />
                  <h3 className="service-block__label">
                    What this looks like in practice
                  </h3>
                  <ul className="service-block__chips">
                    {svc.practice.map((item) => (
                      <li key={item} className="service-block__chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="services services-cta" aria-labelledby="services-cta-title">
        <div className="section-inner services-cta__inner">
          <h2 id="services-cta-title" className="services-cta__title">
            {servicesCta.heading}
          </h2>
          <p className="services-cta__text">{servicesCta.body}</p>
          <div className="services-cta__actions">
            <BookingLink
              className="hero__cta"
              label={`Book a ${BOOKING_MINUTES}-min session`}
            />
            <Link href="/#contact" className="hero__secondary-link">
              Or drop us a message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

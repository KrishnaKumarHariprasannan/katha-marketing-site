import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategy and research, branding and marketing, and creative digital design for impact-driven organisations.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Intro: one card per service; the whole card links to its section */}
      <section id="services" className="services section--top services-intro">
        <div className="section-inner">
          <header className="services__header">
            <h1 className="services__title">Services</h1>
            <p className="services__subtitle">
              We moonlight as spies, ninjas, & tap dancers...
              <br />
              but, here’s what we do during the day:
            </p>
          </header>

          <div className="services__grid">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services#${svc.slug}`}
                className="service-card service-card--link"
                aria-labelledby={`${svc.slug}-card-title`}
              >
                <h2
                  id={`${svc.slug}-card-title`}
                  className="service-card__title"
                >
                  {svc.title}
                </h2>
                <p className="service-card__detail">{svc.intro.description}</p>
                <ul className="service-card__list">
                  {svc.intro.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <span className="service-card__more" aria-hidden="true">
                  Find out more <span className="service-card__arrow">→</span>
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* One detail section per service, in the same order as the cards */}
      {services.map((svc) => (
        <section
          key={svc.slug}
          id={svc.slug}
          className="services service-detail"
          aria-labelledby={`${svc.slug}-title`}
        >
          <div className="section-inner">
            <div className="service-detail__grid">
              <div className="service-detail__main">
                <h2 id={`${svc.slug}-title`} className="services__title">
                  {svc.title}
                </h2>
                <p className="about__lead service-detail__tagline">
                  {svc.detail.tagline}
                </p>
                {svc.detail.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="service-detail__text">
                    {paragraph}
                  </p>
                ))}
              </div>

              <aside className="service-detail__aside">
                <div className="service-detail__panel">
                  <h3 className="service-detail__label">
                    What this looks like in practice
                  </h3>
                  <ul className="service-detail__list">
                    {svc.detail.practice.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="service-detail__panel service-detail__outcome">
                  <h3 className="service-detail__label">The outcome</h3>
                  <p className="service-detail__text">{svc.detail.outcome}</p>
                </div>
              </aside>
            </div>

            <div className="service-detail__cta">
              <div>
                <h3 className="about__lead">{svc.detail.cta.heading}</h3>
                <p className="service-detail__text">{svc.detail.cta.body}</p>
              </div>
              <div className="service-detail__actions">
                <a
                  className="hero__cta"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a free 20-min session
                </a>
                <Link
                  href="/#contact"
                  className="service-detail__secondary-link"
                >
                  Or drop us a line
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

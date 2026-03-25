"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const aboutBodyRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const contactFromRef = useRef<HTMLInputElement | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const aboutCollapseTimeoutRef = useRef<number | null>(null);
  const [activeService, setActiveService] = useState<null | {
    title: string;
    detail: string;
  }>(null);

  useEffect(() => {
    return () => {
      if (aboutCollapseTimeoutRef.current !== null) {
        window.clearTimeout(aboutCollapseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowTop(y > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Disable page scroll when either the hamburger menu or services overlay is open
  useEffect(() => {
    if (menuOpen || activeService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, activeService]);

  const services = [
    {
      title: "Content & Campaign Marketing",
      detail:
        "Turning your spreadsheets into words that spark stories. We transform complex programmes into narratives that funders, policymakers, and communities resonate with. Be it a copy for your website, a case study, or even a message you're shouting from every rooftop in town, we will help you figure out what you want to say and, just as importantly, how to say it.",
    },
    {
      title: "Branding & Narrative Strategy",
      detail:
        "Your organisation has a story, your brand makes it unforgettable. Our branding strategy blends bold creativity with smart, data-driven decisions to help your brand claim its space in the world. So if you're evolving, expanding, merging, or just a bit confused about your brand… let's talk and find something that works for you.",
    },
    {
      title: "Creative Digital Design",
      detail:
        "Great stories deserve beautiful execution. We design digital experiences and visual assets that bring your narrative to life across platforms. If your brand feels like it needs a shot of espresso and a pep talk, you're in the right place. Our approach combines design thinking with storytelling, ensuring that every visual element supports the larger narrative. From engaging newsletters to simple cohesive decks, we have it covered.",
    },
  ];

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <header className="hero__nav">
          <div className="hero__logo">
            <Image
              src="/logo_transparent.png"
              alt="Katha logo"
              className="hero__logo-mark"
              width={24}
              height={24}
              priority
            />
            <span className="hero__logo-text">KATHA</span>
          </div>
          <nav className="hero__menu">
            <a href="#about">About</a>
            <span className="hero__menu-separator">|</span>
            <a href="#services">Services</a>
            <span className="hero__menu-separator">|</span>
            <a href="#contact">Contact</a>
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
            <a
              role="menuitem"
              href="#about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a
              role="menuitem"
              href="#services"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>
            <a
              role="menuitem"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </header>

        <section className="hero__content">
          <div className="hero__copy">
            <h1 className="hero__title">KATHA</h1>
            <h3 className="hero__subtitle">
              The growth studio for impact makers
            </h3>
            <p className="hero__description">
              We are a communications studio helping purpose driven
              organisations shape the future.
              <br />
              <br />
              Creative? Absolutely. Strategic? Always.
            </p>

            <div className="hero__actions">
              <button
                className="hero__cta"
                onClick={() => {
                  // Suppress observer auto-scroll while we perform the programmatic scroll
                  isProgrammaticScrollRef.current = true;
                  // Smoothly align Contact section to the top
                  contactRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  // Focus the From input exactly when Contact fills the view
                  const target = contactRef.current;
                  if (target) {
                    const onceObserver = new IntersectionObserver(
                      (entries, obs) => {
                        const entry = entries[0];
                        if (
                          entry.target === target &&
                          entry.isIntersecting &&
                          entry.intersectionRatio >= 0.75
                        ) {
                          contactFromRef.current?.focus();
                          obs.disconnect();
                          // Re-enable observer behavior after programmatic scroll completes
                          isProgrammaticScrollRef.current = false;
                        }
                      },
                      { threshold: [0.75, 1] },
                    );
                    onceObserver.observe(target);
                  }
                  // Safety fallback to re-enable after duration
                  setTimeout(() => {
                    isProgrammaticScrollRef.current = false;
                  }, 1500);
                }}
              >
                WORK WITH US
              </button>
            </div>
          </div>
        </section>
      </section>
      {/* Jump to Services overlay button */}
      <button
        aria-label="Continue to About"
        className="section-next"
        onClick={() => {
          aboutRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        ↓
      </button>

      <section id="about" className="services about" ref={aboutRef}>
        <header className="services__header">
          <h2 className="services__title">About</h2>
        </header>

        <div className="about__content">
          <article
            className={`about__card${aboutExpanded ? " about__card--expanded" : ""}`}
          >
            <h3 className="about__lead">
              Katha means “story.” We mean adventure.
            </h3>

            <div className="about__body" ref={aboutBodyRef}>
              <p>
                Stories aren’t just for bedtime, they shape the way the world
                views your work. They build trust, spark movements, and create
                action.
              </p>
              <p>
                At Katha, we help organisations that are trying to create an
                impact - from climate change to education, research to social
                innovation - make sure their stories get heard. Through
                strategy, storytelling, and marketing we help organisations
                turn complex work into narratives that inspire action.
              </p>
              <p>
                How do we do this? With a mix of strategy, storytelling, and a
                touch of fun.
              </p>
              <div className="about__extra" aria-hidden={!aboutExpanded}>
                <div className="about__extra-inner">
                  <p className="about__list-intro">Whether you’re:</p>
                  <ul className="about__list">
                    <li>a social enterprise launching a bold idea</li>
                    <li>a foundation funding change-makers</li>
                    <li>a climate startup saving the planet</li>
                    <li>or an NGO trying to influence policy</li>
                  </ul>
                  <p className="about__list-intro">
                    we help your story travel further, faster, and with flair.
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className={`about__toggle${aboutExpanded ? " about__toggle--less" : ""}`}
              aria-expanded={aboutExpanded}
              onClick={() => {
                if (!aboutExpanded) {
                  setAboutExpanded(true);
                  return;
                }

                aboutBodyRef.current?.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });

                if (aboutCollapseTimeoutRef.current !== null) {
                  window.clearTimeout(aboutCollapseTimeoutRef.current);
                }

                aboutCollapseTimeoutRef.current = window.setTimeout(() => {
                  setAboutExpanded(false);
                  aboutCollapseTimeoutRef.current = null;
                }, 220);
              }}
            >
              {aboutExpanded ? "Show less" : "Read more"}
            </button>
          </article>
        </div>

        <button
          aria-label="Continue to Services"
          className="section-next"
          onClick={() => {
            servicesRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          ↓
        </button>
      </section>

      <section id="services" className="services" ref={servicesRef}>
        <header className="services__header">
          <h2 className="services__title">Services</h2>
          <p className="services__subtitle">
            We moonlight as spies, ninjas, & tap dancers...
            <br></br>
            but, here’s what we do during the day:
          </p>
        </header>

        <div className="services__grid">
          {services.map((svc) => (
            <article
              key={svc.title}
              className="service-card service-card--flip"
            >
              <div className="service-card__inner">
                <div className="service-card__front">
                  <h3 className="service-card__title">{svc.title}</h3>
                </div>
                <div className="service-card__back" aria-hidden="false">
                  <p className="service-card__detail">{svc.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile grid buttons */}
        <div className="services__mobile-grid">
          {services.map((svc) => (
            <button
              key={`btn-${svc.title}`}
              className="services__mobile-button"
              onClick={() => setActiveService(svc)}
            >
              {svc.title}
            </button>
          ))}
        </div>

        {/* Mobile service overlay */}
        {activeService && (
          <div
            className="services__overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`Details for ${activeService.title}`}
            onClick={(e) => {
              if (e.currentTarget === e.target) setActiveService(null);
            }}
          >
            <button
              className="services__overlay-close"
              aria-label="Close"
              onClick={() => setActiveService(null)}
            >
              ×
            </button>
            <div className="services__overlay-content">
              <h3 className="service-card__title" style={{ marginTop: 0 }}>
                {activeService.title}
              </h3>
              <p className="service-card__detail">{activeService.detail}</p>
            </div>
          </div>
        )}

        <p className="services__footer-note">
          We don’t offer a one-size-fits-all service.
          <br />Everything is bespoke,
          based on your goals, values, and your audience.
        </p>

        {/* Jump to Contact overlay button */}
        <button
          aria-label="Continue to Contact"
          className="section-next"
          onClick={() => {
            contactRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          ↓
        </button>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="services"
        aria-labelledby="contact-title"
        ref={contactRef}
      >
        <header className="services__header">
          <h2 id="contact-title" className="contact__title">
            Contact
          </h2>
          <p className="contact__subtitle">We&apos;d love to hear from you</p>
        </header>

        <div style={{ gridTemplateColumns: "1fr" }}>
          <article className="service-card" style={{ minHeight: "auto" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <a
                className="service-card__title"
                style={{ margin: 0, textDecoration: "none" }}
                href="mailto:hello@katha.io"
                aria-label="Email hello@katha.io"
              >
                E-MAIL
              </a>
              <h3
                className="contact__message-label"
                style={{ textAlign: "center" }}
              >
                Or leave us a message ↓
              </h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const data = new FormData(form);
                  const from = String(data.get("from") || "").trim();
                  const email = String(data.get("email") || "").trim();
                  const subject = String(data.get("subject") || "").trim();
                  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                  if (!emailValid) {
                    alert("Please enter a valid email address.");
                    return;
                  }
                  try {
                    const resp = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ from, email, subject }),
                    });
                    const json = await resp.json();
                    if (!resp.ok || !json.ok) {
                      throw new Error(json.error || "Failed to send message");
                    }
                    alert("Thanks! Your message has been sent.");
                    form.reset();
                  } catch (err: unknown) {
                    const message =
                      err instanceof Error
                        ? err.message
                        : "Please try again later.";
                    alert(
                      `Sorry, we couldn't send your message. ${message}`,
                    );
                  }
                }}
                className="contact-form"
              >
                <label className="contact-label">
                  From
                  <input
                    name="from"
                    id="contact-from"
                    ref={contactFromRef}
                    type="text"
                    className="contact-input"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="contact-label">
                  Email
                  <input
                    name="email"
                    type="email"
                    className="contact-input"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="contact-label">
                  Subject
                  <textarea
                    name="subject"
                    className="contact-textarea"
                    placeholder="Tell us more"
                    required
                  />
                </label>
                <button type="submit" className="hero__cta">
                  Send
                </button>
              </form>
            </div>
          </article>
        </div>
        <div className="service-banner__container">
          <div className="service-banner__scroll">
            <span>EMAIL MARKETING</span>
            <span>✶</span>
            <span>COPY WRITING</span>
            <span>✶</span>
            <span>SEO STRATEGY</span>
            <span>✶</span>
            <span>SEO ANALYTICS</span>
            <span>✶</span>
            <span>DIGITAL STRATEGY</span>
            <span>✶</span>
            <span>TONE OF VOICE</span>
            <span>✶</span>
            <span>EMAIL MARKETING</span>
            <span>✶</span>
            <span>COPY WRITING</span>
            <span>✶</span>
            <span>SEO STRATEGY</span>
            <span>✶</span>
            <span>SEO ANALYTICS</span>
            <span>✶</span>
            <span>DIGITAL STRATEGY</span>
            <span>✶</span>
            <span>TONE OF VOICE</span>
            <span>✶</span>
            <span>EMAIL MARKETING</span>
            <span>✶</span>
            <span>COPY WRITING</span>
            <span>✶</span>
            <span>SEO STRATEGY</span>
            <span>✶</span>
            <span>SEO ANALYTICS</span>
            <span>✶</span>
            <span>DIGITAL STRATEGY</span>
            <span>✶</span>
            <span>TONE OF VOICE</span>
            <span>✶</span>
            <span>EMAIL MARKETING</span>
            <span>✶</span>
            <span>COPY WRITING</span>
            <span>✶</span>
            <span>SEO STRATEGY</span>
            <span>✶</span>
            <span>SEO ANALYTICS</span>
            <span>✶</span>
            <span>DIGITAL STRATEGY</span>
            <span>✶</span>
            <span>TONE OF VOICE</span>
            <span>✶</span>
          </div>
        </div>
      </section>

      {showTop && (
        <button
          aria-label="Back to top"
          className="back-to-top"
          onClick={() => {
            // Suppress observer snapping while scrolling to top
            isProgrammaticScrollRef.current = true;
            // Prefer aligning the hero section explicitly
            heroRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            // Fallback to window top if heroRef missing
            if (!heroRef.current) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            // Re-enable observer after scroll
            setTimeout(() => {
              isProgrammaticScrollRef.current = false;
            }, 1000);
          }}
        >
          ↑
        </button>
      )}
    </main>
  );
}

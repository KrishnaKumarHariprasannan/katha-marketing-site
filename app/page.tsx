"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const contactFromRef = useRef<HTMLInputElement | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const [showTop, setShowTop] = useState(false);

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

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <header className="hero__nav">
          <div className="hero__logo">
            <Image
              src="/logo_transparent_white.png"
              alt="Katha logo"
              className="hero__logo-mark"
              width={24}
              height={24}
              priority
            />
            <span className="hero__logo-text">KATHA</span>
          </div>
          <nav className="hero__menu">
            <a href="#services">Services</a>
            <span className="hero__menu-separator">|</span>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="hero__content">
          <div className="hero__copy">
            <h1 className="hero__title">KATHA</h1>
            <h2 className="hero__subtitle">Build your story with us</h2>
            <p className="hero__description">
              We help brands say what they mean and say it like they mean it.
              Let&apos;s make those big moves together.
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
                      { threshold: [0.75, 1] }
                    );
                    onceObserver.observe(target);
                  }
                  // Safety fallback to re-enable after duration
                  setTimeout(() => {
                    isProgrammaticScrollRef.current = false;
                  }, 1500);
                }}
              >
                Get started
              </button>
            </div>
          </div>
        </section>
      </section>
      {/* Jump to Services overlay button */}
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

      <section id="services" className="services" ref={servicesRef}>
        <header className="services__header">
          <h2 className="services__title">Services</h2>
          <p className="section__subtitle">
            We moonlight as spies, ninjas, & tap dancers...
            <br></br>
            but, here’s what we do during the day:
          </p>
        </header>

        <div className="services__grid">
          <article className="service-card service-card--flip">
            <div className="service-card__inner">
              <div className="service-card__front">
                <h3 className="service-card__title">
                  Content & Campaign Marketing
                </h3>
              </div>
              <div className="service-card__back" aria-hidden="false">
                <p className="service-card__detail">
                  At Katha, we don’t just write words, we spark stories.
                  High-quality content is the lifeblood of your brand’s
                  identity, it communicates your unique message to audiences,
                  both loyal and new. Be it a copy for your website, a blog, or even a message you’re shouting from every
                  rooftop in town, we will help you figure out what you want to
                  say and, just as importantly, how to say it.
                </p>
              </div>
            </div>
          </article>
          <article className="service-card service-card--flip">
            <div className="service-card__inner">
              <div className="service-card__front">
                <h3 className="service-card__title">Branding Strategy</h3>
              </div>
              <div className="service-card__back" aria-hidden="false">
                <p className="service-card__detail">
                  Your business has a story, your brand makes it unforgettable.
                  Our branding strategy blends bold creativity with smart,
                  data-driven decisions to help your business claim its space in
                  the world. So if you’re evolving, expanding, merging, or just
                  a bit confused about your brand… let’s talk and find something
                  that works for you.
                </p>
              </div>
            </div>
          </article>
          <article className="service-card service-card--flip">
            <div className="service-card__inner">
              <div className="service-card__front">
                <h3 className="service-card__title">Creative Digital Design</h3>
              </div>
              <div className="service-card__back" aria-hidden="false">
                <p className="service-card__detail">
                  If your brand feels like it needs a shot of espresso and a pep
                  talk, you’re in the right place. From wild ideas to polished
                  execution, we take your brand from “fine” to “holy wow.”. From
                  engaging newsletters to simple cohesive decks, we have it
                  covered. Creative? Absolutely. Strategic? Always.
                </p>
              </div>
            </div>
          </article>
        </div>

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
          <h2 id="contact-title" className="services__title">
            Contact
          </h2>
          <p className="contact__subtitle">We'd love to hear from you</p>
        </header>

        <div  style={{ gridTemplateColumns: "1fr" }}>
          <article className="service-card" style={{ minHeight: "auto" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <h3 className="service-card__title" style={{ margin: 0 }}>
                hello@katha.io
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
                  } catch (err: any) {
                    alert(
                      `Sorry, we couldn't send your message. ${
                        err?.message || "Please try again later."
                      }`
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

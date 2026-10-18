"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

const BANNER_ITEMS = [
  "EMAIL MARKETING",
  "COPY WRITING",
  "SEO STRATEGY",
  "SEO ANALYTICS",
  "DIGITAL STRATEGY",
  "TONE OF VOICE",
];
// The scroll animation moves the strip by half its width, so the list is
// repeated to loop seamlessly.
const BANNER_REPEATS = 4;

type Status = { kind: "success" | "error"; message: string } | null;

export default function ContactSection() {
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  return (
    <section
      id="contact"
      className="contact-band"
      aria-labelledby="contact-title"
    >
      <div className="section-inner">
        <header className="services__header">
          <h2 id="contact-title" className="contact__title">
            Contact
          </h2>
          <p className="contact__subtitle">Tell us what you are working on, We&apos;d love to hear from you!</p>
        </header>

        <div style={{ gridTemplateColumns: "1fr" }}>
          <article
            className="service-card contact__card"
            style={{ minHeight: "auto" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <a
                className="service-card__title"
                style={{ margin: 0, textDecoration: "none" }}
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={`Email ${CONTACT_EMAIL}`}
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
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const data = new FormData(form);
                  const from = String(data.get("from") || "").trim();
                  const org = String(data.get("org") || "").trim();
                  const email = String(data.get("email") || "").trim();
                  const subject = String(data.get("subject") || "").trim();

                  if (!from || !org || !subject) {
                    setStatus({
                      kind: "error",
                      message:
                        "Please fill in your name, organisation and a message.",
                    });
                    return;
                  }
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setStatus({
                      kind: "error",
                      message: "Please enter a valid email address.",
                    });
                    return;
                  }

                  setSending(true);
                  setStatus(null);
                  try {
                    const resp = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ from, org, email, subject }),
                    });
                    const json = await resp.json();
                    if (!resp.ok || !json.ok) {
                      throw new Error(json.error || "Failed to send message");
                    }
                    setStatus({
                      kind: "success",
                      message: "Thanks! Your message has been sent.",
                    });
                    form.reset();
                  } catch (err: unknown) {
                    const message =
                      err instanceof Error
                        ? err.message
                        : "Please try again later.";
                    setStatus({
                      kind: "error",
                      message: `Sorry, we couldn't send your message. ${message}`,
                    });
                  } finally {
                    setSending(false);
                  }
                }}
                className="contact-form"
              >
                <label className="contact-label">
                  From
                  <input
                    name="from"
                    id="contact-from"
                    type="text"
                    className="contact-input"
                    placeholder="Name"
                    required
                  />
                </label>
                <label className="contact-label">
                  Organisation
                  <input
                    name="org"
                    type="text"
                    className="contact-input"
                    placeholder="Your organisation"
                    autoComplete="organization"
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
                  Message
                  <textarea
                    name="subject"
                    className="contact-textarea"
                    placeholder="A bit about what you are looking for"
                    required
                  />
                </label>
                {status && (
                  <p
                    role={status.kind === "error" ? "alert" : "status"}
                    className={`contact-status contact-status--${status.kind}`}
                  >
                    {status.message}
                  </p>
                )}
                <button type="submit" className="hero__cta" disabled={sending}>
                  {sending ? "Sending…" : "Send"}
                </button>
              </form>
            </div>
          </article>
        </div>
      </div>
      <div className="service-banner__container">
        <div className="service-banner__scroll">
          {Array.from({ length: BANNER_REPEATS }).flatMap((_, rep) =>
            BANNER_ITEMS.flatMap((item) => [
              <span key={`${rep}-${item}`}>{item}</span>,
              <span key={`${rep}-${item}-star`}>✶</span>,
            ]),
          )}
        </div>
      </div>
    </section>
  );
}

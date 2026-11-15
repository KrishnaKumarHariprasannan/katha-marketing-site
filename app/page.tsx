import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import ChangeIllustration, {
  type ChangeIllustrationName,
} from "@/components/ChangeIllustration";
import BuiltForIcon, { type BuiltForIconName } from "@/components/BuiltForIcon";
import ContactSection from "@/components/ContactSection";
import OfferCard from "@/components/OfferCard";
import { offers } from "@/lib/offers";

const builtFor: { label: string; icon: BuiltForIconName }[] = [
  { label: "Social enterprises", icon: "social-enterprises" },
  { label: "Startups", icon: "startups" },
  { label: "Foundations and NGOs", icon: "foundations-ngos" },
  { label: "Research and education", icon: "research-education" },
];

const changes: {
  title: string;
  detail: string;
  art: ChangeIllustrationName;
  tint: string;
}[] = [
  {
    title: "Recognisable, not interchangeable",
    detail: "Messaging that stands out and moves people to act.",
    art: "stand-out",
    tint: "#fbece6",
  },
  {
    title: "An asset, not an expense",
    detail: "Content that compounds and drives growth, not just clicks.",
    art: "asset",
    tint: "#e1f4ec",
  },
  {
    title: "The right audience, not just more people",
    detail: "Your story matched to the right channels and communities.",
    art: "audience",
    tint: "#eeecfd",
  },
  {
    title: "Less busywork, more mission",
    detail: "Streamlined marketing, so your team can focus on impact.",
    art: "mission",
    tint: "#fbeedc",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          className="hero__art"
          src="/landing_background_2x.png"
          alt=""
          width={2160}
          height={2160}
          sizes="45vw"
          preload
        />
        <div className="section-inner">
          <section className="hero__content">
            <div className="hero__copy">
              <h1 className="hero__title">KATHA</h1>
              <h3 className="hero__subtitle">
                The growth studio for impact makers
              </h3>
              <p className="hero__description">
                Katha helps startups, social enterprises, foundations, and research organisations turn their complex, high-impact work into
                stories that build trust, secure funding, and move the people who matter.
                <br />
                <br />
                Creative? Absolutely. Strategic? Always.
              </p>

              <div className="hero__actions">
                <BookingLink className="hero__cta" />
                <Link href="/#contact" className="hero__secondary-link">
                  Or write to us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Easy ways to start: small fixed-scope offers, each pre-filling the
          contact form. */}
      <section
        id="start"
        className="services services-intro offers"
        aria-labelledby="start-title"
      >
        <div className="section-inner">
          <header className="services__header">
            <h2 id="start-title" className="services__title">
              Not sure where to start?
            </h2>
            <p className="services__subtitle">
              No big commitment needed.
              <br />
              Pick one of these and we’ll get going:
            </p>
          </header>

          <div className="services__grid">
            {offers.map((offer) => (
              <OfferCard key={offer.slug} offer={offer} />
            ))}
          </div>

          <Link href="/services" className="hero__secondary-link offers__all">
            See all services →
          </Link>
        </div>
      </section>

      {/* Cream band: who Katha is for, then what changes. Contrasts with the
          gradient sections above and below. */}
      <section id="built-for" className="proof">
        <div className="section-inner">
          <h2 className="proof__title">Built for</h2>

          <ul className="built-for__grid">
            {builtFor.map((item) => (
              <li key={item.label} className="built-for__item">
                <BuiltForIcon name={item.icon} />
                <span className="built-for__label">{item.label}</span>
              </li>
            ))}
          </ul>

          <div id="changes" className="proof__block">
            <h2 className="proof__title">What changes when you work with us</h2>

            <div className="changes__grid">
              {changes.map((item, i) => (
                <article className="change-card" key={item.title}>
                  <div
                    className="change-card__art"
                    style={{ background: item.tint }}
                  >
                    <ChangeIllustration name={item.art} />
                  </div>
                  <div className="change-card__body">
                    <span className="change-card__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="change-card__title">{item.title}</h3>
                    <p className="change-card__detail">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}

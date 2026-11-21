import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import ChangeIllustration, {
  type ChangeIllustrationName,
} from "@/components/ChangeIllustration";
import BuiltForIcon, { type BuiltForIconName } from "@/components/BuiltForIcon";
import ContactSection from "@/components/ContactSection";
import HeroArt from "@/components/HeroArt";
import StartIllustration from "@/components/StartIllustration";
import { offers } from "@/lib/offers";
import { services } from "@/lib/services";

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
}[] = [
  {
    title: "Recognisable, not interchangeable",
    detail: "Messaging that stands out and inspires action.",
    art: "stand-out",
  },
  {
    title: "An asset, not an expense",
    detail: "Content that compounds and drives growth, not just clicks.",
    art: "asset",
  },
  {
    title: "The right audience, not just more people",
    detail: "Your story matched to the right channels and communities.",
    art: "audience",
  },
  {
    title: "Less busywork, more mission",
    detail: "Streamlined marketing, so your team can focus on impact.",
    art: "mission",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <HeroArt />
        <div className="section-inner">
          <section className="hero__content">
            <div className="hero__copy">
              <h1 className="hero__title">KATHA</h1>
              <h3 className="hero__subtitle">
                The growth studio for impact makers
              </h3>
              <p className="hero__description">
                Katha supports startups, social enterprises, foundations, and research organisations turn their complex, high-impact work into
                stories that build trust, secure funding, and inspire action.
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

      {/* White band: who Katha is for, then what changes. Contrasts with the
          gradient hero above. */}
      <section id="built-for" className="proof wave-top">
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
                  <div className="change-card__art">
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

      {/* Easy ways to start: small fixed-scope offers, each linking to the
          service it belongs to (where "quick way to start" opens the contact
          form pre-filled). */}
      <section
        id="start"
        className="start wave-bottom"
        aria-labelledby="start-title"
      >
        <div className="section-inner">
          <h2 id="start-title" className="proof__title">
            Start here
          </h2>

          <div className="start__grid">
            {offers.map((offer) => {
              const service = services.find((svc) => svc.offer === offer.slug);
              return (
                <Link
                  key={offer.slug}
                  href={service ? `/services#${service.slug}` : "/services"}
                  className="start-card"
                >
                  <div className="start-card__art">
                    <StartIllustration name={offer.art} />
                  </div>
                  <div className="start-card__body">
                    <h3 className="start-card__title">{offer.title}</h3>
                    <p className="start-card__text">{offer.description}</p>
                    <span className="start-card__more">See details →</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link href="/services" className="start__all">
            See all services →
          </Link>
        </div>
      </section>

      <ContactSection />
    </>
  );
}

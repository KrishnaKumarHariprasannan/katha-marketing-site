import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/BookingLink";
import ContactSection from "@/components/ContactSection";

const builtFor = [
  { label: "Social enterprises", image: "/built-for/social-enterprises.jpg" },
  { label: "Startups", image: "/built-for/startups.jpg" },
  { label: "Foundations and NGOs", image: "/built-for/foundations-ngos.jpg" },
  {
    label: "Research and educational organisations",
    image: "/built-for/research-education.jpg",
  },
];

const changes = [
  {
    title: "Your organisation becomes recognisable, not interchangeable.",
    detail:
      "Messaging is built to stand out and resonate, leading to real action.",
  },
  {
    title: "Your content starts working like an asset, not an expense.",
    detail:
      "We create content that compounds over time and contributes to growth, not just engagement.",
  },
  {
    title: "You reach the right audience, not just more people.",
    detail:
      "We align your story with the right channels, creators, and communities, leading to stronger leads and better ROI.",
  },
  {
    title: "You reduce marketing time and inefficiency.",
    detail:
      "We streamline communication and marketing for you, freeing your team to focus on your mission.",
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

      {/* Cream band: who Katha is for, then what changes. Contrasts with the
          gradient sections above and below. */}
      <section id="built-for" className="proof">
        <div className="section-inner">
          <h2 className="proof__title">We work with</h2>

          <ul className="built-for__grid">
            {builtFor.map((item) => (
              <li key={item.label} className="built-for__item">
                <div className="built-for__frame">
                  <Image
                    className="built-for__thumb"
                    src={item.image}
                    alt=""
                    width={900}
                    height={900}
                    sizes="(max-width: 820px) 45vw, 300px"
                  />
                </div>
                <span className="built-for__label">{item.label}</span>
              </li>
            ))}
          </ul>

          <div id="changes" className="proof__block">
            <h2 className="proof__title">What changes when you work with us</h2>

            <div className="changes__list">
              {changes.map((item) => (
                <article className="change-row" key={item.title}>
                  <h3 className="change-row__title">{item.title}</h3>
                  <p className="change-row__detail">{item.detail}</p>
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

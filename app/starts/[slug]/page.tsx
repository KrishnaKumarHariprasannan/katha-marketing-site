import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferHeroArt from "@/components/OfferHeroArt";
import OfferIcon from "@/components/OfferIcon";
import OfferLink from "@/components/OfferLink";
import { offers } from "@/lib/offers";

// One page per offer in lib/offers.ts (/starts/<slug>), linked from the
// "Start here" cards on the home page. Add an offer there to add a page.
type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) return {};
  return { title: offer.title, description: offer.page.intro };
}

export default async function OfferPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const offer = offers.find((o) => o.slug === slug);
  if (!offer) notFound();

  const { page } = offer;
  const startLabel = `Start your ${offer.title}`;

  return (
    <>
      <section
        className="offer-band offer-hero section--top"
        aria-labelledby="offer-title"
      >
        <div className="section-inner offer-hero__grid">
          <div className="offer-hero__text">
            <h1 id="offer-title" className="offer-hero__title">
              {offer.title}
            </h1>
            <p className="offer-hero__headline">{page.headline}</p>
            <p className="offer-body">{page.intro}</p>
            <OfferLink offer={offer} className="hero__cta" label={startLabel} />
          </div>
          <div className="offer-hero__art">
            <OfferHeroArt name={offer.art} />
          </div>
        </div>
      </section>

      <section
        className="offer-band offer-band--light wave-top wave-bottom"
        aria-labelledby="offer-walk-away"
      >
        <div className="section-inner">
          <h2 id="offer-walk-away" className="offer-label">
            What you walk away with
          </h2>
          <ul className="offer-cards">
            {page.walkAway.map((item) => (
              <li key={item.text} className="offer-card">
                <OfferIcon name={item.icon} />
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="offer-note">{page.walkAwayNote}</p>
        </div>
      </section>

      <section
        className="offer-band"
        aria-labelledby="offer-detail"
      >
        <div className="section-inner">
          <h2 id="offer-detail" className="offer-label">
            {page.detail.label}
          </h2>
          {page.detail.kind === "cards" ? (
            <ul className="offer-needs">
              {page.detail.items.map((item) => (
                <li key={item.text} className="offer-need">
                  <OfferIcon name={item.icon} />
                  {item.title && (
                    <h3 className="offer-need__title">{item.title}</h3>
                  )}
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="offer-lead">{page.detail.lead}</p>
              <p className="offer-body">{page.detail.intro}</p>
              <ul className="offer-chips">
                {page.detail.chips.map((chip) => (
                  <li key={chip} className="offer-chip">
                    {chip}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section
        className="offer-band offer-band--light wave-top wave-bottom"
        aria-labelledby="offer-how"
      >
        <div className="section-inner">
          <h2 id="offer-how" className="offer-label">
            How it works
          </h2>
          <ol className="offer-steps">
            {page.steps.map((step) => (
              <li key={step} className="offer-step">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="offer-band offer-price" aria-label="Price">
        <div className="section-inner offer-price__inner">
          <p className="offer-price__amount">{page.price}</p>
          <p className="offer-body">{page.priceNote}</p>
          <OfferLink offer={offer} className="hero__cta" label={startLabel} />
        </div>
      </section>
    </>
  );
}

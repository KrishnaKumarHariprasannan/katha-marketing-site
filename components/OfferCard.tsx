"use client";

import Link from "next/link";
import { OFFER_PREFILL_EVENT, offerPrefill, type Offer } from "@/lib/offers";

// Whole card links to the contact form and tells it which offer was picked,
// so the message box opens pre-filled.
export default function OfferCard({ offer }: { offer: Offer }) {
  const titleId = `${offer.slug}-offer-title`;
  return (
    <Link
      href="/#contact"
      className="service-card service-card--link"
      aria-labelledby={titleId}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent(OFFER_PREFILL_EVENT, {
            detail: { message: offerPrefill(offer) },
          }),
        )
      }
    >
      <h3 id={titleId} className="service-card__title">
        {offer.title}
      </h3>
      <p className="service-card__detail">{offer.description}</p>
      <ul className="offer-card__list">
        {offer.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <span className="service-card__more" aria-hidden="true">
        Ask about this <span className="service-card__arrow">→</span>
      </span>
    </Link>
  );
}

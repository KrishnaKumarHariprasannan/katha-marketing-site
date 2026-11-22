"use client";

import Link from "next/link";
import { requestOfferPrefill, type Offer } from "@/lib/offers";

// Link to the contact form with the offer's message pre-filled (works from
// any page, see requestOfferPrefill). The default look and wording are the
// Services page's "quick way to start" link; pass `className` and `label` to
// use it as a button.
export default function OfferLink({
  offer,
  className = "service-block__start",
  label = `Quick way to start: ${offer.title} →`,
}: {
  offer: Offer;
  className?: string;
  label?: string;
}) {
  return (
    <Link
      href="/#contact"
      className={className}
      onClick={() => requestOfferPrefill(offer)}
    >
      {label}
    </Link>
  );
}

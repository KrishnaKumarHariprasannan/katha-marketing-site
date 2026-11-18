"use client";

import Link from "next/link";
import { requestOfferPrefill, type Offer } from "@/lib/offers";

// "Quick way to start" link: jumps to the contact form with the offer's
// message pre-filled (works from any page, see requestOfferPrefill).
export default function OfferLink({ offer }: { offer: Offer }) {
  return (
    <Link
      href="/#contact"
      className="service-block__start"
      onClick={() => requestOfferPrefill(offer)}
    >
      Quick way to start: {offer.title} →
    </Link>
  );
}

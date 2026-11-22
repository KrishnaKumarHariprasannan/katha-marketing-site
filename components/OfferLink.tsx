"use client";

import Link from "next/link";
import { requestOfferPrefill, type Offer } from "@/lib/offers";

// Link to the contact form with the offer's message pre-filled (works from
// any page, see requestOfferPrefill). Used as the Start button on the offer
// pages (/starts/<slug>).
export default function OfferLink({
  offer,
  className,
  label = `Start your ${offer.title}`,
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

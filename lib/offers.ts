// Small, fixed-scope ways to start working with Katha. Each entry becomes a
// card on the landing page; clicking it jumps to the contact form with the
// message pre-filled (see OfferCard and ContactSection).
export type Offer = {
  slug: string;
  title: string;
  description: string;
  includes: string[];
};

// Event fired by an offer card; ContactSection listens for it.
export const OFFER_PREFILL_EVENT = "katha:offer-prefill";

export const offers: Offer[] = [
  {
    slug: "comms-audit",
    title: "Comms Audit",
    description:
      "A clear-eyed look at how your brand shows up today, and what to fix first.",
    includes: [
      "Review of your messaging, branding, comms and social media",
      "Actionable gap analysis report (2 pages)",
      "30-minute walkthrough call",
    ],
  },
  {
    slug: "paper-to-post",
    title: "Paper to Post",
    description:
      "Turn one piece of your work into content people actually stop to read.",
    includes: ["One piece of work in, a 5-page carousel out"],
  },
  {
    slug: "highlights",
    title: "Highlights",
    description: "A whole report, boiled down to what matters.",
    includes: ["One page that covers your entire report"],
  },
];

export function offerPrefill(offer: Offer) {
  return `Hi Katha, I’d like to know more about the ${offer.title}.`;
}

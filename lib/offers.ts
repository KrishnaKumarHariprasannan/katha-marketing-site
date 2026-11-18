// Small, fixed-scope ways to start working with Katha. Each entry becomes a
// card on the landing page (and a "quick way to start" link on the Services
// page); clicking it jumps to the contact form with the message pre-filled
// (see requestOfferPrefill and ContactSection).
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

// Asks the contact form to pre-fill its message. On the home page the form is
// already mounted and handles the event (it cancels it to say so). From
// another page it is not, so the message is parked in sessionStorage and the
// form picks it up when it mounts.
const PENDING_KEY = "katha:offer-prefill";
const PENDING_MAX_AGE_MS = 60_000;

export function requestOfferPrefill(offer: Offer) {
  const message = offerPrefill(offer);
  const handled = !window.dispatchEvent(
    new CustomEvent(OFFER_PREFILL_EVENT, { detail: { message }, cancelable: true }),
  );
  if (handled) return;
  try {
    sessionStorage.setItem(
      PENDING_KEY,
      JSON.stringify({ message, at: Date.now() }),
    );
  } catch {
    // Storage blocked: the form just opens empty.
  }
}

// The message parked by requestOfferPrefill, if it is still fresh.
export function takePendingPrefill(): string | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(PENDING_KEY);
    const { message, at } = JSON.parse(raw) as { message: string; at: number };
    return Date.now() - at < PENDING_MAX_AGE_MS ? message : null;
  } catch {
    return null;
  }
}
